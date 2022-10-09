import React, {useState, useEffect} from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import {getPollFeed} from 'endpoints/pollish';
import { getCuratedFeed } from 'endpoints/core';
import PollDisplay from '../../components/pollDisplay';
import Button from '../../components/Button';

const HomeScreen = (curate) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [create, setCreate] = useState(false);
  const [number, setNum] = useState(1);
  const [refreshToken, setRefreshToken] = useState(0)
  const [heightGap, setHeight] = useState(0);
  const {user, logOut} = useAuth();

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
    if (curate) {
      const polls = await getCuratedFeed(user.id);
      setPosts(polls.data[0]);
    }
    else {
      const polls = await getPollFeed(page);
      setPosts(polls.data.results);
    }
  };

  const loadMoreData = async page => {
    const polls = await getPollFeed(page);
    const total = [...posts, ...polls.data.results];
    setPosts(total);
  };

  return (
    <View onLayout={(event) => {
      var {x, y, width, height} = event.nativeEvent.layout;
      setHeight(height)
      
    }} style={{flex: 1}}>
      {posts?.length ?
        <FlatList
          initialNumToRender={2}
          windowSize={3}
          style={{flex: 1}}
          data={posts}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={{height: heightGap, width: '100%'}}>
              <PollDisplay
                refreshToken={refreshToken}
                id={item.id}
                commentsScreen={'H_Comments'}
                profileScreen={'H_Profile'}
                voteScreen={'H_Vote'}
              />
            </View>
          )}
          pagingEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={{backgroundColor: 'transparent'}}
            />
          }
          // onEndReachedThreshold={0.01}
          // onEndReached={info => {
          //   loadMoreData(number + 1);
          //   setNum(number + 1);
          // }}
        />
      :
      <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Text>Follow users or communities to populate this feed</Text>
      <View style={{height: '5%'}}/>
      <Button color={'#CCC'} filled={false} whenPressed={onRefresh} text={'reload'}/>
      </View>
      }
    </View>
  );
};

export default HomeScreen;
