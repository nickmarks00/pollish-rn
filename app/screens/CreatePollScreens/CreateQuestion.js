import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');

const Question = ({setColors, question}) => {

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.text, {fontSize: 20, textAlign: 'left', color: '#AAA', marginBottom: '5%'}]}>Question</Text>
        <TextInput onChangeText={newText => setColors(newText)} placeholder='Add question text' style={styles.input}>{question}</TextInput>
        </View>
    )
}

export default Question;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: dimensions.width/1.2,
        height: dimensions.height/20,
        paddingHorizontal: 20,
        borderColor: '#DDD',
        borderRadius: 15,
    }
});