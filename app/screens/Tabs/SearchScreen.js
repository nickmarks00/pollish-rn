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
import Button from '../../components/Button';

const dimensions = Dimensions.get('screen');

const searchOptions = ['POLLS', 'GROUPS', 'USERS']

const BUTTON_BORDER_WIDTH = dimensions.height*0.012;

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [content, setContent] = useState([]);
  const [toggle, setToggle] = useState('poll');
  const [filter, setFilter] = useState(0);

  const searchFilter = text => {
    if (text) {
      findContent(text);
    } else {
      setContent([]);
    }
    setSearch(text);
  };

  const adjustFilter = async () => {
    await clearContent()
    const temp = filter;
    if(temp >= 2)
      setFilter(0);
    else
      setFilter(temp+1);
  }

  const nextPage = poll => {
    if (filter === 2) {
      navigation.push('S_Profile', {user: poll, title: poll.username});
    } else if (filter === 1) {
      navigation.push('S_Community', {comm: poll, id: poll.id, title: poll.name})
    } else if (filter === 0) {
      navigation.push('S_Poll', {id: poll.id});
    }
  };

  const findContent = async text => {
    if (filter == 0) {
      const data = await searchPolls(text);
      setContent(data.data.results);
    } else if (filter == 1) {
      const data = await searchCommunities(text);
      setContent(data.data.results);
    } else if (filter == 2) {
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
    <View style={{flex: 1, alignItems: 'center', marginTop: 60}}>
      <View style={{flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 10, width: '100%', justifyContent: 'center', borderBottomColor: '#CCCCCC'}}>
      <TextInput
        style={{height: 40,
          width: dimensions.width / 1.5,
          backgroundColor: '#EEE',
          borderWidth: 1,
          borderRadius: BUTTON_BORDER_WIDTH,
          borderColor: '#BBB',
          padding: 10,
          justifyContent: 'center',}}
        onChangeText={text => searchFilter(text)}
        value={search}
        placeholder="What do you want to know?"
      />
      <View style={{width: '2%'}}/>
      <Button action={adjustFilter} style={{width: dimensions.width*0.2, height: 40, borderColor: '#00AAA9', borderWidth: 1, borderRadius: BUTTON_BORDER_WIDTH, backgroundColor: 'rgba(15,163,177,0.6)'}} textColor={'#FFF'} 
                text={searchOptions[filter]}/>
      </View>
      <View style={{height: dimensions.height*0.021}}/>

      {filter == 0 ? 
      
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
      : filter == 1 ?
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
          <FlatList
            ItemSeparatorComponent={() => {
              return (
                <View style={{height: dimensions.height*0.021}}/>
              )
            }}
            data={content}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => nextPage(item)}>
                  <UserCard oUser={item} navToProfile={navToProfile}/>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      }
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  comment_input: {
    height: 40,
    width: dimensions.width / 1.4,
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
