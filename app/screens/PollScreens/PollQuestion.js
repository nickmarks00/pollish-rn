import React from 'react';
import { View, Text } from 'react-native';
import { Question_Box, Post_Question } from 'style/Poll_Style';
import { SubHeading } from 'style/App_Styles';

const PollQuestion = (props) => {
    return (
        <View style={[Question_Box, , {backgroundColor: props.backColor}]}>
          <Text style={SubHeading}>Question</Text>
          <View style={{height: '10%'}}/>
          <Text adjustsFontSizeToFit numberOfLines={4} style={[Post_Question, {fontSize: props.size}]}>
            {props.question}
          </Text>
        </View>
    )
}

export default PollQuestion;