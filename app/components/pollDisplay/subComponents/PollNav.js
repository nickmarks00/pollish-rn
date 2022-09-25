
import React from 'react';
import { View, Dimensions } from 'react-native';
import Button from '../../Button';

const {height, width} = Dimensions.get('window');
const BUTTON_WIDTH = (width*0.9-12)/2;
const BUTTON_BORDER_WIDTH = height*0.012;

const PollNav = ({ voteCount, navComments, commentCount }) => {
    return(
        <View style={{justifyContent: 'center', flexDirection: 'row', height: height*0.047, width: '100%'}}>
            <Button style={{width: BUTTON_WIDTH, borderColor: '#BBBBBB', borderWidth: 1, borderRadius: BUTTON_BORDER_WIDTH}} textColor={'#6E6E6E'} text={voteCount + ' Votes'}/>
            <View style={{width: 12}}/>
            <Button action={navComments} style={{width: BUTTON_WIDTH, backgroundColor: '#00AAA9', borderRadius: BUTTON_BORDER_WIDTH}} textColor={'white'} text={commentCount + ' Comments'}/>
        </View>
    )
}

export default PollNav;

