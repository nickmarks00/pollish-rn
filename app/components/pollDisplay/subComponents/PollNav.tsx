import React from 'react';
import {View, Dimensions} from 'react-native';
import Button from '../../Button';
import IconButton from '../../IconButton';

const {height, width} = Dimensions.get('window');
const BUTTON_WIDTH = (width * 0.9 - 24 - height * 0.047) / 2;
const BUTTON_BORDER_WIDTH = height * 0.012;

type PollNavProps = {
  voteCount: number;
  commentCount: number;
  navComments: () => void;
  navVotes: () => void;
  infoModal: (open: boolean) => void;
};

const PollNav = ({
  voteCount,
  navComments,
  commentCount,
  navVotes,
  infoModal,
}: PollNavProps) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        height: height * 0.047,
        width: '100%',
      }}>
      <Button
        action={navVotes}
        style={{
          width: BUTTON_WIDTH,
          borderColor: '#0FA3B1',
          borderWidth: 1,
          borderRadius: BUTTON_BORDER_WIDTH,
        }}
        textColor={'#0FA3B1'}
        text={voteCount + ' Votes'}
      />
      <View style={{width: 12}} />
      <IconButton
        name={'information'}
        iconFill={'#0FA3B1'}
        action={() => infoModal(true)}
        style={{
          borderColor: '#0FA3B1',
          borderWidth: 1,
          height: height * 0.047,
          backgroundColor: 'white',
          borderRadius: BUTTON_BORDER_WIDTH,
        }}
      />
      <View style={{width: 12}} />
      <Button
        action={navComments}
        style={{
          width: BUTTON_WIDTH,
          borderColor: '#0FA3B1',
          borderWidth: 1,
          backgroundColor: '#0FA3B1',
          borderRadius: BUTTON_BORDER_WIDTH,
        }}
        textColor={'white'}
        text={commentCount + ' Comments'}
      />
    </View>
  );
};

export default PollNav;
