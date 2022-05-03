import React from 'react';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import VoteButton from './OptionsComponents/VoteButton';
import {BASE_URL} from '@env';
import authStorage from 'auth/storage'
import { GetPoll } from '../../../../api/comments';

const base = BASE_URL;

const OptionsContainer = ({post}) => {

    const [userVote, setUserVote] = useState(null);
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        checkVote();
    }, []);

    const checkVote = async () => {
        const pollInfo = await GetPoll(post.id);
        console.log(pollInfo)

        setUserVote(pollInfo.user_vote)
        
        var count = 0
        pollInfo.choices.map((choice, idx) => {
            count += choice.num_votes;
        })
        setVoteCount(count);

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