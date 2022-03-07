import React from 'react';
import { View, Text } from 'react-native';
import { Question_Box, Post_Question } from 'style/Poll_Style'

const PollQuestion = (props) => {
    return (
        <View style={Question_Box}>
          <Text style={Post_Question} adjustsFontSizeToFit={true} numberOfLines={2}>
            {props.question}
          </Text>
        </View>
    )
}

export default PollQuestion;