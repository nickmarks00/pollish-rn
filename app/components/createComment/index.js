import React, {useContext} from 'react';
import {View, TextInput, TouchableOpacity, Text, Keyboard} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {AuthContext} from '../../auth/context';
import Styles from './styles';
import { checkVote } from 'endpoints/pollish';
import { commentAPI } from 'endpoints/core';

/*
    reload: function to reload comment section when new one is created
    (route) post: post structure from api
*/

const CreateComment = ({reload}) => {
  const route = useRoute();
  const post = route.params.post;
  const [text, onChangeText] = React.useState('');
  const [creating, setCreating] = React.useState('');

  const {user} = useContext(AuthContext);

  // Function for adding new comment
  const Post_Comment = async () => {
    setCreating(true)
    const vote = await checkVote(post.id);
    await commentAPI(post.user_id, post.id, text, vote.data.user_vote ? vote.data.user_vote : 1, user.id);
    onChangeText('');
    Keyboard.dismiss();
    reload();
    setCreating(false);
  };

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="What do you want to know?"
      />
      <TouchableOpacity disabled={creating} onPress={Post_Comment}>
        <Text style={{color: creating ? '#CCC' : '#841584'}}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateComment;
