{/*
    Component for rendering the entire comment section.
*/}

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, KeyboardAvoidingView, ScrollView, Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Comment from './Comment';
import PostInformation from './PostInformation';
import PostOptions from './PostOptions';
import CreateComment from './CreateComment';
import PollQuestion from './../PollScreens/PollQuestion'
import {BASE_IP} from '@env';
import { Question_Box, Post_Question } from 'style/Poll_Style'
import { Filter_Button } from '../Styling/Comments_Style';

const dimensions = Dimensions.get('screen');

const colorsO = ['rgba(237, 48, 48, 0.2)', 'rgba(235, 172, 31, 0.2)', 'rgba(48, 158, 237, 0.2)']
const colors = ['#ED3030','#EBAC1F','#309EED']

const CommentSection = (props) => {

    const route = useRoute();
    const [comments, addComment] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [comments_, setComments] = useState([]);

    useEffect(() => {
        fetchDataFromApi();
      }, []);

      const fetchDataFromApi = async () => {
        const url = `http://${BASE_IP}/core/users/${route.params.uid}/polls/${route.params.pid}/comments`;
    
        setLoading(true);
    
        const res = fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
            setComments(data);
            setLoading(false);
            })
            .catch(error => {
            console.error(error);
            });
    };


    // Load fonts
    let [fontsLoaded] = useFonts({
        'SFRound': require('../../assets/fonts/SFRoundBold.ttf'),
      });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    

    

    return (
        <View style ={{flex: 1}}>
            <View style={{height: dimensions.height/40}}/>
            <View style={{width: dimensions.width, height: dimensions.height/6}}>
                <View style={Question_Box}>
                    <Text style={{color: '#AAA', fontSize: 10, textAlign: 'center', fontWeight: 'bold'}}>Question</Text>
                    <Text adjustsFontSizeToFit numberOfLines={4} style={Post_Question}>
                        {route.params.question}
                    </Text>
                </View>
            </View>
            <View style={{marginBottom: dimensions.height/30, flexDirection: 'row', width: dimensions.width*0.95, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{position: 'absolute', height: '70%', width: dimensions.width*2, backgroundColor: 'rgba(204,204,204,0.3)'}}/>
                <Text style={{color: '#AAA', fontWeight: 'bold'}}>Filtering:</Text>
                <View style={[Filter_Button, {backgroundColor: 'white', borderColor: '#EBAC1F', borderWidth: 1}]}>
                            <Text style={{fontWeight: 'bold', color: '#EBAC1F'}}>Lebron James</Text>
                        </View>
                {/* <ScrollView horizontal={true}>
                {route.params.options_.map((option_, idx) => {
                    return (
                        <View key={idx} style={[Filter_Button, {backgroundColor: colorsO[idx]}]}>
                            <Text style={{fontWeight: 'bold'}}>{option_.choice_text}</Text>
                        </View>
                    );
                })}
                </ScrollView> */}
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior="padding"
                keyboardVerticalOffset={0}
            >
                {/* Section where comments are rendered */}
                <View style ={{ flex: 1, borderTopWidth: 10, paddingTop:20, borderColor: '#1F71EB'}}>
                    <ScrollView>
                        {comments_.map((comment, index) => {
                            return (
                                <Comment key={index} comment_text={comment.comment_text}/>
                            )
                        })}
                    </ScrollView>
                </View>

                {/* Section to type and post comments*/}
                <CreateComment/>

            </KeyboardAvoidingView>
        </View>
    )
}

export default CommentSection;