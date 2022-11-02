export class LocalStorageService {
  constructor(name = null) {
    this.name = name;
    this.LS = localStorage;
  }
  get(naming) {
    try {
      const name = this.name || naming;
      if (!name) throw new Error();
      return this._toJsonFromString(this.LS.getItem(name));
    } catch (e) {
      console.error(e);
    }
  }

  set(naming, value = null) {
    try {
      if (!this.name && !naming) throw new Error();
      const name = this.name || naming;
      let val = value;
      if (this.name && naming) {
        val = naming;
      }
      if (!name) return null;
      const stringified = this._toStringFromJson(val);
      this.LS.setItem(name, stringified);
      return name;
    } catch (e) {
      console.error(e);
    }
  }

  remove(naming) {
    const name = this.name || naming;
    try {
      if (!this.LS.getItem(name)) return;
      this.LS.removeItem(name);
      return name;
    } catch (e) {
      console.log(e);
    }
  }

  _toJsonFromString(any) {
    return JSON.parse(any);
  }

  _toStringFromJson(any) {
    return JSON.stringify(any);
  }
}