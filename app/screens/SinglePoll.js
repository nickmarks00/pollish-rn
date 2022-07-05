import React from 'react';
import { View, Dimensions } from 'react-native';
import PollDisplay from '../components/pollDisplay';


const SinglePoll = ({route}) => {

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{height: Dimensions.get('window').height*0.5}}>
            <PollDisplay single={true} id={id} commentsScreen={route.params.commentsScreen} profileScreen={route.params.profileScreen}/>
        </View>
        </View>
    )
}
export default SinglePoll;