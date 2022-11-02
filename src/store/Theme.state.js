import {makeAutoObservable} from 'mobx';

class ThemeState {
  _theme = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(name) {
    if (this.theme === name) return;
    this.theme = name;
  }
}

const themeState = new ThemeState();

export { themeState };