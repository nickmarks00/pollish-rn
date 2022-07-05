import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VoteButton, PollProfile, CommentsButton } from 'components';
import Styles from './styles';
import { RegisterVote } from '../../api/post';

import { getPoll } from '../../network/lib/pollish';
import { getUser } from '../../network/lib/core';

const PollDisplay = ({ id, commentsScreen, profileScreen, single }) => {

    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);


    const [voteCount, setVoteCount] = useState(0);
    const [userVote, setUserVote] = useState(null);

    const [tempVoteCount, setTempVoteCount] = useState(0);
    const [tempUserVote, setTempUserVote] = useState(null);

    const [unVoted, setUnvoted] = useState(-1);

    useEffect(() => {
        loadPoll();
        checkVote();
    }, []);

    useEffect(() => {
        loadUser();
    }, [post]);

    useEffect(() => {
        if(voteCount != tempVoteCount)
            setTempVoteCount(voteCount)
        if(userVote != userVote)
            setTempUserVote(userVote)
    }, [voteCount, userVote])

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
        if (userVote != response.data.user_vote)
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

    const offlineVoteUpdate = (cid) => {
        RegisterVote({cid: cid, id: post.id})
        if(tempUserVote == cid){
            setTempUserVote(null)
            setTempVoteCount(voteCount)
        }
        else if (tempUserVote != null){
            setTempUserVote(cid)
        }
        else{
            setTempUserVote(cid)
            setTempVoteCount(voteCount+1)
        }
    }

    if (post && user){
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <View style={Styles.container}>
                    <View style={{height: single ? '10%' : null}}>
                        {post?.community ?
                            <TouchableOpacity 
                                onPress={() => navigation.push('H_Community', {id: post.community.id})}
                            >
                                <Text>{post.community.name}</Text>
                            </TouchableOpacity>
                            :
                            <Text>None</Text>
                        }
                        <Text style={Styles.questionText}>{post.question_text}</Text>
                    </View>

                    {/* Profile Heading and comments navigation button */}
                    <View style={[Styles.profileContainer, {height: single ? '20%' : null}]}>
                        <PollProfile user={user} navigateProfile={navigateProfile} pid={post.id} voteCount={tempVoteCount} postTime={post.created_at}/>
                        <CommentsButton navigateComments={navigateComments}/>
                    </View>

                    {/* {post.images.length > 0 && 
                        <View style={{marginVertical: '5%', height: Dimensions.get('window').height/6}}>
                            <Image source={{uri: `http://${url}${post.images[0].image}`}} defaultSource={Lebron} style={{flex: 1, resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 20}}/>
                        </View>
                    } */}


                    <View style={{height: single ? '60%': null, justifyContent: 'center'}}>
                    {post.choices.map((choice, idx) => {
                        return (
                            <VoteButton
                                offlineVoteUpdate={offlineVoteUpdate}
                                post={post}
                                chosen={tempUserVote == choice.id ? 2 : tempUserVote ? 1 : 0}
                                checkVote={checkVote}
                                key={idx}
                                count={post.choices.length}
                                idx={idx}
                                choice={choice}
                                voteCount={ tempVoteCount}
                                unVoted={unVoted}
                                setUnvoted={setUnvoted}
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