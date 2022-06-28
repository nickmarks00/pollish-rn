import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
<<<<<<< HEAD:app/screens/SearchScreen.js
import {BASE_URL} from '@env';
import authStorage from '../auth/storage';
=======
import { searchPolls, searchCommunities } from 'endpoints/pollish';
import { searchUsers } from 'endpoints/core';
>>>>>>> 433df003617005e812ffc9693f52114420068d58:app/screens/Tabs/SearchScreen.js

const dimensions = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [content, setContent] = useState([]);
  const [toggle, setToggle] = useState('poll');

  useEffect(() => {}, []);

  const searchFilter = text => {
    if (text) {
      findContent(text);
    } else {
      setContent([]);
    }
    setSearch(text);
  };

  const nextPage = poll => {
    if (toggle === 'user') {
      navigation.push('S_Profile', {user: poll});
    } else if (toggle === 'comm') {
      console.log('Cam please fix this');
    } else if (toggle === 'poll') {
      navigation.push('S_Poll', {id: poll.id});
    }
  };

  const findContent = async text => {
<<<<<<< HEAD:app/screens/SearchScreen.js
    const res = await authStorage.getTokens();
    const access = JSON.parse(res).access;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };
    var url = '';
    if (toggle === 'poll') url = `${BASE_URL}/pollish/polls/?search=${text}`;
    else if (toggle === 'comm')
      url = `${BASE_URL}/pollish/communities/?search=${text}`;
    else if (toggle === 'user') url = `${BASE_URL}/core/users/?search=${text}`;
    const response = await fetch(url, options)
      .then(response => response.json())
      .then(response => {
        if (toggle !== 'comm') setContent(response.results);
        else setContent(response);
      });
=======
    if (toggle === 'poll'){
      const data = await searchPolls(text);
      setContent(data.data.results)
    }
    else if (toggle === 'comm'){
      const data = await searchCommunities(text);
      setContent(data.data)
    }
    else if (toggle === 'user'){
      const data = await searchUsers(text);
      setContent(data.data.results)
    }
>>>>>>> 433df003617005e812ffc9693f52114420068d58:app/screens/Tabs/SearchScreen.js
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TextInput
        style={styles.comment_input}
        onChangeText={text => searchFilter(text)}
        value={search}
        placeholder="What do you want to know?"
      />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{padding: '3%'}}
          onPress={() => setToggle('poll')}>
          <Text style={{color: toggle === 'poll' ? 'blue' : 'black'}}>
            Poll
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: '3%'}}
          onPress={() => setToggle('comm')}>
          <Text style={{color: toggle === 'comm' ? 'blue' : 'black'}}>
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: '3%'}}
          onPress={() => setToggle('user')}>
          <Text style={{color: toggle === 'user' ? 'blue' : 'black'}}>
            User
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, padding: '2%'}}>
          {content?.map((poll, idx) => {
            return (
              <TouchableOpacity key={idx} onPress={() => nextPage(poll)}>
                <Text style={{padding: '3%', margin: '2%', borderWidth: 1}}>
                  {toggle === 'poll'
                    ? poll.question_text
                    : toggle === 'user'
                    ? poll.username
                    : poll.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  comment_input: {
    height: 40,
    width: dimensions.width / 1.1,
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#BBB',
    padding: 10,
    justifyContent: 'center',
  },

  post_container: {
    width: dimensions.width,
    height: dimensions.height / 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  post_image: {
    height: dimensions.height / 15,
    width: dimensions.width / 3,
  },

  text: {
    width: dimensions.width * (2 / 3),
    textAlign: 'center',
  },
});
