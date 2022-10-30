import React from 'react';
import { View } from 'react-native';

import PollDisplay from 'components/pollDisplay';

const SinglePoll = ({ id, route }) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <PollDisplay id={id} commentsScreen={route.params.commentsScreen} profileScreen={route.params.profileScreen} voteScreen={route.params.voteScreen}/>
            </View>
        )
}

export default SinglePoll;