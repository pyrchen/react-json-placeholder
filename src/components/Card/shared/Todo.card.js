import {Card, CardContent, Typography} from '@mui/material';

export const TodoCard = ({ item: { title, completed }, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        { completed ? 'completed' : 'not completed' }
      </Typography>
    </CardContent>
  </Card>
)