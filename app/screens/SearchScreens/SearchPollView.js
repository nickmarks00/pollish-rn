import * as React from 'react'
import { Text, Image, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-paper';
import { PollQuestion } from '../PollScreens';
import {BASE_IP} from '@env';



const dimensions = Dimensions.get("screen")

const SearchPollView = ({post}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('PollFromSearch', { post: post})}>
      <View  style={{backgroundColor: (2 % 2 == 0) ? '#FFF' : '#F7F7F7' , height: dimensions.height/8, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', paddingHorizontal: '5%', margin: '3%', borderWidth: 1, borderColor: 'rgba(0,166,166,0.4)'}}>
          {post.images[0] ?
          <Image
              resizeMode='cover'
              source={{uri: `http://${BASE_IP}${post.images[0].image}`}}
              style={{width: dimensions.height/10, aspectRatio: 1, borderRadius: 10, borderWidth: 2, borderColor: '#00A6A6'}}
          />
          : <View/>}
          <PollQuestion question={post.question_text} size={12}/>

          {/* <Text>{post.images[0] ? post.images[0].image : 'hi'}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

export default SearchPollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: dimensions.width/35,
    fontWeight: 'bold',
  },
});