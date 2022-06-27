import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Inner_Option_Container, Option_Text} from 'style/Poll_Style';
import { RegisterVote } from '../../api/post';
import Styles from './styles';
import { getChoice } from 'endpoints/pollish';

const VoteButton = (props) => {
  
  const [votes, setVotes] = useState(0);

  useEffect(() => {
      findVotes();
  }, []);

  const findVotes = async () => {
    const choice = await getChoice(props.post.id, props.choice.id)
    setVotes(choice.data.num_votes)
  }

  // Add a vote to given poll in the backend
  const handleRegisterVote = async () => {

    await RegisterVote({cid: props.choice.id, id: props.post.id})
    props.checkVote();
    findVotes();
  };


  return (
      <TouchableOpacity
          style={[Styles.Post_Option, {borderWidth: props.chosen == 2 ? 2 : 0}]}
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