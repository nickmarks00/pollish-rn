import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  Modal,
} from 'react-native';
import { getCuratedFeed } from 'endpoints/core';
import PollDisplay from '../components/pollDisplay';


const UserFeed = ({hideHeader, feedType}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [create, setCreate] = useState(false);
  const [number, setNum] = useState(1);
  const {user, logOut} = useAuth();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDataFromApi();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    const polls = await getCuratedFeed(user.id);
    setPosts(polls.data[0]);
  };

  return (
    <View style={{backgroundColor: '#F9F9F9'}}>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{flex: 1, width: '100%', marginVertical: '5%'}}>
            <PollDisplay
              id={item.id}
              commentsScreen={'H_Comments'}
              profileScreen={'H_Profile'}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{backgroundColor: 'transparent'}}
          />
        }
        onScroll={(e) => hideHeader(e.nativeEvent.contentOffset.y)}
      />
    </View>
  );
};

export default UserFeed;
