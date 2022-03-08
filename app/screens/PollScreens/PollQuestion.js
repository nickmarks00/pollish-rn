import React from 'react';
import { View, Text } from 'react-native';
import { Question_Box, Post_Question } from 'style/Poll_Style'

const PollQuestion = (props) => {
    return (
        <View style={Question_Box}>
          <Text adjustsFontSizeToFit numberOfLines={2} style={Post_Question}>
            {props.question}
          </Text>
        </View>
    )
}

export default PollQuestion;