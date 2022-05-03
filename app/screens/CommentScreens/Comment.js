{/*
    Component for rendering a single comment as it would appear in a comment section
*/}


import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { Comment_ColorBar, Comment_Text, Username_Text } from 'style/Comments_Style';
import { GetUser } from '../../api/comments';
import { useNavigation } from '@react-navigation/native';


const Comment = (props) => {

    const navigation = useNavigation();

    const [user, setUser] = useState("");

    useEffect(() => {
        findUser()
    }, []);

    const findUser = async () => {
        const user = await GetUser(props.user);
        setUser(user);
    }

    const FindColor = () => {

        if (props.colors.red == props.cid) return '#EF946C'
        if (props.colors.yellow == props.cid) return '#5ED1D0'
        if (props.colors.blue == props.cid) return '#DC6BAD'
        if (props.colors.black == props.cid) return '#000'

        return '#CCC'
    }

    return(
        <View style={{ flexDirection: 'row', marginVertical: 5}}>
            <View style={[Comment_ColorBar, {backgroundColor: FindColor()}]}/>
            <TouchableOpacity style ={{aspectRatio: 1}} onPress={() => navigation.push(props.profileScreen, {user: user})}>
                <Image style={{aspectRatio: 1, borderRadius: 1000}} source={{uri: 'https://www.gannett-cdn.com/presto/2020/07/21/USAT/86dfdd2f-db14-4a9f-8137-24536a574d3c-AP_Election_2020_Kanye_West.jpg?crop=4159,2339,x0,y0&width=3200&height=1800&format=pjpg&auto=webp'}}/>
            </TouchableOpacity>
            <View style={{paddingHorizontal: 8}}>
                    <Text style={Username_Text}>{user.username}</Text>
                <Text style={Comment_Text}>{props.comment_text}</Text>
            </View>
        </View>
    )
}

export default Comment;