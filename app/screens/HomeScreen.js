import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, RefreshControl} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import PollView from './PollScreens/PollView';
import {BASE_URL} from '@env';
const base = BASE_URL;

const dimensions = Dimensions.get('window');

const HomeScreen = () => {
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
  }, []);

  


  const fetchDataFromApi = async () => {
    const url = `http://${base}/pollish/polls/`;

    setLoading(true);

    const res = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
    <ScrollView
      decelerationRate={0}
      snapToAlignment="lefts"
      snapToInterval={dimensions.height - tabBarHeight}
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

          return (
            <PollView
              key={idx}
              question={post.question_text}
              choices={post.choices}
              images={post.images}
              post={post}></PollView>
          );
        }) || []}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
