import {JsonPlaceholderService} from './JsonPlaceholder.service';
import {dataStore} from '../store/Data.store';

export class FetchDataFactoryService {
  constructor(idRoute) {
    if (!idRoute) throw new Error('Not route provided!');
    this.route = idRoute;
    this.service = new JsonPlaceholderService(`/${idRoute}`);
    this.store = dataStore;
  }

  async get() {
    if (this.route in this.store) {
      console.log(this.store);
      return this.store[this.route];
    } else {
      const data = await this.service.get();
      console.log(data);
      this.store.saveNewData(this.route, data);
    }
  }
}