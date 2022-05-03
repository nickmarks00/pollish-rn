import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, RefreshControl, Image} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AppStack from '../navigation/AppStack';
import authStorage from '../auth/storage'


import PollView from './PollScreens/PollView';
import {BASE_URL} from '@env';
import { PrimaryPollish } from './Styling/App_Styles';
const base = BASE_URL;

const dimensions = Dimensions.get('window');

const HomeScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const tabBarHeight = useBottomTabBarHeight();
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDataFromApi();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchDataFromApi();
    console.log('param: ' + route.params.commentsScreen)
  }, []);

  


  const fetchDataFromApi = async () => {
    const url = `http://${base}/pollish/polls/`;

    setLoading(true);

    const resp = await authStorage.getTokens();
    const access = JSON.parse(resp).access;

    const res = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
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
      <View style={{height: 100, borderBottomWidth: 2, borderColor: '#EEE', alignItems: 'center'}}>
      <Image
          style={{width: dimensions.width/2.8, height: 80, marginTop: 30}}
          source={require('../assets/logos/logo.png')}
        />
        </View>
    <ScrollView
      decelerationRate={0}
      snapToAlignment="lefts"
      snapToInterval={dimensions.height - tabBarHeight - 100}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{backgroundColor: 'transparent'}}
          />
      }
      >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        {posts.results?.map((post, idx) => {
          if (posts.length - 2 === idx) fetchDataFromApi2(posts.next);
          console.log("HHH: " + post)
          return (
            // <AppStack key={idx} post={post}/>
            <PollView
              key={idx}
              commentsScreen={route.params.commentsScreen}
              profileScreen={route.params.profileScreen}
              navigation={navigation}
              post={post}></PollView>
          );
        }) || []}
      </View>
    </ScrollView>
    </View>
  );
};

export default HomeScreen;
