import { observable, computed, action } from 'mobx';
import { RecordModel } from '../models';

export class ReceiptStore {
  constructor(fixtures: RecordModel[]) {
    this.records = fixtures;
  }

  @observable public records: Array<RecordModel>;
  @observable public checkAll: boolean = false;
  @observable public showModal: boolean = false;
  @observable public date: string = '';

  @action addRecord = (item: Partial<RecordModel>): void => {
    this.records.push(new RecordModel(item.id, item.title, item.quantity, item.sum));
  };

  @action editRecord = (id: number, item: Partial<RecordModel>): void => {
    this.records = this.records.map(record => record.id === id ? Object.assign(record, item) : record);

    // Todo.
    // If all records are selected or deselected, update the 'checkAll' variable
  };

  @action toggleAll = (): void => {
    this.checkAll = !this.checkAll;
    this.records = this.records.map(record => Object.assign(record, { isChecked: this.checkAll }));
  };

  @computed get totalSum(): number {
    return this.records
      .filter(record => record.isChecked)
      .reduce((acc, record) => acc += record.total, 0);
  }

  // Todo. Consider moving to another store
  @action toggleModal = (): void => {
    this.showModal = !this.showModal;
  }

  @action addDate = (date: string): void => {
    this.date = date;
  }
}

export default ReceiptStore;
