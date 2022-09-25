import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {searchPolls, searchCommunities} from 'endpoints/pollish';
import {searchUsers} from 'endpoints/core';
import PollCard from 'components/pollCard';
import { FlatList } from 'react-native-gesture-handler';
import UserCard from '../../components/userCard';
import CommunityCard from '../../components/communityCard';

const dimensions = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [content, setContent] = useState([]);
  const [toggle, setToggle] = useState('poll');

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
      navigation.push('S_Profile', {user: poll, title: poll.username});
    } else if (toggle === 'comm') {
      navigation.push('S_Community', {comm: poll, id: poll.id, title: poll.name})
    } else if (toggle === 'poll') {
      navigation.push('S_Poll', {id: poll.id});
    }
  };

  const findContent = async text => {
    if (toggle === 'poll') {
      const data = await searchPolls(text);
      setContent(data.data.results);
    } else if (toggle === 'comm') {
      const data = await searchCommunities(text);
      setContent(data.data.results);
    } else if (toggle === 'user') {
      const data = await searchUsers(text);
      setContent(data.data.results);
    }
  };

  const clearContent = async () => {
    setContent([])
    setSearch('')
  }

  const onToggle = async (tabType) => {
    await clearContent()
    setToggle(tabType)
  }
  
  const navToProfile = (user) => {
    navigation.push('S_Profile', {user: user, show: true, title: user.username})
  }

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
          onPress={() => onToggle('poll')}>
          <Text style={{color: toggle === 'poll' ? 'blue' : 'black'}}>
            Poll
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: '3%'}}
          onPress={() => onToggle('comm')}>
          <Text style={{color: toggle === 'comm' ? 'blue' : 'black'}}>
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: '3%'}}
          onPress={() => onToggle('user')}>
          <Text style={{color: toggle === 'user' ? 'blue' : 'black'}}>
            User
          </Text>
        </TouchableOpacity>
      </View>

      {toggle == 'poll' ? 
      
        <View style={{flex: 1}}>
          <FlatList
            data={content}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => nextPage(item)}>
                  <PollCard id={item.id} qText={item.question_text}/>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      : toggle == 'comm' ?
        <View style={{flex: 1}}>
          <FlatList
              data={content}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => nextPage(item)}>
                    <CommunityCard comm={item}/>
                  </TouchableOpacity>
                </View>
              )}
            />
        </View>
      :
        <View style={{flex: 1}}>
          <Text>hi</Text>
          <Image style={{width: 300, height: 300}} source={{uri: 'https://pollishorg-media-bucket.s3.amazonaws.com/users/user_1069/poll_300/image.jpg?AWSAccessKeyId=AKIASTTRX3Z4UMI2T35U&Signature=R9D4DlFHY0bFJDJLIPC4SaD2DJo%3D&Expires=1663532750'}}/>
          <Text>hi</Text>
          {/* <FlatList
            data={content}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => nextPage(item)}>
                  <UserCard oUser={item} navToProfile={navToProfile}/>
                </TouchableOpacity>
              </View>
            )}
          /> */}
        </View>
      }
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
