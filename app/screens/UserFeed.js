import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  Modal,
  Text
} from 'react-native';
import { getCuratedFeed } from 'endpoints/core';
import PollDisplay from '../components/pollDisplay';
import ColoredButton from '../components/coloredButton';


const UserFeed = ({hideHeader, feedType}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [create, setCreate] = useState(false);
  const [number, setNum] = useState(1);
  const [refreshToken, setRefreshToken] = useState(0)
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
    const token = Math.random();
    setRefreshToken(token)
    const polls = await getCuratedFeed(user.id);
    setPosts(polls.data[0]);
  };

  return (
    <View style={{backgroundColor: '#F9F9F9'}}>
      {posts?.length ? 
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
      :
      <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Follow users or communities to populate this feed</Text>
        <View style={{height: '5%'}}/>
        <ColoredButton color={'#CCC'} filled={false} whenPressed={onRefresh} text={'reload'}/>
      </View>
}
    </View>
  );
};

export default UserFeed;
