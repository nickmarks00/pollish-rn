{/*
    Component for rendering buttons containing the different options from a post
    Buttons act as filters for the comment section
*/}

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Options_Container, Option_Text, Choice_Buttons } from 'style/Comments_Style';

const PostOptions = (props) => {
    return (
        <View style={Options_Container}>
            {props.choices.map((option_, idx) => {
                return (
                    <TouchableOpacity style={Choice_Buttons}key={idx}>
                        <Text style={Option_Text} adjustsFontSizeToFit={true} numberOfLines={2}>
                            {option_.choice_text}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default PostOptions;