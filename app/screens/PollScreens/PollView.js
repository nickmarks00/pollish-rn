import React, {useState} from 'react';
import {View, Text, Dimensions, Button, Modal} from 'react-native';
import { useFonts } from 'expo-font';
import {PollImage, PollQuestion, MoreOptions, OptionsContainer} from '.'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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
      <View style={{flex: 8}}><PollImage images={props.post.images}/></View>
      <View style={{width: dimensions.width, marginTop: -6, flex: 0.3, backgroundColor: '#00A6A6', borderTopLeftRadius:500, borderTopRightRadius: 50}}/>
      <View style={{flex: 2.5, zIndex: -1, marginTop: -10, borderBottomWidth: 1, borderBottomColor: '#CCC'}}><PollQuestion backColor={'#FAFAFA'} question={props.question} size={16}/></View>
      <View style={{flex: 6}}><OptionsContainer choices={props.choices} votes={props.post.votes} pollID={props.post.id}/></View>
      <View style={{flex: 2, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#CCC'}}><MoreOptions post={props.post}/></View>
      {/* End Main Poll View */}

    </View>
  );
};


export default PollView;
