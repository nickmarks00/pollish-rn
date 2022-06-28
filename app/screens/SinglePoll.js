import React from 'react';
import { View } from 'react-native';
import PollDisplay from '../components/pollDisplay';
import { useNavigation, useRoute } from '@react-navigation/native';


const SinglePoll = ({id, commentsScreen, profileScreen}) => {

    const route = useRoute();

    return (
        <View style={{flex: 1}}>
            <PollDisplay single={true} id={id} commentsScreen={commentsScreen} profileScreen={profileScreen}/>
        </View>
    )
}
export default SinglePoll;