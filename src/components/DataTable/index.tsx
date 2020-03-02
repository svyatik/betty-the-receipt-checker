import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { Table, FormCheck } from 'react-bootstrap';
import { StoreContext } from '../../contexts';

// Components
import DataTableRow from '../DataTableRow';

// Styles
import './styles.scss';

type Props = {
  isHideUnchecked: boolean;
}

const DataTable: FC<Props> = observer(({ isHideUnchecked }) => {
  const { receipt } = useContext(StoreContext);

  return (
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
        {receipt.records.map((receipt, index) => <DataTableRow key={receipt.id} counter={index + 1} receipt={receipt} hide={isHideUnchecked} />)}
      </tbody>
    </Table>
  );
});

export default DataTable;
