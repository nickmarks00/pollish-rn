import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Inner_Option_Container, Option_Text} from 'style/Poll_Style';
import { RegisterVote } from '../../api/post';
import Styles from './styles';
import { getChoice } from 'endpoints/pollish';

const VoteButton = (props) => {
  
  // const [votes, setVotes] = useState(props.choice.votes);
  // const [chosen, setChosen] = useState(0);

  useEffect(() => {
    // if(chosen != props.chosen) setChosen(props.chosen);
    // findVotes();
    // if(props.unvoted == props.choice.id){
    //   props.setUnvoted(-1)
    //   setVotes(votes - 1)
    // }
  }, []);

  // const findVotes = async () => {
  //   const choice = await getChoice(props.post.id, props.choice.id)
  //   if(choice.data.num_votes != votes)
  //     setVotes(choice.data.num_votes)
  // }

  // Add a vote to given poll in the backend
  const handleRegisterVote = async () => {
    props.offlineVoteUpdate(props.choice.id);
    // setVotes(votes+1);
    // await RegisterVote({cid: props.choice.id, id: props.post.id})
    // props.checkVote();
    // findVotes();
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
                <Text>{((props.choice.num_votes + (props.chosen == 2 ? 1 : 0)) / props.voteCount)*100}%</Text>
              }
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;