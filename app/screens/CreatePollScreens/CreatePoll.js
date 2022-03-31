import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import authStorage from '../../auth/storage';
import { PostPoll } from '../../api/post';

import arrowR from './../PollScreens/arrow.png'
import arrowL from './../PollScreens/arrowR.png'
import CreateBar from './CreateBar';
import NavButton from './NavButton';
import Question from './CreateQuestion';
import Choices from './CreateChoices';
import Media from './CreateMedia';
import { Top_Options_BG, Header_Text, Content_Section, Content_Navbar } from 'style/Create_Style';

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
        else setCanPost(false);
    }

    const setOptions = (newText, opNum) => {
        if (opNum == 1) setOptionsText({o1: newText, o2: optionsText.o2, o3: optionsText.o3, o4: optionsText.o4})
        else if (opNum == 2) setOptionsText({o1: optionsText.o1, o2: newText, o3: optionsText.o3, o4: optionsText.o4})
        else if (opNum == 3) setOptionsText({o1: optionsText.o1, o2: optionsText.o2, o3: newText, o4: optionsText.o4})
        else if (opNum == 4) setOptionsText({o1: optionsText.o1, o2: optionsText.o2, o3: optionsText.o3, o4: newText})

        if (optionsText.o1 && optionsText.o2 && questionText) setCanPost(true);
        else setCanPost(false);
    }

    const Post_Poll = async () => {

        var ch = []
        if (optionsText.o1) ch = [...ch, {"choice_text": optionsText.o1}]
        if (optionsText.o2) ch = [...ch, {"choice_text": optionsText.o2}]
        if (optionsText.o3) ch = [...ch, {"choice_text": optionsText.o3}]
        if (optionsText.o4) ch = [...ch, {"choice_text": optionsText.o4}]

        PostPoll({text: questionText, ch: ch, m: media});

        setQuestionText('');
        setOptionsText({o1: '', o2: '', o3: '', o4: ''});
        setMedia({m1: null, m2: null, m3: null, m4: null});
        setCanPost(false);

        navigation.navigate('Home')

    }

    return (
        <View style={{alignItems: 'center', marginTop: STATUS_BAR, height: screenHeight}}>
            <View style={Top_Options_BG}>
            <Text style={Header_Text}>Create a poll, find out what others think!</Text>
            <CreateBar setSection={setSection} color={backColor.color} background={backColor.back}/>
            </View>
            <View style={Content_Section}>
                { section == 0 ? <Question setColors={setColors} question={questionText}/> : 
                  section == 1 ? <Choices setOptions={setOptions} optionsText={optionsText}/> :
                  section == 2 ?  <Media setMedia={setMedia} media={media}/> :
                <View/> }
            </View>
            <View style={Content_Navbar}>
                {section > 0 ? <NavButton arrow={arrowL} number={-1} order={'row'} text={'PREV'} section={section} setSection={setSection}/> : <View/>}
                {section < 3 ? <NavButton arrow={arrowR} number={1} order={'row-reverse'} text={'NEXT'} section={section} setSection={setSection}/> : <View/>}
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