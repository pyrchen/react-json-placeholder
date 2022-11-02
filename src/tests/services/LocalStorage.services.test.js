import {LocalStorageService} from '../../services/LocalStorage.service';

const name = 'HELLO';
const value = [{ a: 1 }];

function replacer(key, value) {
  if (typeof value === 'string') {
    return value.replace(/"\\/g, '').replace(/,/g, ', ').replace(/:/g, ': ')
  } else {
    return value
  }
}

const afterEachFn = () => {
  localStorage.removeItem(name);
};

describe('Local Storage Initial', () => {
  const LS = new LocalStorageService(name);
  afterEach(afterEachFn);

  it('ls initilised', () => {
    expect(LS.LS).toBeDefined();
  });

  it('ls getting', () => {
    expect(LS.get()).toBeNull();
    localStorage.setItem(name, JSON.stringify(value));
    expect(LS.get()).toBeDefined();
    expect(LS.get()).toEqual(value);
  });

  it('ls setting', () => {
    let setted = LS.set(value);
    expect(setted).toBeDefined();
    expect(setted).toBe(name);
    expect(localStorage.getItem(name)).toBeDefined();
    expect(localStorage.getItem(name)).toBe(JSON.stringify(value));
    localStorage.removeItem(name);
    setted = LS.set();
    expect(setted).toBe(name);
    expect(localStorage.getItem(name)).toBeDefined();
    expect(localStorage.getItem(name)).toBe(JSON.stringify(null));
  });

  it('ls removing', () => {
    expect(LS.remove()).not.toBeDefined();
    localStorage.setItem(name, JSON.stringify(value));
    const res = LS.remove();
    expect(res).toBeDefined();
    expect(res).toBe(name);
  });

  it('ls parsing', () => {
    expect(LS._toJsonFromString(JSON.stringify(value, replacer))).toBeDefined();
    expect(LS._toJsonFromString(JSON.stringify(value, replacer))).toBeInstanceOf(Array);
    expect(LS._toJsonFromString(JSON.stringify(value, replacer))[0].a).toBe(1);
  });

  it('ls stringing', () => {
    expect(LS._toStringFromJson(value)).toBeDefined();
    expect(typeof LS._toStringFromJson(value)).toBe('string');
    expect(LS._toStringFromJson(value)).toBe(JSON.stringify(value, replacer));
  });
});

describe('Local Storage Manual', () => {
  const LS = new LocalStorageService();
  afterEach(afterEachFn);

  it('ls initilised', () => {
    expect(LS.LS).toBeDefined();
  });

  it('ls getting', () => {
    expect(LS.get()).not.toBeDefined();
    localStorage.setItem(name, JSON.stringify(value));
    expect(LS.get(name)).toBeDefined();
    expect(LS.get(name)).toEqual(value);
  });

  it('ls setting', () => {
    expect(LS.set(name, value)).toBeDefined();
    expect(localStorage.getItem(name)).toBeDefined();
    expect(localStorage.getItem(name)).toBe(JSON.stringify(value));
    localStorage.removeItem(name);
    expect(LS.set(name, null)).toBe(name);
    expect(localStorage.getItem(name)).toBeDefined();
    expect(localStorage.getItem(name)).toBe(JSON.stringify(null));
  });

  it('ls removing', () => {
    expect(LS.remove(name)).not.toBeDefined();
    localStorage.setItem(name, JSON.stringify(value));
    const res = LS.remove(name);
    expect(res).toBeDefined();
    expect(res).toBe(name);
  });
});