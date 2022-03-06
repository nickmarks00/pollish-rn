import React from 'react';
import { Options_Container } from 'style/Poll_Style';
import { View } from 'react-native';
import VoteButton from './VoteButton';

const OptionsContainer = (props) => {
    return(
        <View style={Options_Container}>
            {props.choices.map((choice, index) => {
                return (
                    <VoteButton key={index} choice={choice}/>
                );
            })}
        </View>
    )
}

export default OptionsContainer;