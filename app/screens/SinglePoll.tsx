import React from 'react';
import {View} from 'react-native';

import PollDisplay from 'components/pollDisplay';

type SinglePollProps = {id: number};

const SinglePoll = ({id}: SinglePollProps) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <PollDisplay id={id} />
    </View>
  );
};

export default SinglePoll;
