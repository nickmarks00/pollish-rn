import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('screen'); 

const Choices = ({setOptions, optionsText}) => {
    return(
        <View style={{flex: 0.9, justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Text style={{color: '#125AC5', fontWeight: 'bold', fontSize: 16}}>WHAT IS THERE TO CHOSE FROM?</Text>
                <View>
                    <Text style={{marginBottom: '2%', fontWeight: 'bold', fontSize: 12, color: '#ED3030'}}>Choice A</Text>
                    <TextInput onChangeText={newText => setOptions(newText, 1)} style={[styles.input2, {backgroundColor: 'rgba(237,48,48,0.03)'}]}>{optionsText.o1}</TextInput>
                </View>
                <View>
                    <Text style={{marginBottom: '2%', fontWeight: 'bold', fontSize: 12, color: '#EBAC1F'}}>Choice B</Text>
                    <TextInput onChangeText={newText => setOptions(newText, 2)} style={[styles.input2, {backgroundColor: 'rgba(235,172,31,0.03)'}]}>{optionsText.o2}</TextInput>
                </View>
                <View>
                    <Text style={{marginBottom: '2%', fontWeight: 'bold', fontSize: 12, color: '#309EED'}}>Choice C</Text>
                    <TextInput onChangeText={newText => setOptions(newText, 3)} style={[styles.input2, {backgroundColor: 'rgba(48,158,237,0.03)'}]}>{optionsText.o3}</TextInput>
                </View>
                <View>
                    <Text style={{marginBottom: '2%', fontWeight: 'bold', fontSize: 12}}>Choice D</Text>
                    <TextInput onChangeText={newText => setOptions(newText, 4)} style={[styles.input2, {backgroundColor: 'rgba(0,0,0,0.03)'}]}>{optionsText.o4}</TextInput>
                </View>
            </View>
    )
}

export default Choices;

const styles = StyleSheet.create({
    input2: {
        borderWidth: 1,
        width: dimensions.width/1.2,
        height: dimensions.height/25,
        paddingHorizontal: 10,
        borderColor: '#DDD',
        borderRadius: 10,
    },
})