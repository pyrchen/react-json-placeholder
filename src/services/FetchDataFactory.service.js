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
    try {
      if (!(this.route in this.store)) {
        const data = await this.service.get();
        this.store.saveNewData(this.route, data);
      }
      return this.store[this.route];
    } catch (e) {}
  }

  abort() {
    this.service.abort();
  }
}