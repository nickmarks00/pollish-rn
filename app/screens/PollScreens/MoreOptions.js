import React from 'react';
import { More_Options } from 'style/Poll_Style';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import arrow from './arrow.png';

const dimensions = Dimensions.get('window');

const MoreOptions = (props) => {

      // Function for adding new comment
  const Post_Comment = () => {

    fetch("http://192.168.1.140:8000/pollish/polls/", {
            method: "POST",
            headers: { Accept: "application/json", 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question_text: "hi",
            })
            }).then(() => {
                console.log(JSON.stringify({question_text: "hi"}))
            })
}

    const navigation = useNavigation();
    return(
    <View style={More_Options}>
                <TouchableOpacity onPress={Post_Comment} style={{position: 'absolute', flexDirection: 'row', left: dimensions.width*0.08}}>
                  <Image source={arrow} style={{
                    transform: [{rotate: '180deg'}],
                    width: dimensions.width/30,
                    height: null,
                    resizeMode: 'contain'
                  }}/>
                  <Text style={{paddingLeft: '2%', fontWeight: 'bold', color: '#1F71EB', fontSize: 12}}>MORE INFO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Comments', { post: props.post})
                  } style={{position: 'absolute', flexDirection: 'row', right: dimensions.width*0.08}}>
                  <Text style={{paddingRight: '2%', fontWeight: 'bold', color: '#1F71EB', fontSize: 12}}>COMMENTS</Text>
                  <Image source={arrow} style={{ 
                    width: dimensions.width/30,
                    height: null,
                    resizeMode: 'contain',
                  }}/>
                </TouchableOpacity>    
    </View>
    );
}

export default MoreOptions;