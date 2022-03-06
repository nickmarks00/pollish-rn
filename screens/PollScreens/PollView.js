import React, {useState} from 'react';
import {View, Text, Dimensions, Button, Modal} from 'react-native';
import {BASE_IP} from '@env';
import { useFonts } from 'expo-font';
import {PollImage, PollQuestion, MoreOptions, OptionsContainer} from '.'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const dimensions = Dimensions.get('window');

const PollView = (props) => {
  const url = `http://${BASE_IP}/polls`;

  const [open, setOpen] = useState(false)
  const tabBarHeight = useBottomTabBarHeight();

  let [fontsLoaded] = useFonts({
    'SFRound': require('../../assets/fonts/SFRoundBold.ttf'),
    'SFReg': require('../../assets/fonts/SFRound.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Hi</Text>;
  }


  // Add a vote to given poll in the backend
  const handleRegisterVote = async (id, votes) => {
    handlePress();
    const requestOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        votes: votes,
        choice_text: 'test',
      }),
    };

    fetch(`${url}/test`, requestOptions).then(res => {
      if (res.ok) {
        console.log('vote registered success');
      } else {
        console.error('vote register fail');
      }
    });
  };

  return (
    <View style={{ width: dimensions.width, height: dimensions.height - tabBarHeight}}>

      {/* Modal Popup */}
      <Modal visible={open} animationType={"slide"}>
        <View style={{width: dimensions.width, height: dimensions.height}}>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>{props.votes}</Text>
          <Button title="Close" onPress={()=>setOpen(false)}/>
        </View>
      </Modal>
      {/* End Modal Popup */}

      {/* Main Poll View */}
      <View style={{flex: 5}}><PollImage images={props.images}/></View>
      <View style={{flex: 1}}><PollQuestion question={props.question}/></View>
      <View style={{ height: 5, backgroundColor: '#BAEAF8' }}/>
      <View style={{flex: 6}}><OptionsContainer choices={props.choices}/></View>
      <View style={{flex: 1}}><MoreOptions post={props.post}/></View>
      {/* End Main Poll View */}

    </View>
  );
};


export default PollView;
