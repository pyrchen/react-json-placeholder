import {createContext, useCallback, useMemo, useState} from 'react';
import {LocalStorageService} from '../../services/LocalStorage.service';
import {ConstLocalStorage} from '../../constants';
import {getTheme} from './index';
import {ThemeProvider} from '@mui/material';

const MyThemeContext = createContext();

const MyThemeProvider = ({ children }) => {
  const LS = useMemo(() => new LocalStorageService(ConstLocalStorage.CURRENT_THEME), []);
  const currTheme = LS.get() || 'light';

  const [themeName, _setThemeName] = useState(currTheme);

  const setThemeName = useCallback((name) => {
    if (!getTheme(name)) return;
    LS.set(name);
    _setThemeName(name);
  }, [LS]);

  const theme = getTheme(themeName);

  const contextValue = {
    current: themeName,
    setTheme: setThemeName,
  };

  return (
    <MyThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MyThemeContext.Provider>
  );
};

export { MyThemeProvider, MyThemeContext };