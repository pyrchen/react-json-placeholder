import InfiniteScroll from 'react-infinite-scroll-component';
import {Typography} from '@mui/material';
import {CardSwitcher} from './shared/CardSwitcher';

export const Cards = ({
  id,
  items,
  loadMore,
  hasMore,
}) => {
  return (
    <InfiniteScroll
      next={loadMore}
      hasMore={hasMore}
      loader={<Typography component="h4">Loading..</Typography>}
      dataLength={items.length}
    >
      {
        items.map((item) => (
          <CardSwitcher
            style={{ marginBottom: '15px' }}
            key={item.id}
            id={id}
            item={item}
          />))
      }
    </InfiniteScroll>
  );
}