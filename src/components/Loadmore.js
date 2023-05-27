import React, { useState, useEffect } from 'react';
import useSWR from 'swr'
import { List, Avatar, Button, Skeleton, Card } from 'antd';

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LoadMore({ results }) {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadData = useSWR(fakeDataUrl, fetcher);

  useEffect(() => {
    setData(results);
    setList(results);
    console.log("pass >>", results);
  }, [results]);

  const getData = async callback => {
    const data = await loadData;
    if (data) {
      callback(data);
    }
  };

  const onLoadMore = () => {
    setLoading(true);
    setList(data.concat(
      [...new Array(count)].map(() => ({ loading: true, name: {} }))
    ));
    getData(res => {
      const newData = data.concat(res.results);
      setData(newData);
      setList(newData);
      setLoading(false);
      window.dispatchEvent(new Event('resize'));
      // setState(
      //   {
      //     data,
      //     list: data,
      //     loading: false,
      //   },
      //   () => {
      //     // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      //     // In real scene, you can using public method of react-virtualized:
      //     // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      //     window.dispatchEvent(new Event('resize'));
      //   }
      // );
    });
  };

  function render() {
    const loadMore = !loading
      ? <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore} disabled={data?.length === 0 || true}>loading more</Button>
      </div>
      : null;

    return (
      <Card>
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<a key='key-edit'>edit</a>, <a key='key-edit'>more</a>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>content</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    );
  }

  return (render())
}
