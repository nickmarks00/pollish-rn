import React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';

const dimensions = Dimensions.get("window");

const NavButton = (props) => {
    return(
        <TouchableOpacity onPress={() => props.setSection(props.section+props.number)}>
            <View style={{flexDirection: props.order}}>
                <Image source={props.arrow} style={{
                    width: dimensions.width/30,
                    height: null,
                    resizeMode: 'contain',
                    }}/>
                <Text style={{fontWeight: 'bold', fontSize: 12, color: '#1F71EB', marginHorizontal: 8}}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default NavButton;