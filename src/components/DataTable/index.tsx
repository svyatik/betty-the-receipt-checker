import React, { FC } from 'react';
import { Table, FormCheck } from 'react-bootstrap';

// Components
import DataTableRow from '../DataTableRow';

// Styles
import './styles.scss';

type Props = {
  data: Receipt[];
  isHideUnchecked: boolean;
}

const DataTable: FC<Props> = ({ data, isHideUnchecked }) => (
  <Table className="data-table" bordered hover>
    <thead>
      <tr>
        <th className="media-desktop">
          <FormCheck custom={true}>
            <FormCheck.Input type={'checkbox'} />
            <FormCheck.Label />
          </FormCheck>
        </th>
        <th>#</th>
        <th>Title</th>
        <th>Qty & Price</th>
        <th>Sum</th>
      </tr>
    </thead>
    <tbody>
      {data.map((receipt, index) => <DataTableRow key={receipt.id} counter={index + 1} receipt={receipt} hide={isHideUnchecked} />)}
    </tbody>
  </Table>
);

export default DataTable;
