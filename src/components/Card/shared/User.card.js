import {Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import {formatName} from '../../../utils/jsx.util';

export const UserCard = ({
  item: {
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  },
  ...props
}) => (
  <Card {...props}>
    <CardContent>
      <Typography variant="h5" component="div">
        {username}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {formatName(name, email)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);
