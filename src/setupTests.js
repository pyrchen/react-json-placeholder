// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

class TestLocal {
  storage = {};

  getItem(name) {
    if (!name) throw new Error();
    return this.storage[name] || null;
  }
  setItem(name, data) {
    if (!name) throw new Error();
    if (!data) this.storage[name] = 'null';
    if (typeof data !== 'string') throw new Error();
    this.storage[name] = data;
  }
  removeItem(name) {
    if (!name) throw new Error();
    if (!this.storage[name]) return;
    delete this.storage[name];
  }
  clear() {
    this.storage = {};
  }
}
const local = new TestLocal();
global.localStorage = local;
window.localStorage = local;
localStorage = local;