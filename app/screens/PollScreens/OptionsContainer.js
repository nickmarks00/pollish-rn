import React from 'react';
import { useState, useEffect } from 'react';
import { Options_Container, Choices_Header } from 'style/Poll_Style';
import { View, Text, Dimensions } from 'react-native';
import VoteButton from './VoteButton';
import {BASE_URL} from '@env';
import authStorage from './../../auth/storage'

const base = BASE_URL;

const colorsO = ['rgba(239, 148, 108, 0.3)', 'rgba(151, 216, 196, 0.3)', 'rgba(220, 107, 173, 0.3)', 'rgba(0, 0, 0, 0.3)']
const colors = ['#EF946C','#5ED1D0','#DC6BAD', '#000']
const dimensions = Dimensions.get("window");


const OptionsContainer = (props) => {

    const [hasVoted, setVoted] = useState({voted: false, choice: -1});
    const [userVote, setUserVote] = useState(null);
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        checkVote();
        getVoteCount();
    }, []);

    const getVoteCount = () => {
        var count = 0
        props.choices.map((choice, idx) => {
            count += choice.num_votes;
        })
        console.log(count);
        setVoteCount(count);
    }

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

                var count = 0
                response.choices.map((choice, idx) => {
                    count += choice.num_votes;
                })
                console.log(count);
                setVoteCount(count);
            })
      }

    return(
        <View style={{flex: 1}}>
        <View style={Options_Container}>
            {props.choices.map((choice, index) => {
                return (
                    <VoteButton chosen={userVote == choice.id ? 2 : userVote ? 1 : 0} getVoteCount={getVoteCount} checkVote={checkVote} key={index} count={props.choices.length} idx={index} choice={choice} colorO={colorsO[index]} color={colors[index]} pollID={props.pollID} hasVoted={hasVoted} voteCount={voteCount}/>
                );
            })}
        </View>
        </View>
    )
}

export default OptionsContainer;