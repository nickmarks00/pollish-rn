import React, {useState, useEffect} from 'react';
import {TouchableHighlight, View, Text, Dimensions, TextInput, Image, StyleSheet, Button, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import uuid from 'react-native-uuid'

const dimensions = Dimensions.get("screen");

const CommentSection = (props) => {

    const route = useRoute();
    const [text, onChangeText] = React.useState("");
    const [comments, addComment] = React.useState([]);

    let [fontsLoaded] = useFonts({
        'SFRound': require('../assets/fonts/SFRoundBold.ttf'),
      });
      if (!fontsLoaded) {
        return <Text>Hi</Text>;
      }

    function handleComment(){
        const newlist = comments.concat({'item': text, 'idx': uuid.v4()})
        addComment(newlist);
    }

    const renderItem = ({ item }) => (
        <View style={{
            flexDirection: 'row'
        }}>
            <View style={{width: 20}}></View>
            <View style={{
                borderWidth: 2,
                borderRadius: 20,
                padding: 10,
                marginVertical: 8,
                }}>
                <Text style ={{
                    marginHorizontal: 5
                }}>
                    {item.item}
                </Text>
            </View>
        </View>
    )

    return (
        <View style ={{flex: 1}}>
            <View style={styles.top_section}>
            <View style={{padding: 20, flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                <Image
                    source={require('../assets/lebron.jpg')}
                    style={styles.post_image}
                />
                <View style={styles.question_box}><Text style={styles.question}>{route.params.question}</Text></View>
            </View>
            <View style={{
                marginTop: -30,
                height: dimensions.height*0.1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}>
                {route.params.options_.map((option_, idx) => {
                    return (
                        <TouchableOpacity style={styles.choice_buttons}key={idx}><Text style={{fontFamily: 'SFRound', textAlign: 'center', fontSize: 11, color: 'white'}}>{option_.choice_text}</Text></TouchableOpacity>
                    );
                })}
            </View>
            </View>
            <View style ={{
                flex: 1
            }}>
                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={comment => comment.idx}
                />
            </View>
            <View style ={{
                justifyContent: 'flex-end',
                marginBottom: 36
            }}>
                <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="What do you want to know?"
                />
                <Button
                onPress={handleComment}
                title="Post"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
            </View>
    </View>
        )
}

const styles = StyleSheet.create({

    choice_buttons: {
        width: 80,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#90C7FC',
        textAlign: 'center',
        justifyContent: 'center'
    },

    top_section: {
        borderBottomWidth: 2
    },

    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },

    question_box: {
        height: dimensions.width/5,
        width: dimensions.width/1.5,
        backgroundColor: 'black',
        margin: -40,
        zIndex: -1,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },

    question: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'SFRound'

    },

    post_image: {
        width: dimensions.width/3,
        height: dimensions.width / 3,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 5,
        marginTop: 0,
      },
  });

export default CommentSection;