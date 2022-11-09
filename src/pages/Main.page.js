import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {CardWrapper} from '../components/Card';
import {jsonpStore} from '../store/jsonp.store';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Typography} from '@mui/material';

export const MainPage = observer(() => {
  const { id } = useParams();
  const StoreItem = jsonpStore.getData(id);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(StoreItem.items || null);

  const loadData = useCallback(async () => {
    const newData = await jsonpStore.fetchData('/' + id);
    setItems(newData?.items || []);
  }, [id]);

  const loadMoreData = async () => {
    const additionalData = await jsonpStore.fetchMore('/' + id);
    setItems((prev) => [...prev, ...additionalData.items]);
  };

  useEffect(() => {
    const data = jsonpStore.getData(id);
    if (data?.isFirstLoaded) return;
    setItems(data?.items || []);
    setLoading(true);
    loadData()
      .catch((e) => {
        const { response } = e;
        if (response.status === 404) {
          setItems(null);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (items && !items.length) {
    if (loading) return <div>Loading</div>;
    return <div>No items</div>;
  }

  if (loading) return <div>No data</div>;

  if (!items) return <div>No data</div>;


  return <div id="main-page">
    <InfiniteScroll
      next={loadMoreData}
      hasMore={StoreItem.page < StoreItem.totalPages}
      loader={<Typography component="h4">Loading..</Typography>}
      dataLength={items.length}
    >
    {
      items.map((item) => (
        <CardWrapper
          style={{ marginBottom: '15px' }}
          key={item.id}
          id={id}
          item={item}
        />))
    }
    </InfiniteScroll>
  </div>;
});