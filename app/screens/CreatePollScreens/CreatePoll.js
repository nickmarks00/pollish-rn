import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Image, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import authStorage from '../../auth/storage';

import arrowR from './../PollScreens/arrow.png'
import arrowL from './../PollScreens/arrowR.png'
import CreateBar from './CreateBar';
import {NavButtonL, NavButtonR} from './NavButton';
import ImagePage from './ImagePage'
import Question from './CreateQuestion';
import Choices from './CreateChoices';
import Media from './CreateMedia';

const dimensions = Dimensions.get('window');

const STATUS_BAR = StatusBar.statusBarHeight || 34; 

const CreatePoll = () => {
    const navigation = useNavigation();
    const [questionText, setQuestionText] = useState('');
    const [canPost, setCanPost] = useState(false);
    const [optionsText, setOptionsText] = useState({o1: '', o2: '', o3: '', o4: ''})
    const tabBarHeight = useBottomTabBarHeight();
    const screenHeight = dimensions.height-tabBarHeight-STATUS_BAR;
    const [section, setSection] = useState(0);
    const [backColor, setColor] = useState({color: '#1F71EB', back: '#FFF'});
    const [media, setMedia] = useState({m1: null, m2: null, m3: null, m4: null})

    const setColors = (newText) => {
        if(newText == '') setColor({color: '#1F71EB', back: '#FFF'});
        else{ 
            setColor({color: '#FFF', back: '#1F71EB'})
        }
        setQuestionText(newText);
        if (optionsText.o1 && optionsText.o2 && questionText) setCanPost(true);
    }

    const setOptions = (newText, opNum) => {
        if (opNum == 1) setOptionsText({o1: newText, o2: optionsText.o2, o3: optionsText.o3, o4: optionsText.o4})
        else if (opNum == 2) setOptionsText({o1: optionsText.o1, o2: newText, o3: optionsText.o3, o4: optionsText.o4})
        else if (opNum == 3) setOptionsText({o1: optionsText.o1, o2: optionsText.o2, o3: newText, o4: optionsText.o4})
        else if (opNum == 4) setOptionsText({o1: optionsText.o1, o2: optionsText.o2, o3: optionsText.o3, o4: newText})

        if (optionsText.o1 && optionsText.o2 && questionText) setCanPost(true);
    }

    const Post_Poll = async () => {
        const tokens = await authStorage.getTokens();
        const access = JSON.parse(tokens).access;
        console.log(access);

        var ch = []
        if (optionsText.o1) ch = [...ch, {"choice_text": optionsText.o1}]
        if (optionsText.o2) ch = [...ch, {"choice_text": optionsText.o2}]
        if (optionsText.o3) ch = [...ch, {"choice_text": optionsText.o3}]
        if (optionsText.o4) ch = [...ch, {"choice_text": optionsText.o4}]

        var raw = JSON.stringify({
            "question_text": questionText,
            "choices": ch
          });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${access}`,
            },
            body: raw
        }
        var id = -1
        const response = await fetch('http://192.168.1.140:8000/pollish/polls/me/', options)
        .then(response => response.json())
        .then(response => {
            id = response.id
        })

        if(id !== -1){
            if (media.m1) Post_Image({m: media.m1, id: id, access: access})
            if (media.m2) Post_Image({m: media.m2, id: id, access: access})
            if (media.m3) Post_Image({m: media.m3, id: id, access: access})
            if (media.m4) Post_Image({m: media.m4, id: id, access: access})
        }

        setQuestionText('');
        setOptionsText({o1: '', o2: '', o3: '', o4: ''});
        setMedia({m1: null, m2: null, m3: null, m4: null});

        // const data = new FormData();
        // data.append("image", {uri: media.m1, name: 'image.jpg', type: 'image/jpg'});
        
        //   const options2 = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data; ',
        //         Authorization: `JWT ${access}`,
        //     },
        //     body: data
        //     }
        // if(id !== -1) {
        //     const response2 = await fetch(`http://192.168.1.140:8000/pollish/polls/${id}/images/`, options2)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
        // }

    }

    const Post_Image = async ({m, id, access}) =>{
        const data = new FormData();
        data.append("image", {uri: m, name: 'image.jpg', type: 'image/jpg'});

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; ',
                Authorization: `JWT ${access}`,
            },
            body: data
        }

        const response = await fetch(`http://192.168.1.140:8000/pollish/polls/${id}/images/`, options)
    }

    return (
        <View style={[styles.MainStyle, {marginTop: STATUS_BAR, height: screenHeight}]}>
            <View style={{position: 'absolute', backgroundColor: 'rgba(238,238,238,0.2)', height: dimensions.height/5, 
                        width: dimensions.width, borderBottomWidth: 1, borderColor: '#c4c4c4'}}/>
            <View style={{height: dimensions.height/100000, width: dimensions.width}}/>
            <View style={{alignItems: 'center', width: dimensions.width, height: dimensions.height/5, justifyContent: 'space-evenly'}}>
                <View/>
            <Text style={[{fontSize: 25, color: 'black'}, styles.text]}>Create a poll, find out what others think!</Text>
            <CreateBar setSection={setSection} color={backColor.color} background={backColor.back}/>
            </View>
            <View style={{height: screenHeight*(0.6), borderBottomWidth: dimensions.height/60, width: dimensions.width, borderColor: '#1F71EB'}}>
                {section == 0 ? <Question setColors={setColors} question={questionText}/> : 
                section == 1 ? <Choices setOptions={setOptions} optionsText={optionsText}/> :
                section == 2 ?  <Media setMedia={setMedia} media={media}/>:
                <View/>}
                {/* <Question/> */}
            </View>
            <View style={{marginTop: dimensions.height/70, flexDirection: 'row', justifyContent: 'space-between', width: dimensions.width*0.6}}>
                {section > 0 ? <TouchableOpacity onPress={() => setSection(section-1)}><NavButtonL arrow={arrowL} number={0}/></TouchableOpacity> : <View/>}
                {section < 3 ? <TouchableOpacity onPress={() => setSection(section+1)}><NavButtonR arrow={arrowR} number={1}/></TouchableOpacity> : <View/>}
            </View>
            <TouchableOpacity
                disabled={!canPost}
                onPress={Post_Poll}
                style={{flex: 1, justifyContent: 'center'}}
            >
                <Text style={{fontSize: 20, fontFamily: 'SFRound', color: `rgba(131,239,177,${canPost ? 1 : 0.3})`}}>POST</Text>
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
        borderRadius: 15,
    },

    input2: {
        borderWidth: 1,
        width: dimensions.width/1.2,
        height: dimensions.height/25,
        paddingHorizontal: 20,
        borderColor: '#DDD',
        borderRadius: 10,
    },

    text: {
        fontFamily: 'SFRound',
        width: dimensions.width/1.2,
        textAlign: 'center'
    },

    choiceText: {
        marginBottom: '2%', 
        fontWeight: 'bold', 
        fontSize: 12
    }
})