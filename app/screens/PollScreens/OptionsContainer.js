import React from 'react';
import { useState, useEffect } from 'react';
import { Options_Container, Choices_Header } from 'style/Poll_Style';
import { View, Text, Dimensions } from 'react-native';
import VoteButton from './VoteButton';
import {BASE_URL} from '@env';
import authStorage from './../../auth/storage'

const base = BASE_URL;

const colorsO = ['rgba(237, 48, 48, 0.2)', 'rgba(235, 172, 31, 0.2)', 'rgba(48, 158, 237, 0.2)']
const colors = ['#ED3030','#EBAC1F','#309EED']
const dimensions = Dimensions.get("window");


const OptionsContainer = (props) => {

    const [hasVoted, setVoted] = useState({voted: false, choice: -1});
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        checkVote();
    }, []);

    const checkVote = async () => {

        const res = await authStorage.getTokens();
        const access = JSON.parse(res).access;
        
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${access}`,
          }
        }
    
        const response = await fetch(`http://${base}/pollish/polls/${props.pollID}/`, options)
        .then(response => response.json())
            .then(response => {
                console.log(response.user_vote);
                setUserVote(response.user_vote);
            })
      }

    return(
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
          <Text style={Choices_Header}>Choices</Text>
          <Text style={[Choices_Header, {textAlign: 'right', right: dimensions.width*0.08}]}>{props.votes} 345 Votes</Text>
        </View>
        <View style={Options_Container}>
            {props.choices.map((choice, index) => {
                return (
                    <VoteButton chosen={userVote == choice.id ? 2 : userVote ? 1 : 0}checkVote={checkVote} key={index} count={props.choices.length} idx={index} choice={choice} colorO={colorsO[index]} color={colors[index]} pollID={props.pollID} hasVoted={hasVoted}/>
                );
            })}
        </View>
        </View>
    )
}

export default OptionsContainer;