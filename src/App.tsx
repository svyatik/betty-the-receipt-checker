import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaFileAlt } from "react-icons/fa";
import { StoreContext } from './contexts';

// Components
import DataTable from './components/DataTable';

// Styles
import '../scss/main.scss';
import './styles.scss';

type State = {
  isHideUnchecked: boolean;
}

const data = [
  { id: 1, isChecked: false, title: 'Вода мінеральна Карпатська Джерельна сл/газ, 2л', quantity: 7, sum: 13.19 },
  { id: 2, isChecked: true, title: 'Йогурт Живинка молочний чорниця, 4*115г', quantity: 1, sum: 23.29 },
  { id: 3, isChecked: false, title: 'Томат рожевий, кг', quantity: 0.456, sum: 99.90 },
];

@observer
class App extends Component {
  static contextType = StoreContext;
  declare context: React.ContextType<typeof StoreContext>

  state: State = {
    isHideUnchecked: false
  };

  onLayoutToggle = () => {
    this.setState({ isHideUnchecked: !this.state.isHideUnchecked });
  }

  addReceiptClickHandle = () => {
    const { receipt } = this.context;
    data.forEach(record => receipt.addRecord(record));
  }

  render() {
    const { isHideUnchecked } = this.state;
    const { receipt } = this.context;

    return (
      <Fragment>
        <Container className="mt-5">
          <Row className="media-desktop">
            <Col className="text-right">
              <Button className="mr-3" variant={'outline-secondary'} onClick={this.onLayoutToggle}>
                {isHideUnchecked ?
                  <Fragment>
                    <FaEye className="align-middle mr-2" />
                    <span className="align-middle">Show unchecked</span>
                  </Fragment>
                  :
                  <Fragment>
                    <FaEyeSlash className="align-middle mr-2" />
                    <span className="align-middle">Hide unchecked</span>
                  </Fragment>
                }
              </Button>
              <Button variant="dark" onClick={this.addReceiptClickHandle}>
                <FaFileAlt className="align-middle mr-2" />
                <span className="align-middle">Add receipt</span>
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <DataTable isHideUnchecked={isHideUnchecked} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-right">
              <p>Total: <b>{receipt.totalSum} грн</b></p>
            </Col>
          </Row>
        </Container>

        <Container className="footer" fluid={true}>
          <Row>
            <Col className="text-right">
              <p className="mb-0">v. {process.env.APP_VERSION}</p>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
