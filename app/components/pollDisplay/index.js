import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VoteButton, PollProfile, CommentsButton } from 'components';
import Styles from './styles';

import { getPoll, registerVote } from '../../network/lib/pollish';
import { getUser } from '../../network/lib/core';
import logo from '../../assets/logos/jpgs/logo1.png';

const PollDisplay = ({ id, commentsScreen, profileScreen, single }) => {

    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState(null);
    const [oUser, setUser] = useState(null);
    const {user, logout} = useAuth();


    const [voteCount, setVoteCount] = useState(0);
    const [userVote, setUserVote] = useState(null);

    const [tempVoteCount, setTempVoteCount] = useState(0);
    const [tempUserVote, setTempUserVote] = useState(null);

    const [unVoted, setUnvoted] = useState(-1);
    const [activeIndexNumber, setActiveIndexNumber] = useState(Number);

    useEffect(() => {
        loadPoll();
        checkVote();
    }, []);

    useEffect(() => {
        loadUser();
    }, [post]);

    useEffect(() => {
        if(voteCount != tempVoteCount){
            setTempVoteCount(voteCount)
        }
        if(userVote != tempUserVote){
            setTempUserVote(userVote)
        }
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
        console.log(response.data.user_vote)
        if (userVote != response.data.user_vote){
            console.log('registering')
            setUserVote(response.data.user_vote);
        }

        var count = 0;
        response.data.choices.map((choice, idx) => {
            count += choice.num_votes;
        });
        setVoteCount(count);
    };

    const navigateProfile = () => {
        navigation.push(profileScreen, {user: oUser, title: oUser.username});
    };
    
    const navigateComments = () => {
        navigation.push(commentsScreen, {post: post});
    };

    const offlineVoteUpdate = (cid) => {
        
        if(tempUserVote == cid){
            registerVote(post.id, user.id, cid, null)
            setTempUserVote(null)
            if (userVote)
                setTempVoteCount(voteCount-1)
            else
                setTempVoteCount(voteCount)
        }
        else if (tempUserVote != null){
            registerVote(post.id, user.id, tempUserVote, cid)
            setTempUserVote(cid)
        }
        else{
            registerVote(post.id, user.id, null, cid)
            setTempUserVote(cid)
            if(userVote)
                setTempVoteCount(voteCount)
            else
                setTempVoteCount(voteCount+1)
        }
    }

    if (post && oUser){
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <View style={Styles.container}>

                    {/* Profile Heading and comments navigation button */}
                    <View style={[Styles.profileContainer, {height: single ? '20%' : null, paddingHorizontal: '5%'}]}>
                        <PollProfile user={oUser} navigateProfile={navigateProfile} pid={post.id} voteCount={tempVoteCount} postTime={post.created_at}/>
                        <CommentsButton navigateComments={navigateComments}/>
                    </View>

                    {post.images.length > 0 &&
                        <View style={{marginVertical: '2%', height: Dimensions.get('window').height/3.5}}>
                            <ScrollView
                                style={{borderTopWidth: 1, borderTopColor: '#EEE'}}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                directionalLockEnabled={true}
                                automaticallyAdjustContentInsets={false}
                                disableIntervalMomentum={true}
                                horizontal
                                onMomentumScrollEnd={(event) => console.log(event.nativeEvent.contentOffset.x)}
                                onScroll={e => {
                                let slide = Math.round(
                                e.nativeEvent.contentOffset.x/ 
                                e.nativeEvent.layoutMeasurement.width,);
                                if (slide !== activeIndexNumber) {
                                setActiveIndexNumber(slide); //here we will set our active index num
                                }}}
                                >
                                {post.images.map((image, idx) => {
                                    return(
                                        <View key={idx} style={{ width: Dimensions.get('window').width, height: '100%'}}>
                                        <Image source={{uri: image.image}} defaultSource={logo} style={{flex: 1, resizeMode: 'cover'}}/>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={Styles.dotContainer}>
                                {post.images.slice(0, activeIndexNumber < 5 ? 5 : post.images.length - 5).map((item, index) => {
                                if (post.images.length !== 1) { // if imagelist array length not 1 
                                    console.log('number ' + activeIndexNumber)
                                if (activeIndexNumber < 5) { //if activeindex lower than five 
                                return (
                                    <View
                                    key={index}
                                    style={[index == activeIndexNumber ? [Styles.dot,{ backgroundColor: '#147EFB'},] : Styles.dot,]}>
                                    </View>);
                                } else { //if activeindex higher than five
                                return (
                                <View
                                    key={index}
                                    style={[index == activeIndexNumber - 5 ? [Styles.dot,{ backgroundColor: '#147EFB'},]: Styles.dot,]}>
                                </View>);
                                }}
                                else{
                                    <View/>
                                }
                                })}
                                </View>
                            </View>
                        </View>
                        
                    }

                    <View style={{height: single ? '10%' : null, marginBottom: '5%', paddingHorizontal: '5%'}}>
                        {post?.community ?
                            <TouchableOpacity 
                                onPress={() => navigation.push('H_Community', {id: post.community.id, title: post.community.name})}
                            >
                                <Text>{post.community.name}</Text>
                            </TouchableOpacity>
                            :
                            <Text>None</Text>
                        }
                        <Text style={Styles.questionText}>{post.question_text}</Text>
                    </View>

                    

                    


                    <View style={{height: single ? '60%': null, justifyContent: 'center', paddingHorizontal: '5%'}}>
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
                                userVote={userVote}
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