import { observable, computed, action } from 'mobx';
import { RecordModel } from '../models';

export class ReceiptStore {
  constructor(fixtures: RecordModel[]) {
    this.records = fixtures;
  }

  @observable public records: Array<RecordModel>;


  @action addRecord = (item: Partial<RecordModel>): void => {
    this.records.push(new RecordModel(item.id, item.title, item.quantity, item.sum));
  };

  @computed get totalSum(): number {
    return this.records.reduce((acc, record) => acc += record.total, 0);
  }

  /* @computed get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  } */

  /*@computed
  get completedTodos() {
    return this.todos.filter((todo) => todo.completed);
  } */

  /* @action
  addTodo = (item: Partial<TodoModel>): void => {
    this.todos.push(new TodoModel(item.text, item.completed));
  }; */

  /* @action
  editTodo = (id: number, data: Partial<TodoModel>): void => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        if (typeof data.completed == 'boolean') {
          todo.completed = data.completed;
        }
        if (typeof data.text == 'string') {
          todo.text = data.text;
        }
      }
      return todo;
    });
  }; */

  /* @action
  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  @action
  completeAll = (): void => {
    this.todos = this.todos.map((todo) => ({ ...todo, completed: true }));
  };

  @action
  clearCompleted = (): void => {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }; */
}

export default ReceiptStore;
