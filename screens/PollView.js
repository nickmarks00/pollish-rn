import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, Button, Animated, ScrollView} from 'react-native';
import {BASE_IP} from '@env';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get('screen');

const PollView = (props) => {
  const navigation = useNavigation();
  const url = `http://${BASE_IP}/polls`;

  const [index, setIndex] =useState(0);
  const [progress, setProgress] = useState(new Animated.Value(0));

  let [fontsLoaded] = useFonts({
    'SFRound': require('../assets/fonts/SFRoundBold.ttf'),
    'SFReg': require('../assets/fonts/SFRound.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Hi</Text>;
  }

      const handlePress=()=>{
        Animated.timing(progress, {
            toValue:index+1,
            duration:400,
            useNativeDriver:false
        }).start()
    }

    const progressAnim=progress.interpolate({
        inputRange:[0, 4],
        outputRange:["20%", "100%"],
    });

    const barWidth={
        width:progressAnim
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
  
  const VoteButton = (props) => {
    return(
    <TouchableOpacity
              style={props.choice.length > 3 ? styles.post_option : styles.post_option}
              onPress={() => handleRegisterVote(props.choice.id, props.choice.votes)}
            >
              <Animated.View style={[{
                position: 'absolute', 
                backgroundColor: '#90C7FC', 
                height: '100%', 
                padding: 30, 
                borderRadius: 17}, barWidth]}>
              </Animated.View>
              <View style={styles.option}>
                <View style={{width: dimensions.width/7}}>
                  <View style={styles.circle}><Text style={styles.inner_circle}>{String.fromCharCode(index+65)}</Text></View>
                </View>
                <View style={{width: dimensions.width/10}}/>
                <View>
                <Text style={styles.choice_text} adjustsFontSizeToFit={true} numberOfLines={2}>
                  {props.choice.choice_text}
                </Text>
                </View>
                <View style={{width: dimensions.width/10}}/>
                <View style={{width: dimensions.width/7}}/>
              </View>
            </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}>
        <View style={{alignItems: 'center'}}>
          <ScrollView 
          horizontal={true}
          decelerationRate={0}
          snapToAlignment="lefts"
          snapToInterval={dimensions.width}
          showsVerticalScrollIndicator={false}>
            <View  style={{flexDirection: 'row'}}>
            {props.images.map((choice, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('FullScreen')
                  }
                >
                <Image
                  source={{uri: "https://" + choice.image_src.slice(34)}}
                  style={styles.post_image}
                />
                </TouchableOpacity>
              )
            })}
            </View>
          </ScrollView>
      </View>
      <View style={styles.question_box}>
        <Text style={styles.post_question} adjustsFontSizeToFit={true} numberOfLines={2}>
          {props.question}
        </Text>
      </View>
      <View
        style={{
          height: dimensions.width/1.5,
          marginVertical: 5,
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}>
        {props.choices.map((choice, index) => {
          return (
            <VoteButton key={index} choice={choice}/>
          );
        })}
      </View>
      <View style={{
                height: dimensions.height*0.1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <Text>More Stats</Text>
                <Text>Report</Text>
                <Button
      title="Comments"
      onPress={() =>
        navigation.navigate('Comments', { question: props.question, options_: props.choices })
      }
    />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

  bar:{
    backgroundColor:"#fc5c56",
    height:100,
    borderRadius:50,
    position:"absolute",
    top:100,
    //left:-50,
},

  question_box: {
    borderBottomWidth: 5, 
    borderColor: '#BAEAF8',
    padding:10,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  post_image: {
    width: dimensions.width,
    height: dimensions.width / 1.1,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    marginTop: 0,
  },

  post_question: {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 0,
    borderBottomWidth: 3,
    borderBottomColor: '#EBD494',
  },

  choice_text: {
    fontFamily: 'SFRound',
    textAlign: 'center',
    fontSize: 15,
    width: dimensions.width/3
  },

  post_option: {
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    margin: 0,
    marginHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#FFF',
    padding:10,
    elevation:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    height: dimensions.height/14
  },

  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#338397',
    borderWidth: 0,
    borderRadius: 100,
    justifyContent: 'center'
  },

  inner_circle: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 20
  }

})


export default PollView;
