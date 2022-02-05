import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, Button} from 'react-native';

import PollView from './PollView';
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
    const url = `http://${BASE_IP}/polls/`;

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
        {posts.map((post, idx) => {
          return (
            <PollView
              key={idx}
              question={post.question_text}
              choices={post.choices}></PollView>
          );
        })}
      </View>
    </ScrollView>

    // <Text key={idx}>{post.question_text}</Text>;
  );
};

export default HomeScreen;
