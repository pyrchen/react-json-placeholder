import {ConstLocalStorage} from '../constants';
import {LocalStorageService} from './LocalStorage.service';
import { v4 } from 'uuid';

export class AuthService {
  EXPIRE_AT = 1000 * 60 * 10;
  authData = null;

  constructor() {
    this.LS = new LocalStorageService(ConstLocalStorage.AUTH_DATA);
    this.authData = this.LS.get();
    this.isAuthed = this.verifyToken();
  }

  login() {
    return new Promise((res) => {
      setTimeout(() => {
        this.refreshToken();
        this.isAuthed = true;
        this.LS.set(this.authData);
        res(this.authData.accessToken);
      }, 1500);
    });
  }

  logout() {
    return new Promise((res) => {
      setTimeout(() => {
        this.clearData();
        res({ loggedOut: true });
      }, 1500);
    });
  }

  verifyToken() {
    if (!this.authData) return false;
    const { expireAt } = this.authData;

    const currentDate = new Date().getTime();

    return currentDate <= new Date(expireAt).getTime();
  }

  refreshToken() {
    if (!this.authData) this.authData = {};
    const currentDate = new Date().getTime();
    this.authData.accessToken = v4();
    this.authData.expireAt = new Date(currentDate + this.EXPIRE_AT).toString();
  }

  clearData() {
    this.authData = null;
    this.isAuthed = false;
    this.LS.remove();
  }
}