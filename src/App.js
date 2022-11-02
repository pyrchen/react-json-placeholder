import {MainPage} from './pages/Main.page';
import {CssBaseline, StyledEngineProvider} from '@mui/material';
import {MyThemeProvider} from './shared/themes/theme.context';
import {Navigation} from './components/Navigation';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import {HomePage} from './pages/Home.page';

const Routing = () => useRoutes([
  { path: '/', element: <HomePage /> },
  { path: '/:id', element: <MainPage /> },
]);

function App() {
  return (
    <StyledEngineProvider>
      <MyThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <Navigation>
            <Routing />
          </Navigation>
        </BrowserRouter>
      </MyThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
