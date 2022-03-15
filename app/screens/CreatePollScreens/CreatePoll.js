import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Image, TouchableOpacity, StatusBar } from "react-native";
import { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import arrowR from './../PollScreens/arrow.png'
import arrowL from './../PollScreens/arrowR.png'
import CreateBar from './CreateBar';
import {NavButtonL, NavButtonR} from './NavButton';

const dimensions = Dimensions.get('window');

const Category = (props) => {
    return (
        <View style={{borderRadius: 15, backgroundColor: '#90C7FC', marginHorizontal: 5}}>
            <Text style={{marginHorizontal: 5, fontSize: 15, padding: 5, fontFamily: 'SFRound', color: '#FFF'}}>{props.option}</Text>
        </View>
    );
}

const STATUS_BAR = StatusBar.statusBarHeight || 34; 

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

const CreatePoll = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const tabBarHeight = useBottomTabBarHeight();
    const screenHeight = dimensions.height-tabBarHeight-STATUS_BAR;

    return (
        <View style={[styles.MainStyle, {marginTop: STATUS_BAR, height: screenHeight}]}>
            <View style={{position: 'absolute', backgroundColor: 'rgba(238,238,238,0.2)', height: dimensions.height/5, 
                        width: dimensions.width, borderBottomWidth: 1, borderColor: '#c4c4c4'}}/>
            <View style={{height: dimensions.height/100000, width: dimensions.width}}/>
            <View style={{alignItems: 'center', width: dimensions.width, height: dimensions.height/5, justifyContent: 'space-evenly'}}>
                <View/>
            <Text style={[{fontSize: 25, color: 'black'}, styles.text]}>Create a poll, find out what others think!</Text>
            <CreateBar/>
            </View>
            <View style={{height: screenHeight*(0.6), justifyContent: 'center', borderBottomWidth: dimensions.height/60, width: dimensions.width, borderColor: '#1F71EB'}}>
            <Text style={[styles.text, {fontSize: 20, textAlign: 'left', color: '#AAA'}]}>Question</Text>
            <TextInput onChangeText={newText => setText(newText)} style={styles.input}>hi</TextInput>
            </View>
            <View style={{marginTop: dimensions.height/70, flexDirection: 'row', justifyContent: 'space-between', width: dimensions.width*0.6}}>
                <NavButtonL arrow={arrowL} number={0}/>
                <NavButtonR arrow={arrowR} number={1}/>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('2', {question: text})}
                style={{flex: 1, justifyContent: 'center'}}
            >
                <Text style={{fontSize: 20, fontFamily: 'SFRound', color: '#CCC'}}>POST</Text>
            </TouchableOpacity>
            <View/>
        </View>
    );
}

export default CreatePoll;

const styles = StyleSheet.create({
    MainStyle: {
        alignItems: 'center',
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
        width: dimensions.width/1.2,
        textAlign: 'center'
    }
})