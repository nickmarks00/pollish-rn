import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions, TouchableOpacity, StatusBar, Button } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { PostPoll } from '../../api/post';

import arrowR from './../../assets/arrow.png'
import arrowL from './../../assets/arrowR.png'
import { CreateBar, NavButton, Question, Choices, Media } from '.';
import { Top_Options_BG, Header_Text, Content_Section, Content_Navbar } from 'style/Create_Style';

/* 
    ! MAKE THIS COMPONENT MUCH NICER
*/
const dimensions = Dimensions.get('window');

const STATUS_BAR = StatusBar.statusBarHeight || 34; 

const CreatePoll = ({setPoll}) => {
    const navigation = useNavigation();
    const screenHeight = dimensions.height-useBottomTabBarHeight();-STATUS_BAR;

    const [section, setSection] = useState(0);
    
    // * Ready for posting variables
    const [canPost, setCanPost] = useState(false);
    const [ready, setReady] = useState({q: false, o: false, m: false, s: false});
     
    // * Creation elements storage
    const [questionText, setQuestionText] = useState('');
    const [optionsText, setOptionsText] = useState({o1: '', o2: '', o3: '', o4: ''})
    const [media, setMedia] = useState({m1: null, m2: null, m3: null, m4: null})

    useEffect(() => {
        checkPost();
      }, [questionText, media, optionsText]);

    const checkPost = () => {
        if(questionText) ready.q = true;
        else ready.q = false;

        if(optionsText.o1 && optionsText.o2) ready.o = true;
        else ready.o = false;

        if(media.m1) ready.m = true;
        else ready.m = false;

        if(ready.q && ready.o) setCanPost(true);
        else setCanPost(false);

        setReady({...ready})
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
            <Button title={'Back'} onPress={() => setPoll(false)}></Button>
            <Text style={Header_Text}>Create a poll, find out what others think!</Text>
            <CreateBar setSection={setSection} ready={ready}/>
            </View>
            <View style={Content_Section}>
                { section == 0 ? <Question setQuestionText={setQuestionText} question={questionText}/> : 
                  section == 1 ? <Choices setOptions={setOptionsText} optionsText={optionsText}/> :
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