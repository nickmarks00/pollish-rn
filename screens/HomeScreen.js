import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, Button} from 'react-native';

import PollView from './PollScreens/PollView';
import {BASE_IP} from '@env';

const dimensions = Dimensions.get('screen');

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    const url = `http://${BASE_IP}/pollish/polls/`;

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

  const fetchDataFromApi2 = (props) => {
    const url = props.url;

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

  return (
    <ScrollView
      decelerationRate={0}
      snapToAlignment="lefts"
      snapToInterval={dimensions.height}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        {posts.results?.map((post, idx) => {
          if(posts.length - 2 === idx)
            fetchDataFromApi2(posts.next)

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
