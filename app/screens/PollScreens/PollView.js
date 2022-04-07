import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import { useFonts } from 'expo-font';
import {PollImage, PollQuestion, MoreOptions, OptionsContainer} from '.'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PrimaryPollish, GreyBorder } from 'style/App_Styles';
import InfoCard from './InfoCard';

const dimensions = Dimensions.get('window');

const PollView = (props) => {

  const [open, setOpen] = useState(false)
  const tabBarHeight = useBottomTabBarHeight();

  let [fontsLoaded] = useFonts({
    'SFRound': require('../../assets/fonts/SFRoundBold.ttf'),
    'SFReg': require('../../assets/fonts/SFRound.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Loading Fonts</Text>;
  }

  return (
    <View style={{ width: dimensions.width, height: dimensions.height - tabBarHeight - 50}}>

      {/* Modal Popup */}
      <InfoCard setOpen={setOpen} open={open}/>
      {/* End Modal Popup */}

      {/* Main Poll View */}
      <View style={{ flex: 8 }}><PollImage images={props.post.images}/></View>
      <View style={{ flex: 0.3, backgroundColor: PrimaryPollish}}/>
      <View style={[{flex: 2.2}, GreyBorder]}><PollQuestion backColor={'#FAFAFA'} question={props.question} size={16}/></View>
      <View style={[{flex: 6.5}, GreyBorder]}><OptionsContainer post={props.post}/></View>
      <View style={{flex: 1.5}}><MoreOptions post={props.post}/></View>
      {/* End Main Poll View */}

    </View>
  );
};


export default PollView;
