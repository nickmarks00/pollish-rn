import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Inner_Option_Container, Option_Text, Post_Option} from 'style/Poll_Style';
import {BASE_URL} from '@env';
import { OptionColors, FadedOptionColors } from 'style/App_Styles';
import { RegisterVote } from '../../api/post';
import LetterBox from './ButtonComponents/LetterBox';

const base = BASE_URL;

const dimensions = Dimensions.get("screen");

const VoteButton = (props) => {
  
  const [votes, setVotes] = useState(0);

  const color = OptionColors[props.idx]
  const fadedColor = FadedOptionColors[props.idx]

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
    const response = await fetch(`http://${base}/pollish/polls/${props.post.id}/choices/${props.choice.id}/`, requestOptions)
    .then(response => response.json())
            .then(response => {
                setVotes(response.num_votes)
            })
  }

  // Add a vote to given poll in the backend
  const handleRegisterVote = async () => {

    await RegisterVote({cid: props.choice.id, id: props.post.id})
    props.checkVote();
    findVotes();
  };


  return(
      <TouchableOpacity
          style={[Post_Option, { backgroundColor: props.chosen == 2 ? fadedColor : '#FFF'} ]}
          onPress={() => handleRegisterVote()}
      >
          <View style={Inner_Option_Container}>
            <View style={{width: dimensions.width/4, alignItems: 'center', flex: 1}}>
                <LetterBox count={props.count} idx={props.idx} color={color}/>
            </View>
            <Text style={[Option_Text, {color: props.chosen == 2 ? color : props.chosen == 1 ? '#CCC' : color}]} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
            <View style={{width: dimensions.width/4}}>
              { props.chosen == 0 ? <View/> :
              <Text>{(votes / props.voteCount)*100}%</Text>
              }
            </View>
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;

