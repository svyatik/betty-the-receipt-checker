import React, { Component, ContextType, FormEvent } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../../contexts';

// Bootstrap components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type State = {
  text: string;
}

@observer
class ReceiptModal extends Component {
  static contextType = StoreContext;
  declare context: ContextType<typeof StoreContext>

  state: State = { text: '' };

  handleClose = () => {
    const { receipt } = this.context;
    receipt.toggleModal();
  }

  handleParse = () => {
    const { receipt } = this.context;

    const text = this.state.text.split('\n');
    const recordsRaw = text.slice(6, text.length);

    for (let i = 0; i < recordsRaw.length; i += 3) {
      const totalRaw = recordsRaw[i+1].split(' × ');

      const
        id = i,
        title = recordsRaw[i],
        quantity = parseFloat(totalRaw[0].replace(',', '.')),
        sum = parseFloat(totalRaw[1].replace(',', '.'));

      receipt.addRecord({ id, title, quantity, sum });
    }

    receipt.addDate(`${text[0].substring(0,10)} ${text[0].substring(10,15)}`);
    receipt.toggleModal();
  }

  onTextChangeHandle = (event: FormEvent) => {
    this.setState({ text: (event.target as HTMLInputElement).value });
  }

  render() {
    const { receipt } = this.context;

    return (
      <Modal show={receipt.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Silpo receipt parser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p>Go to <a href="https://my.silpo.ua/account/purchases/history" target="_blank">Silpo purchases history</a>,
             select a receipt, copy everything and paste here:</p>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              {/* <Form.Label>Example textarea</Form.Label> */}
              <Form.Control as="textarea" rows="6" onChange={this.onTextChangeHandle} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={this.handleParse}>Parse!</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ReceiptModal;
