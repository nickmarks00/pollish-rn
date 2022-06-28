import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Component_Button, Option_Buttons, Option_Text, Component_Button_Text } from 'style/Create_Style';
import { PrimaryPollish } from 'style/App_Styles';
import {MaterialCommunityIcons} from '@expo/vector-icons';

/*
    * Component for showing an individual button on the create poll screen
    TODO: Reduce prop drilling
*/

const PollComponentButton = (props) => {
    return (
        <View style={Component_Button}>
            <TouchableOpacity onPress={() => props.setSection(props.num)}>
                <View style={[Option_Buttons, {backgroundColor: props.valid ? PrimaryPollish : '#FFF'}]}>
                    <MaterialCommunityIcons
                      name={props.type}
                      size={30}
                      color={props.valid ? '#FFF' : PrimaryPollish}
                      style={{}}
                    />
                    {/* <Text style={[Component_Button_Text, {color: props.valid ? '#FFF' : PrimaryPollish }]}>{props.type}</Text> */}
                </View>
            </TouchableOpacity>
            <Text style={Option_Text}>{props.component}</Text>
        </View>
    )
}

export default PollComponentButton;