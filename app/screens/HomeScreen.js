import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AppStack from '../navigation/AppStack';
import authStorage from '../auth/storage';

import PollView from './PollView';
import {BASE_URL} from '@env';
import {PrimaryPollish} from '../Styling/App_Styles';
import {GetPollFeed} from '../api/comments';
import TestingSpace2 from '../TestingSpace2';
import PollDisplay from '../components/pollDisplay';
const base = BASE_URL;

const dimensions = Dimensions.get('window');

const HomeScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const tabBarHeight = useBottomTabBarHeight();
  const [refreshing, setRefreshing] = useState(false);
  const [number, setNum] = useState(1);
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
    const polls = await GetPollFeed(page);
    setPosts(polls.results);
  };

  const loadMoreData = async page => {
    const polls = await GetPollFeed(page);
    const total = [...posts, ...polls.results];
    setPosts(total);
    // if (posts.results){
    //   setPosts(...posts, polls.results);
    // }
    // else{
    //   setPosts(polls.results)
    // }
  };

  // const fetchDataFromApi2 = async props => {
  //   const url = props.url;

  //   setLoading(true);

  //   const response = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (response.status >= 200 && response.status <= 299) {
  //     const jsonResponse = await response.json();
  //     setPosts(jsonResponse['results']);
  //     setLoading(false);
  //   } else {
  //     console.error(response.status, response.statusText);
  //     setError(true);
  //   }
  // };

  return (
    <View>
      <View
        style={{
          height: 100,
          borderBottomWidth: 2,
          borderColor: '#EEE',
          alignItems: 'center',
        }}>
        <Image
          style={{width: dimensions.width / 2.8, height: 80, marginTop: 30}}
          source={require('../assets/logos/logo.png')}
        />
      </View>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <View style={{flex: 1, width: '100%', marginVertical: '5%'}}>
            <PollDisplay
              id={item.id}
              commentsScreen={route.params.commentsScreen}
              profileScreen={route.params.profileScreen}
            />
          </View>
        )}
        onEndReachedThreshold={0.01}
        onEndReached={info => {
          loadMoreData(number + 1);
          setNum(number + 1);
        }}
      />

      {/* <ScrollView
        decelerationRate={0.9}
        snapToAlignment={'center'}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{backgroundColor: 'transparent'}}
          />
        }
        
        >

          {posts.results?.map((post, idx) => {
            if (posts.length - 2 === idx) fetchDataFromApi2(posts.next);

            return (
              <View key={idx} style={{flex: 1, width: '100%', marginVertical: '5%'}}>
              <PollDisplay 
                id={post.id}
                commentsScreen={route.params.commentsScreen}
                profileScreen={route.params.profileScreen}
              />
              </View>
              // <PollView
              //   key={idx}
              //   commentsScreen={route.params.commentsScreen}
              //   profileScreen={route.params.profileScreen}
              //   navigation={navigation}
              //   id={post.id}></PollView>
            );
          }) || []}
      </ScrollView> */}
    </View>
  );
};

export default HomeScreen;
