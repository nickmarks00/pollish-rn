import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {Circle_Option, Option_Letter} from 'style/Poll_Style';

const dimensions = Dimensions.get("screen");



const VoteButton = (props) => {

  const [index, setIndex] =useState(0);


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


  return(
      <TouchableOpacity
          style={styles.post_option}
          onPress={() => handleRegisterVote(props.choice.id, props.choice.votes)}
      >
          <View style={styles.option}>
            <View style={{flex: 1 }}>
                <View style={Circle_Option}><Text style={Option_Letter}>{String.fromCharCode(index+65)}</Text></View>
            </View>
            <View style={{width: dimensions.width/10}}/>
            <Text style={styles.choice_text} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
            <View style={{width: dimensions.width/4}}/>
          </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },

  choice_text: {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 15,
    width: dimensions.width/3
  },

  post_option: {
    borderWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: dimensions.width/14,
    borderRadius: dimensions.width/20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',

    elevation:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    flex: 1,
    marginVertical: 4,
  },

})

export default VoteButton;

