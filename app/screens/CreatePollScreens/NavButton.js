import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { NavBar_Image, NavBar_Text } from 'style/Create_Style';

/*
    * Component for navigating between screens on create page
*/

const NavButton = (props) => {
    return(
        <TouchableOpacity onPress={() => props.setSection(props.section+props.number)}>
            <View style={{flexDirection: props.order}}>
                <Image source={props.arrow} style={ NavBar_Image }/>
                <Text style={NavBar_Text}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default NavButton;