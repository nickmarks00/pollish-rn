import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Option_Buttons, Option_Text } from '../Styling/Create_Style';

const dimensions = Dimensions.get("window");

const PollComponentButton = (props) => {
    return (
        <View style={{width: dimensions.width/7, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => props.setSection(props.num)}>
                <View style={[Option_Buttons, {backgroundColor: props.background}]}>
                    <Text style={{fontWeight: 'bold', fontSize: 30, color: props.color}}>{props.type}</Text>
                </View>
            </TouchableOpacity>
            <Text style={Option_Text}>{props.component}</Text>
        </View>
    )
}

export default PollComponentButton;