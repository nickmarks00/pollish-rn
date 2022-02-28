{/*
    Component for rendering the entire comment section.
*/}

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, KeyboardAvoidingView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Comment from './Comment';
import PostInformation from './PostInformation';
import PostOptions from './PostOptions';
import CreateComment from './CreateComment';
import {BASE_IP} from '@env';

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

            {/* Top Section (Contains details about post) */}
            <View style={{ borderBottomWidth: 2 }}>

                {/* Container with post image and question */}
                <PostInformation/>

                {/* Container with post options */}
                <PostOptions choices={route.params.options_}/>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior="padding"
                keyboardVerticalOffset={75}
            >
                {/* Section where comments are rendered */}
                <View style ={{ flex: 1 }}>
                    {comments_.map((comment, index) => {
                        return (
                            <Text key={index}>{comment.comment_text}</Text>
                        )
                    })}
                </View>

                {/* Section to type and post comments*/}
                <CreateComment/>

            </KeyboardAvoidingView>
        </View>
    )
}

export default CommentSection;