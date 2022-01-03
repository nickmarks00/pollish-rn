import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {DEV_IP} from 'react-native-dotenv';

const BASE_URL = `http://${DEV_IP}`;

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    const url = `${BASE_URL}/polls`;

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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      {posts.map((post, idx) => {
        return <Text key={idx}>{post.question_text}</Text>;
      })}
    </View>
  );
};

export default HomeScreen;
