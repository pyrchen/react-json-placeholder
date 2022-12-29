import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {jsonpStore} from '../store/jsonp.store';
import {Cards} from '../components/Cards';
import {Filter} from '../components/Filter';

export const MainPage = observer(() => {
  const { id } = useParams();
  const StoreItem = jsonpStore.getData(id);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(StoreItem.filteredItems || null);

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
    if (data) {
      jsonpStore.active = id;
      setItems(data.filteredItems);
    }
    if (data?.isFirstLoaded) return;
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
    <Filter
      value={StoreItem.filterString || ''}
      onInput={(e) => {
        // console.log(e.target.value);
        StoreItem.filterString = e.target.value;
      }}
    />
    <Cards
      id={id}
      items={items}
      loadMore={loadMoreData}
      hasMore={StoreItem.page < StoreItem.totalPages}
    />
  </div>;
});