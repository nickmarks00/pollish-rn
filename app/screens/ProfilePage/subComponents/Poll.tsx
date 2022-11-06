import {useNavigation} from '@react-navigation/native';
import {NavProps, SCREEN_NAMES} from '../../../constants/keys';
import React from 'react';
import {View, TouchableOpacity, Image, Dimensions, Text} from 'react-native';
import {ProfilePoll} from '../../../types/types';

const {height, width} = Dimensions.get('screen');

type PollProps = {
  poll: ProfilePoll;
};

const Poll = ({poll}: PollProps) => {
  const navigation = useNavigation<NavProps>();

  const [error, setError] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push(SCREEN_NAMES.POLL, {
          id: poll.id,
        });
      }}
      style={{
        height: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
        width: width * 0.7,
        backgroundColor: 'white',
      }}>
      {poll.images.length == 0 || error ? (
        <View style={{height: '80%', width: '100%', backgroundColor: 'red'}} />
      ) : (
        <View style={{height: '80%', width: '100%'}}>
          <Image
            source={{uri: poll.images[0]}}
            style={{flex: 1, resizeMode: 'cover'}}
            onError={() => setError(true)}
          />
        </View>
      )}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '20%',
          width: '100%',
          borderRightWidth: 0.5,
          borderLeftWidth: 0.5,
          borderColor: '#DEDEDE',
        }}>
        <Text
          style={{fontSize: 15, fontWeight: 'bold', width: '90%'}}
          numberOfLines={2}>
          {poll.questionText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Poll;
