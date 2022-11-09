import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  Switch,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useContext, useState} from 'react';
import {MyThemeContext} from '../../shared/themes/theme.context';
import {styled} from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {JsonPItems} from '../../shared/data/jsonp.data';
import {NavListItem} from './shared/NavListItem.component';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme, justifyContent }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: justifyContent || 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  };
});

const MyDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MyAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Navigation = ({children}) => {
  const { current, setTheme } = useContext(MyThemeContext);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const isDark = current === 'dark';

  function handleOpenSidebar () {
    setIsSidebarOpened(!isSidebarOpened);
  }

  function handleThemeChanging() {
    if (isDark) setTheme('light');
    else setTheme('dark');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <MyAppBar position="fixed" open={isSidebarOpened}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleOpenSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" noWrap component="div" marginLeft={3}>
            Theme
          </Typography>
          <Switch
            checked={isDark}
            onChange={handleThemeChanging}
          />
        </Toolbar>
      </MyAppBar>
      <MyDrawer variant="permanent" open={isSidebarOpened}>
        <DrawerHeader justifyContent="space-between">
          <Typography component="h1" noWrap paddingLeft="12px">What to load?</Typography>
          <IconButton onClick={handleOpenSidebar}>
            {isSidebarOpened ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {JsonPItems.map((listItem) => (
            <NavListItem
              key={listItem.route}
              isSidebarOpened={isSidebarOpened}
              listItem={listItem}
            />
          ))}
        </List>
      </MyDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};