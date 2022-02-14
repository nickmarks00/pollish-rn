{/*
    Component for rendering buttons containing the different options from a post
    Buttons act as filters for the comment section
*/}

import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';

const dimensions = Dimensions.get("screen");

const PostOptions = (props) => {
    return (
        <View style={styles.options_container}>
            {props.choices.map((option_, idx) => {
                return (
                    <TouchableOpacity style={styles.choice_buttons}key={idx}>
                        <Text style={styles.option_text}>
                            {option_.choice_text}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default PostOptions;


const styles = StyleSheet.create({

    options_container: {
        marginTop: -30,
        height: dimensions.height*0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    option_text: {
        fontFamily: 'SFRound',
        textAlign: 'center', 
        fontSize: 11, 
        color: 'white'
    },

    choice_buttons: {
        width: dimensions.width/4,
        height: dimensions.width/12,
        borderRadius: dimensions.width/20,
        backgroundColor: '#90C7FC',
        textAlign: 'center',
        justifyContent: 'center'
    },

})