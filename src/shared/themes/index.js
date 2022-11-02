import {createTheme} from '@mui/material';

const dark = createTheme({
  palette: {
    mode: 'dark',
  },
});

const light = createTheme({
  palette: {
    mode: 'light',
  },
});

const themes = {
  dark, light,
};

const getTheme = (theme) => {
  return themes[theme];
};

export { themes, getTheme };