import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import {Circle_Option, Option_Letter, Inner_Option_Container, Option_Text, Post_Option} from 'style/Poll_Style';

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
          style={[Post_Option, { borderRadius: dimensions.width/(8*props.count)} ]}
          onPress={() => handleRegisterVote(props.choice.id, props.choice.votes)}
      >
          <View style={Inner_Option_Container}>
            <View style={{flex: 1 }}>
                <View style={[Circle_Option, {backgroundColor: props.colorO, borderRadius: dimensions.width/(13*props.count)}]}>
                  <Text style={[Option_Letter, {color: props.color, fontSize: dimensions.width/(8*props.count)}]}>{String.fromCharCode(index+65+props.idx)}</Text>
                </View>
            </View>
            <View style={{width: dimensions.width/10}}/>
            <Text style={Option_Text} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
            <View style={{width: dimensions.width/4}}/>
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;

