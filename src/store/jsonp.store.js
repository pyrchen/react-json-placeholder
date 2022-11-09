import {makeAutoObservable} from 'mobx';
import {JsonPlaceholderService} from '../services/JsonPlaceholder.service';

class JsonpDataItem {
  constructor(
    items,
    page,
    totalPages,
    isFirstLoaded,
  ) {
    this.totalPages = totalPages;
    this.page = page;
    this.items = items;
    this.isFirstLoaded = isFirstLoaded;
  }
}

class JsonpStore {
  data = {};

  constructor() {
    makeAutoObservable(this);
  }

  getData(key) {
    return this.data[key] ||
      this._createNewData(key, new JsonpDataItem([], 1, 1, false));
  }

  async fetchData(route) {
    const key = route.substring(1);
    const data = await JsonPlaceholderService.get(route);
    if (!data || !data.items.length) {
      return this.data[key];
    }
    this._updateData(key, data);
    return data;
  }

  async fetchMore(route) {
    const key = route.substring(1);
    const data = await JsonPlaceholderService.loadMore(route);
    this._updateData(key, data);
    return data;
  }

  _updateData(key, data) {
    if (!this.data[key]) return this._createNewData(key, data);
    this.data[key] = {
      items: [...this.data[key].items, ...(data.items || [])],
      ...data,
    };
    return this.data[key];
  }

  _createNewData(key, data) {
    if (this[key]) return this._updateData(key, data);
    const { items, page, totalPages, isFirstLoaded } = data;
    this.data[key] = new JsonpDataItem(items, page, totalPages, isFirstLoaded);
    return this.data[key];
  }
}

const jsonpStore = new JsonpStore();
export { jsonpStore };
