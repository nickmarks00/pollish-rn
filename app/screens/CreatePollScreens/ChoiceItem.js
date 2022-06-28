import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Option_Input, Option_Header } from 'style/Create_Style';
import { OptionColors, VeryFadedOptionColors } from 'style/App_Styles';

/*
    * Component for each option on the create choices page
*/

const ChoiceItem = ({optionsText, setOptions, num}) => {

    const SetText = (newText) => {
        optionsText[Object.keys(optionsText)[num]] = newText
        setOptions({...optionsText})
    }

    return(
        <View>
            <Text style={[ Option_Header, { color: OptionColors[num]}]}>Choice {String.fromCharCode(65+num)}</Text>
            <TextInput onChangeText={newText => SetText(newText)} style={[Option_Input, {backgroundColor: VeryFadedOptionColors[num]}]}>{optionsText[Object.keys(optionsText)[num]]}</TextInput>
        </View>
    )
}

export default ChoiceItem;