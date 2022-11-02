import {ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {Link} from 'react-router-dom';

export const NavListItem = ({
  listItem,
  isSidebarOpened,
}) => (
  <Link
    to={listItem.route}
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: isSidebarOpened ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isSidebarOpened ? 3 : 'auto',
            justifyContent: 'center',
          }}
          children={listItem.icon}
        />
        <ListItemText
          primary={listItem.title}
          sx={{ opacity: isSidebarOpened ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  </Link>
);