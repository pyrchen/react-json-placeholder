import {Card, Typography} from '@mui/material';

export const AlbumCard = ({ item: { title }, ...props }) => (
  <Card {...props}>
    <Typography variant="h5" component="div">
      {title}
    </Typography>
  </Card>
);