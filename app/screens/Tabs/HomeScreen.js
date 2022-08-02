import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  Modal,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {REACT_APP_REACT_APP_BASE_URL} from '@env';
import {PrimaryPollish} from '../../Styling/App_Styles';
import {getPollFeed} from 'endpoints/pollish';
import PollDisplay from '../../components/pollDisplay';
import ColoredButton from '../../components/coloredButton';
import colors from '../../config/colors';
import CreatePoll from '../CreatePollScreens/CreatePoll';

const HomeScreen = ({hideHeader, feedType}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [create, setCreate] = useState(false);
  const [number, setNum] = useState(1);
  const [refreshToken, setRefreshToken] = useState(0)
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDataFromApi(1);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchDataFromApi(1);
  }, []);

  const fetchDataFromApi = async page => {
    const token = Math.random();
    setRefreshToken(token)
    const polls = await getPollFeed(page);
    setPosts(polls.data.results);
  };

  const loadMoreData = async page => {
    const polls = await getPollFeed(page);
    const total = [...posts, ...polls.data.results];
    setPosts(total);
  };

  return (
    <View style={{backgroundColor: '#F9F9F9'}}>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{flex: 1, width: '100%', marginVertical: '5%'}}>
            <PollDisplay
              refreshToken={refreshToken}
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
        onEndReachedThreshold={0.01}
        onEndReached={info => {
          loadMoreData(number + 1);
          setNum(number + 1);
        }}
      />
    </View>
  );
};

export default HomeScreen;
