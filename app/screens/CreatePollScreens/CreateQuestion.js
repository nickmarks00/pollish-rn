import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Question_InputBox, Question_Container, Question_Header } from 'style/Create_Style';

/*
    * Component for the question page in create section
*/

const Question = ({setQuestionText, question}) => {

    return(
        <View style={Question_Container}>
            <Text style={Question_Header}>Question</Text>
            <TextInput onChangeText={newText => setQuestionText(newText)} placeholder='Add question text' style={Question_InputBox}>{question}</TextInput>
        </View>
    )
}

export default Question;