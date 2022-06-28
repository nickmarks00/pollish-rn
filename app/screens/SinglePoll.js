import React from 'react';
import { View } from 'react-native';
import PollDisplay from '../components/pollDisplay';


const SinglePoll = ({id, commentsScreen, profileScreen}) => {

    return (
        <View style={{flex: 1}}>
            <PollDisplay single={true} id={id} commentsScreen={commentsScreen} profileScreen={profileScreen}/>
        </View>
    )
}
export default SinglePoll;