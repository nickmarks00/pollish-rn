import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Lebron from '../../assets/lebron.jpg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VoteButton, PollProfile, CommentsButton } from 'components';

import {REACT_APP_BASE_URL} from '@env';
import { getPoll } from '../../network/lib/pollish';
import { getUser } from '../../network/lib/core';
const url = REACT_APP_BASE_URL;


const dimensions = Dimensions.get('window');

const PollDisplay = ({ id, commentsScreen, profileScreen, single }) => {

    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [voteCount, setVoteCount] = useState(0);
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        loadPoll();
        checkVote();
    }, []);

    useEffect(() => {
        loadUser();
    }, [post]);

    const loadPoll = async () => {
        getPoll(route.params?.id ? route.params.id : id).then(function(response){
            setPost(response.data);
        })
    };

    const loadUser = async () => {
        if (post){
            getUser(post.user_id).then(function(response){
                setUser(response.data);
            })
        }
    }

    const checkVote = async () => {
        const response = await getPoll(route.params?.id ? route.params.id : id);
        setUserVote(response.data.user_vote);

        var count = 0;
        response.data.choices.map((choice, idx) => {
            count += choice.num_votes;
        });
        setVoteCount(count);
    };

    const navigateProfile = () => {
        navigation.push(profileScreen, {user: user});
    };
    
    const navigateComments = () => {
        navigation.push(commentsScreen, {post: post});
    };

    if (post && user){
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <View style={[Styles.cardContainer, { width: '100%', padding: '5%' }]}>
                    {post?.community ?
                        <TouchableOpacity onPress={() => navigation.push('H_Community', {id: post.community.id})} ><Text>{post.community.name}</Text></TouchableOpacity>
                        :
                        <Text>None</Text>

                    }
                    <Text style={{fontSize: 20}}>{post.question_text}</Text>

                    {/* Profile Heading and comments navigation button */}
                    <View style={{flexDirection: 'row', marginTop: Dimensions.get('window').height/50, alignItems: 'center'}}>
                        <PollProfile user={user} navigateProfile={navigateProfile} pid={post.id} voteCount={voteCount}/>
                        <CommentsButton navigateComments={navigateComments}/>
                    </View>

                    {post.images.length > 0 && 
                        <View style={{marginVertical: '5%', height: Dimensions.get('window').height/6}}>
                            <Image source={{uri: `http://${url}${post.images[0].image}`}} defaultSource={Lebron} style={{flex: 1, resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 20}}/>
                        </View>
                    }
                    <View style={{height: single ? '30%': null, justifyContent: 'center'}}>
                    {post.choices.map((choice, idx) => {
                        return (
                            <VoteButton
                                post={post}
                                chosen={userVote == choice.id ? 2 : userVote ? 1 : 0}
                                checkVote={checkVote}
                                key={idx}
                                count={post.choices.length}
                                idx={idx}
                                choice={choice}
                                voteCount={voteCount}
                            />
                        )
                    })}
                    </View>

                </View>
            </View>
        )
                }
    else return <View />;
}

export default PollDisplay;

const Styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF', 
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5
    }
})