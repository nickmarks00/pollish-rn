import React from 'react';
import { View, Text } from 'react-native';
import { Question_Box, Post_Question } from 'style/Poll_Style';
import { SubHeading } from 'style/App_Styles';

/*
  * This component renders the Question shown on a poll
  ! Requires quesiton_text supplied
*/

const PollQuestion = ({question}) => {
    return (
        <View style={Question_Box}>
          <Text style={SubHeading}>Question</Text>
          <View style={{height: '10%'}}/>
          <Text adjustsFontSizeToFit numberOfLines={4} style={Post_Question}>
            {question}
          </Text>
        </View>
    )
}

export default PollQuestion;