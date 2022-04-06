import React from 'react';
import { View, Text } from 'react-native';
import { Question_Box, Post_Question, Question_Header } from 'style/Poll_Style'

const PollQuestion = (props) => {
    return (
        <View style={[Question_Box, , {backgroundColor: props.backColor}]}>
          <Text style={Question_Header}>Question</Text>
          <Text adjustsFontSizeToFit numberOfLines={4} style={[Post_Question, {fontSize: props.size}]}>
            {props.question}
          </Text>
        </View>
    )
}

export default PollQuestion;