{/*
    Component to render post information for the top portion of the comment section
    Image and Question Text
*/}

import React from 'react';
import {View, Dimensions, StyleSheet, Text, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';

const dimensions = Dimensions.get("screen");

const PostInformation = () => {

    const route = useRoute();

    return (
        <View style={styles.question_container}>
                    <Image
                        source={require('../../../../assets/lebron.jpg')}
                        style={styles.post_image}
                    />
                    <View style={styles.question_box}>
                        <Text style={styles.question_text}>
                            {route.params.question}
                        </Text>
                    </View>
                </View>
    );
}

export default PostInformation;


const styles = StyleSheet.create({

    question_container: {
        padding: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        alignContent: 'center'
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

    question_text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'SFRound'
    },

    post_image: {
        width: dimensions.width/3,
        height: dimensions.width/3,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: dimensions.width,
        borderWidth: dimensions.width/80,
    },

})