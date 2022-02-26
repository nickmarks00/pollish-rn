import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';

import PollView from './PollView';
import {BASE_URL} from '@env';

const dimensions = Dimensions.get('screen');

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    const url = `http://${BASE_URL}/pollish/polls/`;

    setLoading(true);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      setPosts(jsonResponse['results']);
      setLoading(false);
    } else {
      console.error(response.status, response.statusText);
      setError(true);
    }
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
