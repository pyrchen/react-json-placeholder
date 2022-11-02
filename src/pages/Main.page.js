import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FetchDataFactoryService} from '../services/FetchDataFactory.service';
import {observer} from 'mobx-react-lite';
import {dataStore} from '../store/Data.store';
import {CardWrapper} from '../components/Card';

export const MainPage = observer(() => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dataStore[id] || []);

  useEffect(() => {
    const service = new FetchDataFactoryService(id);
    setLoading(true);
    service.get().then((data) => {
      setLoading(false);
      setData(data || []);
    });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return <div id="main-page">
    {
      data.length
        ? data.map((item) => (
          <CardWrapper
            style={{ marginBottom: '15px' }}
            key={item.id}
            id={id}
            item={item}
          />)
        )
        : <h2>No users</h2>
    }
  </div>;
});