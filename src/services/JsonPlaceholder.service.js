import axios from 'axios';

export class JsonPlaceholderService {
  INITIAL_URL = 'https://jsonplaceholder.typicode.com';
  url = this.INITIAL_URL;
  route = '';

  constructor(route, query) {
    if (!route || typeof route !== 'string' || route[0] !== '/') {
      throw new Error('Incorrect route was provided');
    }
    this.route = route;
    this.url += route;
    if (query) {
      const queryString = new URLSearchParams(query);
      this.url += '?' + queryString;
    }
  }

  get(newQueryParams) {
    if (newQueryParams) {
      const queryString = new URLSearchParams(newQueryParams);
      this.url = this.INITIAL_URL + this.route + '?' + queryString;
    }
    return axios.get(this.url).then((res) => {
      if (Array.isArray(res.data)) return res.data;
      return [res.data];
    });
  }
}