import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {BASE_IP} from '@env';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('screen');

const PollView = (props) => {
  const navigation = useNavigation();
  const url = `http://${BASE_IP}/polls`;

  let [fontsLoaded] = useFonts({
    'SFRound': require('../assets/fonts/SFRoundBold.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Hi</Text>;
  }


  // Add a vote to given poll in the backend
  const handleRegisterVote = async (id, votes) => {
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
    <View
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}>
        <View style={{alignItems: 'center'}}>
      <Image
        source={require('../assets/lebron.jpg')}
        style={styles.post_image}
      />
      </View>
      <View style={{borderBottomWidth: 5, borderColor: '#BAEAF8'}}>
        <Text style={styles.post_question}>
          {props.question}
        </Text>
      </View>
      <View
        style={{
          height: dimensions.width/1.5,
          marginVertical: 5,
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}>
        {props.choices.map((choice, index) => {
          return (
            <TouchableOpacity
              style={styles.post_option}
              key={index}
              onPress={() => handleRegisterVote(choice.id, choice.votes)}
            >
              <View style={styles.option}>
                <View style={{width: dimensions.width/7}}>
                  <View style={styles.circle}><Text style={styles.inner_circle}>{String.fromCharCode(index+65)}</Text></View>
                </View>
                <View style={{width: dimensions.width/10}}/>
                <View>
                <Text style={styles.choice_text}>
                  {choice.choice_text}
                </Text>
                </View>
                <View style={{width: dimensions.width/10}}/>
                <View style={{width: dimensions.width/7}}/>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{
                height: dimensions.height*0.1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <Text>More Stats</Text>
                <Text>Report</Text>
                <Button
      title="Comments"
      onPress={() =>
        navigation.navigate('Comments', { name: 'Jane' })
      }
    />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  post_image: {
    width: dimensions.width,
    height: dimensions.width / 1.1,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    marginTop: 0,
  },

  post_question: {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 0,
    borderBottomWidth: 3,
    borderBottomColor: '#EBD494',
  },

  choice_text: {
    fontFamily: 'SFRound',
    fontSize: 18,
    textAlign: 'center',
    width: dimensions.width/3
  },

  post_option: {
    textAlign: 'center',
    padding: 10,
    borderWidth: 3,
    borderColor: '#CCC',
    margin: 0,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#FFF'
  },

  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#9F00A2',
    borderWidth: 0,
    borderRadius: 100,
    justifyContent: 'center'
  },

  inner_circle: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 20
  }

})


export default PollView;
