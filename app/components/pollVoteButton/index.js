import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Inner_Option_Container, Option_Text, Post_Option} from 'style/Poll_Style';
import {BASE_URL} from '@env';
import { OptionColors, FadedOptionColors } from 'style/App_Styles';
import { RegisterVote } from '../../api/post';
import { GetChoice } from '../../api/comments';
import { Circle_Option } from 'style/Poll_Style';
import { SubHeading } from 'style/App_Styles';

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
    const choice = await GetChoice(props.post.id, props.choice.id)
    setVotes(choice.num_votes)
  }

  // Add a vote to given poll in the backend
  const handleRegisterVote = async () => {

    await RegisterVote({cid: props.choice.id, id: props.post.id})
    props.checkVote();
    findVotes();
  };


  return(
      <TouchableOpacity
          style={[Post_Option, { backgroundColor: props.chosen == 2 ? fadedColor : '#FEFEFE', borderRadius: 25, 
          shadowColor: "#000",
          shadowOffset: {
          width: 0,
          height: 1
          },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          elevation: 5} ]}
          onPress={() => handleRegisterVote()}
      >
          <View style={Inner_Option_Container}>
            <View style={{width: '25%', alignItems: 'center', flex: 1}}>
              <View style={[Circle_Option, {backgroundColor: color, borderRadius: dimensions.width/(13*props.count)}]}>
                <Text style={[SubHeading, {color: '#FFF', fontSize: dimensions.width/(8*props.count)}]}>{String.fromCharCode(65+props.idx)}</Text>
              </View>
            </View>
            <Text style={[Option_Text, {shadowColor: '#FFF', width: '50%', color: props.chosen == 2 ? color : props.chosen == 1 ? '#CCC' : color}]} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
            <View style={{width: '25%'}}>
              { props.chosen == 0 ? <View/> :
              <Text>{(votes / props.voteCount)*100}%</Text>
              }
            </View>
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;