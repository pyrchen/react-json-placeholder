import {Card, CardContent, Typography} from '@mui/material';

export const PhotoCard = ({ item: { title, url }, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <a href={url}>See photo</a>
    </CardContent>
  </Card>
);