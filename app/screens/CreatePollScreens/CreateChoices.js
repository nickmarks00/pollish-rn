import React from 'react';
import { View, Text } from 'react-native';
import ChoiceItem from './ChoiceItem';
import { Choices_Container, SubHeader } from 'style/Create_Style';

/*
    * Component for the choices pages in create section
    TODO: Remove prop drilling
*/

const Choices = ({setOptions, optionsText}) => {
    return(
        <View style={Choices_Container}>
            <Text style={SubHeader}>WHAT IS THERE TO CHOSE FROM?</Text>
            <ChoiceItem optionsText={optionsText} setOptions={setOptions} num={0} />
            <ChoiceItem optionsText={optionsText} setOptions={setOptions} num={1} />
            <ChoiceItem optionsText={optionsText} setOptions={setOptions} num={2} />
            <ChoiceItem optionsText={optionsText} setOptions={setOptions} num={3} />
        </View>
    )
}

export default Choices;