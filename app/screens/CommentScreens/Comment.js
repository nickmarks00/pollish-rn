{/*
    Component for rendering a single comment as it would appear in a comment section
*/}


import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import { useState, useEffect } from 'react';
import authStorage from '../../auth/storage'
import { Comment_ColorBar, Comment_Text, Username_Text } from 'style/Comments_Style';

const Comment = (props) => {

    const [username, setUserName] = useState("");

    useEffect(() => {
        loadUserData();
    }, []);

    // Function for sourcing username tied to comment
    const loadUserData = async () => {
        const user = await authStorage.getUser();
        setUserName(user.username)
        
    }

    return(
        <View style={{ flexDirection: 'row', marginVertical: 5}}>
            <View style={Comment_ColorBar}/>
            <Image style={{aspectRatio: 1, borderRadius: 1000}} source={{uri: 'https://www.gannett-cdn.com/presto/2020/07/21/USAT/86dfdd2f-db14-4a9f-8137-24536a574d3c-AP_Election_2020_Kanye_West.jpg?crop=4159,2339,x0,y0&width=3200&height=1800&format=pjpg&auto=webp'}}/>
            <View style={{paddingHorizontal: 8}}>
                    <Text style={Username_Text}>{username}</Text>
                <Text style={Comment_Text}>{props.comment_text}</Text>
            </View>
        </View>
    )
}

export default Comment;