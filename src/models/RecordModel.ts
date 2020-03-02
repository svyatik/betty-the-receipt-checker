import { observable, computed } from 'mobx';

export default class RecordModel {
  readonly id: number;

  @observable public title: string;
  @observable public quantity: number;
  @observable public sum: number;

  @observable public isChecked: boolean;

  constructor(id: number, title: string, quantity: number, sum: number) {
    this.id = id;

    this.title = title;
    this.quantity = quantity;
    this.sum = sum;

    this.isChecked = false;
  }

  @computed public get total(): number {
    return this.quantity * this.sum;
  }
}
