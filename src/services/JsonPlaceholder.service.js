import axios from 'axios';

class SingleService {
  constructor(
    url,
    limit = 10,
    page = 1,
    totalPages = 1,
  ) {
    this.url = url;
    this.limit = limit;
    this.page = page;
    this.totalPages = totalPages;

    this.isDataBeingFetched = false;
    this.isFirstLoaded = false;

    this.controller = new AbortController();
  }
}

class JsonPlaceholderServiceClass {
  _SERVICE_URL = 'https://jsonplaceholder.typicode.com';
  services = {};

  async get(route) {
    const service = this.services[route] || this._createService(route);
    if (service.isFirstLoaded && service.totalPages <= service.page) {
      return this._resp(route, [])
    }
    service.isDataBeingFetched = true;
    const response = await axios.get(service.url, {
      signal: service.controller.signal,
      params: {
        _page: service.page,
        _limit: service.limit,
      },
    });
    service.isFirstLoaded = true;
    service.isDataBeingFetched = false;
    service.totalPages = Math.ceil(response.headers['x-total-count'] / service.limit);
    return this._resp(route, response.data);
  }

  async loadMore(route) {
    const service = this.services[route] || this._createService(route);
    service.isDataBeingFetched = true;
    const response = await axios.get(service.url, {
      signal: service.controller.signal,
      params: {
        _page: ++service.page,
        _limit: service.limit,
      },
    });
    service.isDataBeingFetched = false;
    return this._resp(route, response.data);
  }

  abort(route) {
    if (this.services[route]) {
      this.services[route].controller.abort();
    }
  }

  _createService(route) {
    this.services[route] = new SingleService(this._SERVICE_URL + route);
    return this.services[route];
  }

  _toArray(data) {
    return Array.isArray(data) ? data : [data];
  }

  _resp(route, data) {
    const { totalPages, page, isFirstLoaded } = this.services[route];
    return {
      items: this._toArray(data),
      page: page,
      totalPages, isFirstLoaded,
    };
  }
}

const JsonPlaceholderService = new JsonPlaceholderServiceClass();

export { JsonPlaceholderService };