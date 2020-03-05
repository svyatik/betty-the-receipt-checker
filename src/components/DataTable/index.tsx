import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../../contexts';

// Bootstrap components
import Table from 'react-bootstrap/Table';
import FormCheck from 'react-bootstrap/FormCheck';

// Components
import DataTableRow from '../DataTableRow';

// Styles
import './styles.scss';

const DataTable: FC = observer(() => {
  const { receipt } = useContext(StoreContext);

  return (
    <Table className="data-table" bordered hover>
      <thead>
        <tr>
          <th className="media-desktop">
            <FormCheck custom={true}>
              <FormCheck.Input id='select-all' type={'checkbox'} onChange={receipt.toggleAll} />
              <FormCheck.Label htmlFor='select-all'  />
            </FormCheck>
          </th>
          <th>Title</th>
          <th>Qty & Price</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {receipt.records
          .map((record, index) => <DataTableRow key={record.id} record={record} onEdit={receipt.editRecord} />)}
      </tbody>
    </Table>
  );
});

export default DataTable;
