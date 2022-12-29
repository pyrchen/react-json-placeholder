import {makeAutoObservable} from 'mobx';
import {JsonPlaceholderService} from '../services/JsonPlaceholder.service';

class JsonpDataItem {
  constructor(
    name,
    items,
    page,
    totalPages,
    isFirstLoaded,
  ) {
    makeAutoObservable(this);
    this.name = name;
    this.totalPages = totalPages;
    this.page = page;
    this.items = items;
    this.isFirstLoaded = isFirstLoaded;
    this._filterString = '';
  }

  get filteredItems() {
    const { items, _filterString } = this;
    if (!_filterString) return items;
    return items.reduce((acc, item) => {
      for (const itemKey in item) {
        if (['id', 'userId', 'postId', 'type', 'completed'].includes(itemKey)) continue;
        if (item[itemKey].toLowerCase().includes(_filterString.toLowerCase())) {
          acc.push(item);
          break;
        }
      }
      return acc;
    }, []);
  };

  get filterString() {
    console.log(this._filterString);
    return this._filterString;
  }

  set filterString(value) {
    // console.log('value: ', value);
    this._filterString = value;
  }
}

class JsonpStore {
  data = {};
  active = null;

  constructor() {
    makeAutoObservable(this);
  }

  getData(key) {
    return this.data[key] ||
      this._createNewData(key, new JsonpDataItem(key, [], 1, 1, false));
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
    Object.assign(this.data[key], {
      items: [...this.data[key].items, ...(data.items || [])],
      ...data,
    });
    return this.data[key];
  }

  _createNewData(key, data) {
    if (this[key]) return this._updateData(key, data);
    const { items, page, totalPages, isFirstLoaded } = data;
    this.data[key] = new JsonpDataItem(key, items, page, totalPages, isFirstLoaded);
    return this.data[key];
  }
}

const jsonpStore = new JsonpStore();
export { jsonpStore };
