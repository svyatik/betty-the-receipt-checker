import React, { Component, ContextType, Fragment } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from './contexts';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';

// Components
import DataTable from './components/DataTable';
import ReceiptModal from './components/ReceiptModal';

// Styles
import './styles.scss';

@observer
class App extends Component {
  static contextType = StoreContext;
  declare context: ContextType<typeof StoreContext>

  onPrintSelectedHandle = () => {
    window.print();
  }

  addReceiptClickHandle = () => {
    const { receipt } = this.context;
    receipt.toggleModal();
  }

  render() {
    const { receipt } = this.context;
    const canPrint = receipt.records.filter(record => record.isChecked).length > 0;

    return (
      <Fragment>
        <Container className="mt-5">
          <Row>
            <Col className="align-self-center">
              <p className="mb-0"><small>{receipt.date}</small></p>
            </Col>
            <Col className="media-print align-self-center text-right">
              <p className="mb-0">v. {process.env.APP_VERSION}</p>
            </Col>
            <Col className="text-right media-desktop">
              <Button className="mr-3" variant="light" onClick={this.onPrintSelectedHandle} disabled={!canPrint}>
                <FontAwesomeIcon className="align-middle mr-2" icon={faPrint} />
                <span className="align-middle">Print selected</span>
              </Button>
              <Button variant="dark" onClick={this.addReceiptClickHandle}>
                <FontAwesomeIcon className="align-middle mr-2" icon={faFileAlt} />
                <span className="align-middle">Add receipt</span>
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <DataTable />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-right">
              <p>Total: <b>{receipt.totalSum.toFixed(2)} грн</b></p>
            </Col>
          </Row>
        </Container>

        <Container className="media-desktop footer" fluid={true}>
          <Row>
            <Col className="text-right">
              <p className="mb-0">v. {process.env.APP_VERSION}</p>
            </Col>
          </Row>
        </Container>

        <ReceiptModal />
      </Fragment>
    );
  }
}

export default App;
