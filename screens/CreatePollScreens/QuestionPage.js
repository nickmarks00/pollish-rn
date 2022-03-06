import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Button, TouchableOpacity } from "react-native";
import { useState } from 'react';

const dimensions = Dimensions.get('screen');

const Category = (props) => {
    return (
        <View style={{borderRadius: 15, backgroundColor: '#90C7FC', marginHorizontal: 5}}>
            <Text style={{marginHorizontal: 5, fontSize: 15, padding: 5, fontFamily: 'SFRound', color: '#FFF'}}>{props.option}</Text>
        </View>
    );
}

// Function for adding new comment
const Post_Comment = () => {

    fetch("http://192.168.1.140:8000/pollish/polls/", {
            method: "POST",
            headers: { Accept: "application/json", 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question_text: "hi",
            })
            }).then(() => {
                console.log(JSON.stringify({
                    question_text: "hi",
                    choices: [
                        {
                            "choice_text": "vivamus tortor duis mattis egestas metus aenean",
                            "id": 408,
                            "users": [],
                            "votes": 41
                        },
                        {
                            "choice_text": "est quam pharetra magna",
                            "id": 636,
                            "users": [],
                            "votes": 66
                        },
                        {
                            "choice_text": "arcu adipiscing molestie hendrerit at vulputate",
                            "id": 894,
                            "users": [],
                            "votes": 7
                        }
                    ],
                    images: [
                        {
                            "image_src": "http://192.168.1.140:8000/http%3A/dummyimage.com/142x177.png/ff4444/ffffff",
                            "choice_id": null,
                            "poll_id": 1
                        },
                        {
                            "image_src": "http://192.168.1.140:8000/http%3A/dummyimage.com/117x245.png/ff4444/ffffff",
                            "choice_id": 225,
                            "poll_id": 1
                        },
                        {
                            "image_src": "http://192.168.1.140:8000/http%3A/dummyimage.com/155x123.png/cc0000/ffffff",
                            "choice_id": 573,
                            "poll_id": 1
                        },
                        {
                            "image_src": "http://192.168.1.140:8000/http%3A/dummyimage.com/129x211.png/cc0000/ffffff",
                            "choice_id": 808,
                            "poll_id": 1
                        }
                    ],
                }))
            })
}

const QuestionPage = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('');

    return (
        <View style={styles.MainStyle}>
            <View/>
            <Text style={[{fontSize: 25}, styles.text]}>Create a Poll, Find out what others think!</Text>
            <Text style={[{fontSize: 20, textAlign: 'center'}, styles.text]}>What do you want to know?</Text>
            <TextInput onChangeText={newText => setText(newText)} style={styles.input}>hi</TextInput>
            
            <Text style={[{fontSize: 20, textAlign: 'center'}, styles.text]}>Select up to 3 categories</Text>
            <View style={{flexDirection: 'row'}}>
                <Category option={"Sports"}/>
                <Category option={"Entertainment"}/>
            </View>
            <View/>
            <TouchableOpacity
                onPress={() => navigation.navigate('2', {question: text})}
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