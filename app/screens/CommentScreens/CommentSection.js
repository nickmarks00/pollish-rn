{/*
    Component for rendering the entire comment section.
*/}

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions, Modal, StyleSheet, Pressable} from 'react-native';
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
import DropDownPicker from 'react-native-custom-dropdown';

const dimensions = Dimensions.get('screen');

const colorsO = ['rgba(237, 48, 48, 0.2)', 'rgba(235, 172, 31, 0.2)', 'rgba(48, 158, 237, 0.2)']
const colors = ['#ED3030','#EBAC1F','#309EED']

const CommentSection = (props) => {

    const route = useRoute();
    const [comments, addComment] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [comments_, setComments] = useState([]);
    const [selected, setSelected] = useState();
    const [modalVisible, setModalVisible] = useState(false);

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
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color: '#AAA', fontWeight: 'bold', marginBottom: '5%'}}>Choose Filter</Text>
            {route.params.options_.map((option_, idx) => {
                return (
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <View style={[Filter_Button, {backgroundColor: 'white', borderColor: colors[idx], borderWidth: 1, marginVertical: '2%'}]}>
                            <Text style={{fontWeight: 'bold', color: colors[idx]}}>{option_.choice_text}</Text>
                        </View>
                    </TouchableOpacity>
                    );
                })}
          </View>
        </View>
      </Modal>
            <View style={{height: dimensions.height/40}}/>
            <View style={{width: dimensions.width, height: dimensions.height/6}}>
                <View style={Question_Box}>
                    <Text style={{color: '#AAA', fontSize: 10, textAlign: 'center', fontWeight: 'bold'}}>Question</Text>
                    <Text adjustsFontSizeToFit numberOfLines={4} style={Post_Question}>
                        {route.params.question}
                    </Text>
                </View>
            </View>
            <View style={{marginBottom: dimensions.height/30, flexDirection: 'row', width: dimensions.width, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{position: 'absolute', height: '70%', width: dimensions.width*1, backgroundColor: 'rgba(204,204,204,0.3)'}}/>
                <Text style={{color: '#AAA', fontWeight: 'bold'}}>Filtering:</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>

                <View style={[Filter_Button, {backgroundColor: 'white', borderColor: '#EBAC1F', borderWidth: 1}]}>
                            <Text style={{fontWeight: 'bold', color: '#EBAC1F'}}>Lebron James</Text>
                            
                        </View>
                        </TouchableOpacity>
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

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });