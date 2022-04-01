{/*
    Component for rendering the entire comment section.
*/}

import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Comment from './Comment';
import CreateComment from './CreateComment';
import {BASE_URL} from '@env';
import { Question_Container, Comments_DisplayArea } from 'style/Comments_Style';
import FilterPopup from './FilterPopup';
import { PollQuestion } from '../PollScreens';
import FilterBar from './FilterBar';

const base = BASE_URL;

const CommentSection = () => {

    const route = useRoute();
    const post = route.params.post

    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [selected, setSelected] = useState({txt: "No Filter", idx: 0});
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchDataFromApi();
      }, []);

      const fetchDataFromApi = async () => {
          console.log("c")
        const url = `http://${base}/core/users/${post.user_id}/polls/${post.id}/comments`;
    
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

    const SetFilter = (props) => {
        
        setSelected({txt: props.txt, idx: props.idx});
        setModalVisible(!modalVisible);
    }

    

    

    return (
        <View style ={{flex: 1}}>
            {/* Modal Popup for chosing filter */}
            <FilterPopup setModalVisible={setModalVisible} modalVisible={modalVisible} SetFilter={SetFilter} post={post}/>

            {/* Top Section containing Question information */}
            <View style={Question_Container}>
                <PollQuestion question={post.question_text}/>
            </View>

            {/* FilterBar the currently selected filter */}
            <FilterBar setModalVisible={setModalVisible} selected={selected}/>
            
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={0}
            >
                {/* Section where comments are rendered */}
                <View style ={Comments_DisplayArea}>
                    <ScrollView>
                        {comments.map((comment, index) => {
                            return (
                                <Comment key={index} comment_text={comment.comment_text} user={comment.user_id}/>
                            )
                        })}
                    </ScrollView>
                </View>

                {/* Section to type and post comments*/}
                <CreateComment reload={fetchDataFromApi}/>

            </KeyboardAvoidingView>
        </View>
    )
}

export default CommentSection;