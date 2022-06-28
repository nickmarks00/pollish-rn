{/*
    Component for creating a comment. Type text input and submit to be added to a given post.
*/}

import React from 'react'
import {View, TextInput, TouchableOpacity, Text, Keyboard} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {CommentAPI} from '../../api/post';
import Styles from './styles';
const CreateComment = ({reload}) => {

    const route = useRoute();
    const post = route.params.post;
    const [text, onChangeText] = React.useState("");

    // Function for adding new comment
    const Post_Comment = async () => {
        await CommentAPI({uid: post.user_id, pid: post.id, text: text});
        onChangeText("");
        Keyboard.dismiss();
        reload();
    };

    return (
        <View style ={Styles.container}>
            <TextInput
            style={Styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="What do you want to know?"
            />
            <TouchableOpacity
            onPress={Post_Comment}>
                <Text style={{color: '#841584'}}>Post</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateComment;