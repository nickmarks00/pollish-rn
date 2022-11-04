import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Dimensions,
} from 'react-native';
import {checkVote} from 'network/lib/pollish';
import {commentAPI} from 'network/lib/core';

const {width, height} = Dimensions.get('window');

/*
    reload: function to reload comment section when new one is created
    (route) post: post structure from api
*/

// ! Need to define post type

type CreateCommentProps = {
  reload: () => void;
  post: any;
};

const CreateComment = ({reload, post}: CreateCommentProps) => {
  const [text, onChangeText] = useState('');
  const [creating, setCreating] = useState(false);

  // @ts-ignore
  const {user, logOut} = useAuth();

  console.log(post);

  // Function for adding new comment
  const Post_Comment = async () => {
    setCreating(true);
    const vote = await checkVote(post.id);
    await commentAPI(
      post.user_id,
      post.id,
      text,
      vote.data.user_vote ? vote.data.user_vote : 1,
      user.id,
    );
    onChangeText('');
    Keyboard.dismiss();
    reload();
    setCreating(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        padding: '3%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          height: height / 22,
          width: width / 1.2,
          marginRight: 12,
          borderWidth: 1,
          borderRadius: height / 60,
          borderColor: '#BBB',
          padding: '3%',
        }}
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
