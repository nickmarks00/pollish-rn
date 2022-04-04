import React from 'react';
import { View, Dimensions } from 'react-native';
import PollComponentButton from './PollComponentButton';

const dimensions = Dimensions.get("window");
const CreateBar = (props) => {
    return(
        <View>
            <View style={{position: 'absolute', width: dimensions.width, marginTop: dimensions.width/36, height: dimensions.width/18, backgroundColor: 'rgba(31, 113, 235, 0.1)'}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: dimensions.width}}>
                
                <PollComponentButton { ...props } component={'QUESTION'} num={0} type={'?'}/>
                <PollComponentButton { ...props } component={'CHOICES'} num={1} type={'C'}/>
                <PollComponentButton { ...props } component={'IMAGES'} num={2} type={'O'}/>
                <PollComponentButton { ...props } component={'SETTINGS'} num={3} type={'S'}/>
            </View>
        </View>
    );
}

export default CreateBar;