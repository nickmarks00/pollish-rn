import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';

const dimensions = Dimensions.get("window");

const NavButtonL = (props) => {
    return(
        <View style={{flexDirection: 'row'}}>
            <Image source={props.arrow} style={{
                width: dimensions.width/30,
                height: null,
                resizeMode: 'contain',
                }}/>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#1F71EB', marginHorizontal: 8}}>PREV</Text>
        </View>
    );
}

const NavButtonR = (props) => {
    return(
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#1F71EB', marginHorizontal: 8}}>NEXT</Text>
            <Image source={props.arrow} style={{
                width: dimensions.width/30,
                height: null,
                resizeMode: 'contain',
                }}/>
            
        </View>
    );
}

export {NavButtonL, NavButtonR};