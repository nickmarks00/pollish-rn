import React from 'react';
import { View } from 'react-native';
import PollComponentButton from './PollComponentButton';
import { Create_Navbar, Create_Navbar_BG } from 'style/Create_Style';

/*
    * This component shows the navigation bar ontop of the poll creation screen
    TODO: Remove prop drilling
*/

const CreateBar = (props) => {
    return(
        <View>
            <View style={Create_Navbar_BG}/>
            <View style={Create_Navbar}>
                <PollComponentButton { ...props } component={'QUESTION'} num={0} type={'help'} valid={props.ready.q}/>
                <PollComponentButton { ...props } component={'CHOICES'} num={1} type={'poll'} valid={props.ready.o}/>
                <PollComponentButton { ...props } component={'IMAGES'} num={2} type={'image-multiple'} valid={props.ready.m}/>
                <PollComponentButton { ...props } component={'SETTINGS'} num={3} type={'cog'} valid={props.ready.s}/>
            </View>
        </View>
    );
}

export default CreateBar;