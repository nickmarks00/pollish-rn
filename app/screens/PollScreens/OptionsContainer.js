import React from 'react';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import VoteButton from './VoteButton';
import {BASE_URL} from '@env';
import authStorage from 'auth/storage'

const base = BASE_URL;

const OptionsContainer = ({post}) => {

    const [userVote, setUserVote] = useState(null);
    const [voteCount, setVoteCount] = useState(0);

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
    
        const response = await fetch(`http://${base}/pollish/polls/${post.id}/`, options)
        .then(response => response.json())
            .then(response => {
                setUserVote(response.user_vote);

                var count = 0
                response.choices.map((choice, idx) => {
                    count += choice.num_votes;
                })
                setVoteCount(count);
            })
      }

    return(
        <View style={{flex: 1}}>
            {post.choices.map((choice, index) => {
                return (
                    <VoteButton post={post} chosen={userVote == choice.id ? 2 : userVote ? 1 : 0} checkVote={checkVote} key={index} count={post.choices.length} idx={index} choice={choice} voteCount={voteCount}/>
                );
            })}
        </View>

    )
}

export default OptionsContainer;