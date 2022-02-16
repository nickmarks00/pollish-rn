import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Button, TouchableOpacity } from "react-native";

const dimensions = Dimensions.get('screen');

const Category = (props) => {
    return (
        <View style={{borderRadius: 15, backgroundColor: '#90C7FC', marginHorizontal: 5}}>
            <Text style={{marginHorizontal: 5, fontSize: 15, padding: 5, fontFamily: 'SFRound', color: '#FFF'}}>{props.option}</Text>
        </View>
    );
}

const QuestionPage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.MainStyle}>
            <View/>
            <Text style={[{fontSize: 25}, styles.text]}>Create a Poll, Find out what others think!</Text>
            <Text style={[{fontSize: 20, textAlign: 'center'}, styles.text]}>What do you want to know?</Text>
            <TextInput style={styles.input}>hi</TextInput>
            
            <Text style={[{fontSize: 20, textAlign: 'center'}, styles.text]}>Select up to 3 categories</Text>
            <View style={{flexDirection: 'row'}}>
                <Category option={"Sports"}/>
                <Category option={"Entertainment"}/>
            </View>
            <View/>
            <TouchableOpacity
                onPress={() => navigation.navigate('2')}
                style={{borderRadius: 15, backgroundColor: '#83EFB1', paddingHorizontal: 40, paddingVertical: 10}}
            >
                <Text style={{fontSize: 20, fontFamily: 'SFRound', color: '#FFF'}}>Next</Text>
            </TouchableOpacity>
            <View/>
        </View>
    );
}

export default QuestionPage;

const styles = StyleSheet.create({
    MainStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'space-between'
    },

    input: {
        borderWidth: 1,
        width: dimensions.width/1.2,
        height: dimensions.height/20,
        paddingHorizontal: 20,
        borderColor: '#DDD',
        borderRadius: 15
    },

    text: {
        fontFamily: 'SFRound',
        width: dimensions.width/1.2
    }
})