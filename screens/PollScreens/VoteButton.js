import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

const dimensions = Dimensions.get("screen");



const VoteButton = (props) => {

  const [index, setIndex] =useState(0);

  const barWidth={
    width:progressAnim
}

const handlePress=()=>{
  Animated.timing(progress, {
      toValue:index+1,
      duration:400,
      useNativeDriver:false
  }).start()
}

// Add a vote to given poll in the backend
const handleRegisterVote = async (id, votes) => {
  
  handlePress();
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

const [progress, setProgress] = useState(new Animated.Value(0));

const progressAnim=progress.interpolate({
  inputRange:[0, 4],
  outputRange:["20%", "100%"],
});


    return(
        <TouchableOpacity
            style={props.choice.length > 3 ? styles.post_option : styles.post_option}
            onPress={() => handleRegisterVote(props.choice.id, props.choice.votes)}
        >
            {/* <Animated.View style={[{
            position: 'absolute', 
            backgroundColor: '#90C7FC', 
            height: '100%', 
            padding: dimensions.width/16, 
            borderRadius: 17}, barWidth]}>
            </Animated.View> */}
            <View style={styles.option}>
              <View style={{flex: 1 }}>
                  <View style={styles.circle}><Text style={styles.inner_circle}>{String.fromCharCode(index+65)}</Text></View>
              </View>
              <View style={{width: dimensions.width/10}}/>
              <View>
              <Text style={styles.choice_text} adjustsFontSizeToFit numberOfLines={2}>
                  {props.choice.choice_text}
              </Text>
              </View>
              <View style={{width: dimensions.width/10}}/>
              <View style={{width: dimensions.width/7}}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

  bar:{
    backgroundColor:"#fc5c56",
    height:100,
    borderRadius:50,
    position:"absolute",
    top:100,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },

  choice_text: {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 15,
    width: dimensions.width/3
  },

  post_option: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: dimensions.width/14,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',

    elevation:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    flex: 1,
    marginVertical: 4,
  },

  circle: {
    backgroundColor: '#338397',
    borderRadius: 20,
    justifyContent: 'center',
    flex: 1
  },

  inner_circle: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 20
  }

})

export default VoteButton;

