{/*
    Component for creating a comment. Type text input and submit to be added to a given post.
*/}

import React from 'react'
import {View, TextInput, TouchableOpacity, Text, Keyboard} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Comment_Input } from 'style/Comments_Style';
import authStorage from '../../auth/storage'
import {CommentAPI} from '../../api/post';

const CreateComment = ({reload}) => {

    const route = useRoute();
    const [text, onChangeText] = React.useState("");

    // Function for adding new comment
    const Post_Comment = async () => {

        await CommentAPI({uid: route.params.uid, pid: route.params.pid, text: text});
        onChangeText("");
        Keyboard.dismiss();
        reload();

    };

    return (
        <View style ={{ justifyContent: 'center', padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
            style={Comment_Input}
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