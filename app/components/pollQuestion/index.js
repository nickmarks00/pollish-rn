import React from 'react';
import { View, Text } from 'react-native';
import Styles from './styles';

/*
  * This component renders the Question shown on a poll
  ! Requires quesiton_text supplied
*/

const PollQuestion = ({question}) => {
    return (
        <View style={Styles.container}>
          <Text style={Styles.subHeading}>Question</Text>
          <View style={{height: '10%'}}/>
          <Text adjustsFontSizeToFit numberOfLines={4} style={Styles.question}>
            {question}
          </Text>
        </View>
    )
}

export default PollQuestion;