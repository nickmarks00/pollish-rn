import React, {useState} from 'react';
import { useFonts } from 'expo-font';
import { View, Dimensions, Text } from 'react-native';
import { PollImage, PollQuestion, MoreOptions, OptionsContainer, InfoCard } from './PollComponents'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const dimensions = Dimensions.get('window');

/*
  * This Component is responsible for displaying a poll on the main home page
  ! Requires a post data structure

  TODO: Remove the View components around each of the custom components
*/

const PollView = ({post, commentsScreen, navigation}) => {

  const [open, setOpen] = useState(false)
  const tabBarHeight = useBottomTabBarHeight();
  const pollHeight = dimensions.height - tabBarHeight - 100;

  // Load Fonts
  let [fontsLoaded] = useFonts({
    'SFRound': require('../../assets/fonts/SFRoundBold.ttf'),
    'SFReg': require('../../assets/fonts/SFRound.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Loading Fonts</Text>;
  }

  const navigateProfile = (owner) => {
    setOpen(false)
    navigation.push('ProfileNav', {user: owner})
  }

  return (
    <View style={{ width: dimensions.width, height: pollHeight}}>

      {/* Modal Popup */}
      <InfoCard setOpen={setOpen} id={post.user_id} open={open} navigateProfile={navigateProfile}/>

      {/* Main Poll View */}
      {post.images.length > 0 && <View style={{ flex: 6}}><PollImage images={post.images}/></View>}
      <View style={{flex: 2.2}}><PollQuestion question={post.question_text}/></View>
      <View style={{flex: 6.5}}><OptionsContainer post={post}/></View>
      <View style={{flex: 1.5}}><MoreOptions post={post} setOpen={setOpen} commentsScreen={commentsScreen}/></View>

    </View>
  );
};
export default PollView;
