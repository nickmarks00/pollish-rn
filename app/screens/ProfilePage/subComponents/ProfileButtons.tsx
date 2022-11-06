import {useNavigation} from '@react-navigation/native';
import {NavProps, SCREEN_NAMES} from '../../../constants/keys';
import React from 'react';
import {Dimensions, View} from 'react-native';
import IconButton from '../../../components/IconButton';

const {height, width} = Dimensions.get('window');

type ProfileButtonProps = {
  id: number;
};

const ProfileButtons = ({id}: ProfileButtonProps) => {
  const navigation = useNavigation<NavProps>();

  return (
    <View
      style={{
        width: width * 0.9,
        height: height * 0.057,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <IconButton
        name={'notifications'}
        outlineWidth={1}
        outlineColor={'#ECEEEE'}
      />
      <IconButton backgroundColor={'#CCCCCC'} />
      <IconButton
        action={() => {
          navigation.push(SCREEN_NAMES.FOCUS_LIST, {
            id: id,
          });
        }}
        name={'eye'}
        outlineWidth={1}
        outlineColor={'#ECEEEE'}
      />
      <IconButton backgroundColor={'#CCCCCC'} />
      <IconButton
        action={() => navigation.push(SCREEN_NAMES.SETTINGS)}
        name={'settings'}
        outlineWidth={1}
        outlineColor={'#ECEEEE'}
      />
    </View>
  );
};
export default ProfileButtons;
