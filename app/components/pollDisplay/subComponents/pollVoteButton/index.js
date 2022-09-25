import { transform } from 'lodash';
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import {Option_Text} from 'style/Poll_Style';
import Styles from './styles';
const dimensions = Dimensions.get('window');

const VoteButton = (props) => {

  // Add a vote to given poll in the backend
  const handleRegisterVote = async () => {
    props.offlineVoteUpdate(props.choice.id);
  };

  const Progress = ({step, steps, color}) => {

    const [width, setWidth] = React.useState(dimensions.width*0.9);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;

    console.log(step)

    React.useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: reactive,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad)
      }).start();
    }, [])

    React.useEffect(() => {
      reactive.setValue(-width + (width * step) / steps);
    }, [step])

    return (
        <Animated.View style={{ width: dimensions.width*0.9, height: '100%', backgroundColor: color,
      transform: [
        {
          translateX: animatedValue
        }
      ]
    }}>
        
      </Animated.View>
    )
  }

  const votepercent = Math.round(((props.choice.num_votes + ((props.chosen == 2) ? props.userVote != props.choice.id ? 1 : 0 : props.userVote  == props.choice.id ? -1 : 0)) / props.voteCount)*100)

  return (
      <TouchableOpacity
          style={[Styles.Post_Option, {overflow: 'hidden', paddingHorizontal: 15, borderWidth: 1, borderColor: props.chosen == 2 ? '#00AAA9' : '#BBBBBB', height: props.height, marginBottom: props.margin, width: dimensions.width*0.9, alignItems: 'left' }]}
          onPress={() => handleRegisterVote()}
      >
          { props.chosen != 0 &&
          <View style={{position: 'absolute', height: '100%', borderRadius: 10, overflow: 'hidden'}}>
          <Progress color={props.chosen == 2 ? '#CCEEEE' : '#F3F3F3' } step={votepercent} steps={100} height={'100%'}/>
          </View>
          }
          <View>
            <Text style={[Option_Text, {fontWeight: '500', width: props.chosen == 0 ? dimensions.width*0.9-30 : dimensions.width*0.72-30 , textAlign: 'left', color: props.chosen == 2 ? '#00AAA9' : '#6F6F6F'}]} numberOfLines={1}>
                {props.choice.choice_text}
            </Text>
            { props.chosen != 0 &&
                <View style={{position: 'absolute', flexDirection: 'row'}}>
                <View style={{flex: 1}}/>
                <Text style={{fontWeight: '500', color: props.chosen == 2 ? '#00AAA9' : '#6F6F6F'}}>{Math.round(((props.choice.num_votes + ((props.chosen == 2) ? props.userVote != props.choice.id ? 1 : 0 : props.userVote  == props.choice.id ? -1 : 0)) / props.voteCount)*100)}%</Text>
                </View>
            }
          </View>
      </TouchableOpacity>
  );
}

export default VoteButton;