import {makeAutoObservable} from 'mobx';

class DataStore {
  constructor() {
    makeAutoObservable(this);
  }

  saveNewData(key, data) {
    this[key] = data;
  }
}

const dataStore = new DataStore();
export { dataStore };