import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import { useFonts } from 'expo-font';
import { PollImage, PollQuestion, MoreOptions, OptionsContainer, InfoCard } from '.'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PrimaryPollish, GreyBorder } from 'style/App_Styles';

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
  console.log(props.post.images.length)

  return (
    <View style={{ backgroundColor: '#FAFAFA' , width: dimensions.width, height: dimensions.height - tabBarHeight - 100}}>

      {/* Modal Popup */}
      <InfoCard setOpen={setOpen} open={open}/>
      {/* End Modal Popup */}

      {/* Main Poll View */}
      {/* {props.post.images.length == 0 &&
        <View style={{ flex: 1.3, backgroundColor: PrimaryPollish, borderBottomStartRadius: 0, borderBottomEndRadius: 1000,
          }}/>
      } */}
      {/* {props.post.images.length > 0 &&
        <View style={{ top: 0, width: dimensions.width, height: dimensions.height/12, backgroundColor: PrimaryPollish, borderBottomStartRadius: 0, borderBottomEndRadius: 1000, position: 'absolute'
        }}/>
      }
      {props.post.images.length > 0 &&
        <View style={{ bottom: 0, width: dimensions.width, height: dimensions.height/12, backgroundColor: PrimaryPollish, borderTopStartRadius: 1000, borderTopEndRadius: 0, position: 'absolute'
        }}/>
      } */}
      {props.post.images.length > 0 &&
        <View style={{ flex: 6, zIndex: 3 }}><PollImage images={props.post.images}/></View>
      }
      {/* {props.post.images.length > 0 &&
        <View style={{ flex: 0.3, backgroundColor: PrimaryPollish, borderTopLeftRadius: 100, borderTopRightRadius: 100, marginTop: '-3%'}}/>
      } */}
      <View style={[{flex: 2.2}]}><PollQuestion question={props.question} backColor={'#FAFAFA'} size={16}/></View>
      <View style={[{flex: 6.5}]}><OptionsContainer post={props.post}/></View>
      <View style={{flex: 1.5}}><MoreOptions post={props.post} setOpen={setOpen}/></View>
      {/* {props.post.images.length == 0 &&
        <View style={{ flex: 1.3, backgroundColor: PrimaryPollish, borderTopStartRadius: 1000, borderTopEndRadius: 0}}/>
      } */}
      {/* End Main Poll View */}

    </View>
  );
};


export default PollView;
