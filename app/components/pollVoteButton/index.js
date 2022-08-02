import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Inner_Option_Container, Option_Text} from 'style/Poll_Style';
import Styles from './styles';

const VoteButton = (props) => {

  // Add a vote to given poll in the backend
  const handleRegisterVote = async () => {
    props.offlineVoteUpdate(props.choice.id);
  };

  return (
    <View>
      <TouchableOpacity
          style={[Styles.Post_Option, {borderWidth: props.chosen == 2 ? 2 : 0}]}
          onPress={() => handleRegisterVote()}
      >
          <View style={[Inner_Option_Container, {padding: '1%'} ]}>
            <Text style={[Option_Text, {textAlign: 'center', fontWeight: props.chosen == 2 ? 'bold' : 'normal', shadowColor: '#FFF', width: '50%', color: props.chosen == 2 ? '#907AD6' : props.chosen == 1 ? '#CCC' : 'black'}]} adjustsFontSizeToFit numberOfLines={2}>
                {props.choice.choice_text}
            </Text>
            { props.chosen != 0 &&
                <View style={{width: '10%'}}/>
            }
            { props.chosen != 0 &&
                <Text>{Math.round(((props.choice.num_votes + ((props.chosen == 2) ? props.userVote != props.choice.id ? 1 : 0 : props.userVote  == props.choice.id ? -1 : 0)) / props.voteCount)*100)}%</Text>
            }
          </View>
      </TouchableOpacity>
    </View>
  );
}

export default VoteButton;