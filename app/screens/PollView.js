import React, {useState, useEffect} from 'react';
import { useFonts } from 'expo-font';
import { View, Dimensions, Text } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';

import { PollImage, VoteButton, PollQuestion, MoreOptions } from 'components';
import InfoCard from 'modals/InfoCard'

import { GetPoll } from '../api/comments';


const dimensions = Dimensions.get('window');

/*
  * This Component is responsible for displaying a poll on the main home page
  ! Requires a post data structure

  TODO: Remove the View components around each of the custom components
*/

const PollView = ({id, commentsScreen, profileScreen, communityScreen}) => {

  const navigation = useNavigation();
  const route = useRoute();

  const [open, setOpen] = useState(false)
  const [userVote, setUserVote] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [post, setPost] = useState(null);

  useEffect(() => {
        loadPoll();
        checkVote();
    }, []);

  const loadPoll = async () => {
    const data = await GetPoll(route.params?.id ? route.params.id : id);
    setPost(data);
  }

  const checkVote = async () => {
    const pollInfo = await GetPoll(route.params?.id ? route.params.id : id);
    console.log(pollInfo)

    setUserVote(pollInfo.user_vote)
    
    var count = 0
    pollInfo.choices.map((choice, idx) => {
        count += choice.num_votes;
    })
    setVoteCount(count);

  }

  const tabBarHeight = useBottomTabBarHeight();
  const pollHeight = dimensions.height - tabBarHeight - 100;

  // Load Fonts
  let [fontsLoaded] = useFonts({
    'SFRound': require('../assets/fonts/SFRoundBold.ttf'),
    'SFReg': require('../assets/fonts/SFRound.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Loading Fonts</Text>;
  }

  

  const navigateProfile = (owner) => {
    setOpen(false)
    navigation.push(profileScreen, {user: owner})
  }

  const navigateCommunity = (id) => {
    setOpen(false)
    navigation.push(communityScreen, {id: id})
  }

  if(post)
    return (
      <View style={{ width: dimensions.width, height: pollHeight}}>

        {/* Modal Popup */}
        <InfoCard setOpen={setOpen} post={post} id={post.user_id} open={open} navigateCommunity={navigateCommunity} navigateProfile={navigateProfile}/>

        {/* Main Poll View */}
        {post.images.length > 0 && <View style={{ flex: 6}}><PollImage images={post.images}/></View>}
        <View style={{flex: 2.2}}><PollQuestion question={post.question_text}/></View>
        {/* Options Container */}
        <View style={{flex: 6.5}}>
          {post.choices.map((choice, index) => {
            return (
                <VoteButton post={post} chosen={userVote == choice.id ? 2 : userVote ? 1 : 0} checkVote={checkVote} key={index} count={post.choices.length} idx={index} choice={choice} voteCount={voteCount}/>
            );
          })}
        </View>

        {/* Navigation Buttons */}
        <View style={{flex: 1.5}}><MoreOptions post={post} setOpen={setOpen} commentsScreen={commentsScreen ? commentsScreen : route.params.commentsScreen}/></View>

      </View>
    );
  else return ( <View/> )
};
export default PollView;
