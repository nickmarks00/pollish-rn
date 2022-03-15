{/*
    Component for creating a comment. Type text input and submit to be added to a given post.
*/}

import React from 'react'
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import { Comment_Input } from 'style/Comments_Style';
import authStorage from '../../auth/storage'

const CreateComment = (props) => {

    const [text, onChangeText] = React.useState("");

    // Function for adding new comment
    const Post_Comment = async () => {

        const url = `http://192.168.1.140:8000/core/users/1/polls/1/comments/`;
        const tokens = await authStorage.getTokens();
        const access = JSON.parse(tokens).access;
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${access}`,
            },
            body: JSON.stringify({
                comment_text: "hi"
            })
        }

        const response = await fetch(url, options);

    };





        // fetch("http://192.168.1.140:8000/core/users/1/polls/1/comments/", {
        //         method: "POST",
        //         headers: { Accept: "application/json", 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             comment_text: text,
        //         })
        //         }).then(() => {
        //             console.log(JSON.stringify({
        //                 comment_text: text,
        //                 user: {
        //                     "id": 863,
        //                     "username": "rcowlny",
        //                     "email": "rcowlny@godaddy.com",
        //                     "first_name": "Russell",
        //                     "last_name": "Cowl"
        //                 },
        //                 created_at: "2021-03-07T00:00:00Z",
        //             }))
        //             console.log('new post')
        //         })

        console.log(text);

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