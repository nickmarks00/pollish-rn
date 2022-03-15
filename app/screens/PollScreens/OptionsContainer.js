import React from 'react';
import { Options_Container, Choices_Header } from 'style/Poll_Style';
import { View, Text, Dimensions } from 'react-native';
import VoteButton from './VoteButton';

const colorsO = ['rgba(237, 48, 48, 0.2)', 'rgba(235, 172, 31, 0.2)', 'rgba(48, 158, 237, 0.2)']
const colors = ['#ED3030','#EBAC1F','#309EED']
const dimensions = Dimensions.get("window");


const OptionsContainer = (props) => {
    return(
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
          <Text style={Choices_Header}>Choices</Text>
          <Text style={[Choices_Header, {textAlign: 'right', right: dimensions.width*0.08}]}>{props.votes} 345 Votes</Text>
        </View>
        <View style={Options_Container}>
            {props.choices.map((choice, index) => {
                return (
                    <VoteButton key={index} count={props.choices.length} idx={index} choice={choice} colorO={colorsO[index]} color={colors[index]}/>
                );
            })}
        </View>
        </View>
    )
}

export default OptionsContainer;