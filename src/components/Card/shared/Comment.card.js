import {Card, CardContent, Typography} from '@mui/material';
import {formatName} from '../../../utils/jsx.util';

export const CommentCard = ({ item: { name, email, body }, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {formatName(name, email)}
      </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
    </CardContent>
  </Card>
);