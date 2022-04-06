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
  const [votes, setVotes] = useState(0);

  useEffect(() => {
      findVotes();
  }, []);

  const findVotes = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('pid: ' + props.pollID + ' cid: ' + props.choice.id)
    const response = await fetch(`http://${base}/pollish/polls/${props.pollID}/choices/${props.choice.id}/`, requestOptions)
    .then(response => response.json())
            .then(response => {
                setVotes(response.num_votes)
            })

    // console.log(response);
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
    props.checkVote();
    props.getVoteCount();
    findVotes();
  };


  return(
      <TouchableOpacity
          style={[Post_Option, { backgroundColor: props.chosen == 2 ? props.colorO : '#FFF', borderColor: '#EEE', borderWidth: 0.4} ]}
          onPress={() => handleRegisterVote(props.choice.id, props.choice.votes, props.pollID)}
      >
          <View style={Inner_Option_Container}>
            <View style={{flex: 1, width: dimensions.width/4, alignItems: 'center' }}>
                <View style={[Circle_Option, {backgroundColor: props.color, borderRadius: dimensions.width/(13*props.count)}]}>
                  <Text style={[Option_Letter, {color: '#FFF', fontSize: dimensions.width/(8*props.count)}]}>{String.fromCharCode(index+65+props.idx)}</Text>
                </View>
            </View>
            <Text style={[Option_Text, {color: props.chosen == 2 ? props.color : props.chosen == 1 ? '#CCC' : props.color}]} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
            <View style={{width: dimensions.width/4}}>
              { props.chosen == 0 ?
                <View/>
              :
              <Text>{(votes / props.voteCount)*100}%</Text>
              }
            </View>
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;

