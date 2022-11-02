import {Button, Card, CardActions, CardContent, Typography} from '@mui/material';

export const PostCard = ({ item: { title, body }, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
)