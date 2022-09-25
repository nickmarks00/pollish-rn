import React from 'react';
import { View, TouchableOpacity, Dimensions, Text } from 'react-native';

const { height, width } = Dimensions.get('window');

const PVV_Text = ({num, text}) => {
    return (
      <View style={{alignItems: 'center', width: (width*0.9)/3}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          {num}
        </Text>
        <View style={{height: '5%'}} />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 13,
            color: '#CCCCCC',
          }}>
          {text}
        </Text>
      </View>
    );
};

const PVV = ({navToScreen, votes, votesOn, pollNum}) => {
    return (
     <View
        style={{
          flexDirection: 'row',
          width: width*0.9,
          justifyContent: 'space-evenly',
          height: height*0.05
        }}>
          <TouchableOpacity
            onPress={() => navToScreen()}>
            <PVV_Text num={pollNum} text={'Polls'} />
          </TouchableOpacity>
          <PVV_Text num={votes} text={'Votes'} />
          <PVV_Text num={votesOn} text={'Voted On'} />
      </View>
    )

}
export default PVV;