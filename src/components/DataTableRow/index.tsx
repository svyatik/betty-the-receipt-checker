import React, { FC } from 'react';
import { FormControl, FormCheck } from 'react-bootstrap';

type Props = {
  counter: number;
  receipt: Receipt;
  hide: boolean;
}

const DataTableRow: FC<Props> = ({ counter, receipt, hide }) => (
  <tr>
    <td className="media-desktop">
      <FormCheck custom={true}>
        <FormCheck.Input type={'checkbox'} checked={receipt.isChecked} />
        <FormCheck.Label />
      </FormCheck>
    </td>
    <td>{counter}</td>
    <td>{receipt.title}</td>
    <td>
      <div className="media-desktop">
        <FormControl
          className="data-table__input data-table__input--qty"
          value={receipt.quantity.toString()}
        />
        <span className="ml-2 mr-2 data-table__sub">×</span>
        <FormControl
          className="data-table__input data-table__input--price"
          value={receipt.sum.toFixed(2)}
        />
        <span className="ml-2 data-table__sub">грн</span>
      </div>

      <div className="media-print">
        <span>{`${receipt.quantity.toString()} × ${receipt.sum.toFixed(2)} грн`}</span>
      </div>
    </td>
    <td>{(receipt.quantity * receipt.sum).toFixed(2)} грн</td>
  </tr>
);

export default DataTableRow;
