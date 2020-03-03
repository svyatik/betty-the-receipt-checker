import React, { Component, ContextType, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaPrint, FaFileAlt } from "react-icons/fa";
import { StoreContext } from './contexts';

// Components
import DataTable from './components/DataTable';
import ReceiptModal from './components/ReceiptModal';

// Styles
import '../scss/main.scss';
import './styles.scss';

/* const data = [
  { id: 1, isChecked: false, title: 'Вода мінеральна Карпатська Джерельна сл/газ, 2л', quantity: 7, sum: 13.19 },
  { id: 2, isChecked: true, title: 'Йогурт Живинка молочний чорниця, 4*115г', quantity: 1, sum: 23.29 },
  { id: 3, isChecked: false, title: 'Томат рожевий, кг', quantity: 0.456, sum: 99.90 },
];
 */
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
    /* const { receipt } = this.context;
    data.forEach(record => receipt.addRecord(record)); */
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
                <FaPrint className="align-middle mr-2" />
                <span className="align-middle">Print selected</span>
              </Button>
              <Button variant="dark" onClick={this.addReceiptClickHandle}>
                <FaFileAlt className="align-middle mr-2" />
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
