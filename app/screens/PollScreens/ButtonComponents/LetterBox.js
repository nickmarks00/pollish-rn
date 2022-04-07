import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import {Circle_Option, Option_Letter, Inner_Option_Container, Option_Text, Post_Option} from 'style/Poll_Style';

const dimensions = Dimensions.get("screen");


const LetterBox = (props) => {
    return (
        <View style={[Circle_Option, {backgroundColor: props.color, borderRadius: dimensions.width/(13*props.count)}]}>
            <Text style={[Option_Letter, {color: '#FFF', fontSize: dimensions.width/(8*props.count)}]}>{String.fromCharCode(65+props.idx)}</Text>
        </View>
    )
}

export default LetterBox;