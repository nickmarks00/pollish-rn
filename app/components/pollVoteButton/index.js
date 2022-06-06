import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Inner_Option_Container, Option_Text, Post_Option} from 'style/Poll_Style';
import {BASE_URL} from '@env';
import { OptionColors, FadedOptionColors } from 'style/App_Styles';
import { RegisterVote } from '../../api/post';
import { GetChoice } from '../../api/comments';

const base = BASE_URL;

const dimensions = Dimensions.get("screen");

const VoteButton = (props) => {
  
  const [votes, setVotes] = useState(0);

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


  return (
      <TouchableOpacity
          style={[Post_Option, { backgroundColor: '#FEFEFE', borderRadius: 10,
          borderColor: '#907AD6',
          borderWidth: props.chosen == 2 ? 2 : 0, 
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
          <View style={[Inner_Option_Container, {padding: '1%'} ]}>
            <Text style={[Option_Text, {fontWeight: props.chosen == 2 ? 'bold' : 'normal', shadowColor: '#FFF', width: '50%', color: props.chosen == 2 ? '#907AD6' : props.chosen == 1 ? '#CCC' : 'black'}]} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
              { props.chosen != 0 &&
                <Text>{(votes / props.voteCount)*100}%</Text>
              }
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;