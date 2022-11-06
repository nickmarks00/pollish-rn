import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Dimensions, Text} from 'react-native';
import {NavProps, SCREEN_NAMES} from '../../../constants/keys';

const {height, width} = Dimensions.get('window');

type PVVProps = {
  id: number;
  votes: number;
  votedOn: number;
  pollNum: number;
};

const PVV = ({id, votes, votedOn, pollNum}: PVVProps) => {
  const navigation = useNavigation<NavProps>();

  const PVV_Text = (num: number, text: string) => {
    return (
      <View style={{alignItems: 'center', width: (width * 0.9) / 3}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{num}</Text>
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

  return (
    <View
      style={{
        flexDirection: 'row',
        width: width * 0.9,
        justifyContent: 'space-evenly',
        height: height * 0.05,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.push(SCREEN_NAMES.POLL_LIST, {
            id: id,
          })
        }>
        {PVV_Text(pollNum, 'Polls')}
      </TouchableOpacity>
      {PVV_Text(votes, 'Votes')}
      {PVV_Text(votedOn, 'Voted On')}
    </View>
  );
};
export default PVV;
