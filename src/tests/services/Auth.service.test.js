import {AuthService} from '../../services/Auth.service';
import {LocalStorageService} from '../../services/LocalStorage.service';
import {ConstLocalStorage} from '../../constants';

describe('Auth', () => {
  const auth = new AuthService();
  const LS = new LocalStorageService(ConstLocalStorage.AUTH_DATA);

  beforeEach(() => {
    auth.clearData();
  });

  it('auth init', () => {
    expect(auth.authData).toBeNull();
    expect(auth.isAuthed).toBeFalsy();
  });

  it ('auth login', async () => {
    await auth.login();
    expect(auth.authData).toBeDefined();
    expect(auth.authData.accessToken).toBeDefined();
    expect(auth.authData.expireAt).toBeDefined();
    expect(typeof auth.authData.accessToken).toBe('string');
    expect(typeof auth.authData.expireAt).toBe('string');
    expect(auth.isAuthed).toBeTruthy();
    expect(LS.get()).toEqual(auth.authData);
  });

  it ('auth logout', async () => {
    await auth.logout();
    expect(auth.authData).toBeNull();
    expect(auth.isAuthed).toBeFalsy();
    expect(LS.get()).toBeNull();
  });

  it ('verify token', async () => {
    auth.verifyToken();
    expect(auth.isAuthed).toBeFalsy();
    await auth.login();
    expect(auth.isAuthed).toBeTruthy();
    expect(auth.authData).toBeDefined();
    expect(auth.authData.accessToken).toBeDefined();
    expect(auth.authData.expireAt).toBeDefined();
    expect(typeof auth.authData.accessToken).toBe('string');
    expect(typeof auth.authData.expireAt).toBe('string');
  });

  it ('refresh token', () => {
    auth.refreshToken();
    expect(auth.authData).toBeDefined();
    expect(auth.authData.accessToken).toBeDefined();
    expect(auth.authData.expireAt).toBeDefined();
    expect(typeof auth.authData.accessToken).toBe('string');
    expect(typeof auth.authData.expireAt).toBe('string');
  });

  it ('clear',  () => {
    auth.clearData();
    expect(auth.isAuthed).toBeFalsy();
    expect(auth.authData).toBeNull();
    expect(LS.get()).toBeNull();
  })
});