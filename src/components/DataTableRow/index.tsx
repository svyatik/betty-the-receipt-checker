import React, { FC, FormEvent } from 'react';
import NumberFormat from 'react-number-format';

// Bootstrap components
import FormCheck from 'react-bootstrap/FormCheck';

// Models
import { RecordModel } from '../../models';

type Props = {
  record: RecordModel;
  onEdit: (id: number, item: Partial<RecordModel>) => void;
}

const DataTableRow: FC<Props> = ({ record, onEdit }) => {
  const onQuantityChangeHandle = (event: FormEvent) => {
    onEdit(record.id, { quantity: parseFloat((event.target as HTMLInputElement).value) });
  }

  const onSumChangeHandle = (event: FormEvent) => {
    onEdit(record.id, { sum: parseFloat((event.target as HTMLInputElement).value) });
  }

  return (
    <tr className={`data-table__row${record.isChecked ? '' : ' data-table__row--hidden'}`}>
      <td className="media-desktop">
        <FormCheck custom={true}>
          <FormCheck.Input id={`record-${record.id}`} type={'checkbox'} checked={record.isChecked} onChange={() => onEdit(record.id, { isChecked: !record.isChecked })} />
          <FormCheck.Label htmlFor={`record-${record.id}`} />
        </FormCheck>
      </td>
      <td>{record.title}</td>
      <td>
        <div className="media-desktop">
          <NumberFormat
            className={`form-control data-table__input data-table__input--qty ${record.quantity ? '' : 'data-table__input--error'}`}
            decimalSeparator='.'
            decimalScale={3}
            defaultValue={1}
            value={record.quantity}
            onChange={onQuantityChangeHandle}
            isNumericString={true}
          />

          <span className="ml-2 mr-2 data-table__sub">×</span>

          <NumberFormat
            className={`form-control data-table__input data-table__input--price ${record.sum ? '' : 'data-table__input--error'}`}
            decimalSeparator='.'
            decimalScale={2}
            fixedDecimalScale={true}
            value={record.sum}
            defaultValue={0.00}
            onChange={onSumChangeHandle}
            isNumericString={true}
          />

          <span className="ml-2 data-table__sub">грн</span>
        </div>

        <div className="media-print">
          <span>{`${record.quantity.toString()} × ${record.sum} грн`}</span>
        </div>
      </td>
      <td>{(record.total).toFixed(2)} грн</td>
    </tr>
  );
}

export default DataTableRow;
