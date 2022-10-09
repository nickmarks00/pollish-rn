
import React from 'react';
import { View, Dimensions } from 'react-native';
import Button from '../../Button';

const {height, width} = Dimensions.get('window');
const BUTTON_WIDTH = (width*0.9-12)/2;
const BUTTON_BORDER_WIDTH = height*0.012;

const PollNav = ({ voteCount, navComments, commentCount, navVotes }) => {
    return(
        <View style={{justifyContent: 'center', flexDirection: 'row', height: height*0.047, width: '100%'}}>
            <Button action={navVotes} style={{width: BUTTON_WIDTH, borderColor: '#0FA3B1', borderWidth: 1, borderRadius: BUTTON_BORDER_WIDTH}} textColor={'#0FA3B1'} text={voteCount + ' Votes'}/>
            <View style={{width: 12}}/>
            <Button action={navComments} style={{width: BUTTON_WIDTH, backgroundColor: '#0FA3B1', borderRadius: BUTTON_BORDER_WIDTH}} textColor={'white'} text={commentCount + ' Comments'}/>
        </View>
    )
}

export default PollNav;

