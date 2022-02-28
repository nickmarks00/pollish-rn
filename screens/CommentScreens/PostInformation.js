/*
    Component to render post information for the top portion of the comment section
    Image and Question Text
*/

import React from 'react';
import {View, Text, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Question_Container, Question_Box, Question_Text, Post_Image } from 'style/Comments_Style'

const PostInformation = () => {

    const route = useRoute();

    return (
        <View style={Question_Container}>
                    <Image
                        source={{uri: "https://" + route.params.img.slice(34)}}
                        style={Post_Image}
                    />
                    <View style={Question_Box}>
                        <View style={{flex: 1, marginLeft: 40, justifyContent: 'center'}}>
                            <Text style={Question_Text}>
                                {route.params.question}
                            </Text>
                        </View>
                    </View>
                </View>
    );
}

export default PostInformation;