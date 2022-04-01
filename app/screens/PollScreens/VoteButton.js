import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import {Circle_Option, Option_Letter, Inner_Option_Container, Option_Text, Post_Option} from 'style/Poll_Style';
import {BASE_URL} from '@env';
import authStorage from './../../auth/storage'

const base = BASE_URL;

const dimensions = Dimensions.get("screen");



const VoteButton = (props) => {

  const [index, setIndex] =useState(0);
  const [border, setBorder] = useState('#DDD');

  useEffect(() => {
    checkVote();
  }, []);

  const checkVote = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(`http://${base}/pollish/polls/${props.pollID}/choices/${props.choice.id}/`, options)
    .then(response => response.json())
        .then(response => {
            // console.log(response);
        })
  }


  // Add a vote to given poll in the backend
  const handleRegisterVote = async (id, votes) => {

    const res = await authStorage.getTokens();
    const access = JSON.parse(res).access;

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
      body: JSON.stringify({
        id: id,
        votes: votes,
        choice_text: 'test',
      }),
    };

    setBorder(props.color)

    const response = await fetch(`http://${base}/pollish/polls/${props.pollID}/choices/${id}/me/`, requestOptions);
  };


  return(
      <TouchableOpacity
          style={[Post_Option, { borderColor: (props.hasVoted.voted && props.choice.id == props.hasVoted.choice ? props.color : '#DDD'), borderRadius: dimensions.width/(8*props.count)} ]}
          onPress={() => handleRegisterVote(props.choice.id, props.choice.votes, props.pollID)}
      >
          <View style={Inner_Option_Container}>
            <View style={{flex: 1 }}>
                <View style={[Circle_Option, {backgroundColor: props.colorO, borderRadius: dimensions.width/(13*props.count)}]}>
                  <Text style={[Option_Letter, {color: props.color, fontSize: dimensions.width/(8*props.count)}]}>{String.fromCharCode(index+65+props.idx)}</Text>
                </View>
            </View>
            <View style={{width: dimensions.width/10}}/>
            <Text style={[Option_Text, {color: '#CCC'}]} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
            <View style={{width: dimensions.width/4}}/>
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;

