import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image, Button} from 'react-native';
import {BASE_IP} from '@env';

const dimensions = Dimensions.get('screen');

const PollView = props => {
  const url = `http://${BASE_IP}/polls`;

  const handleRegisterVote = async (id, votes) => {
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

  return (
    <View
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}>
      <Image
        source={require('./lebron.jpg')}
        style={{
          width: dimensions.width,
          height: dimensions.width / 1.1,
          alignContent: 'center',
        }}
      />
      <Text
        style={{
          fontFamily: 'System',
          textAlign: 'center',
          fontWeight: 'bold',
          marginVertical: 15,
        }}>
        {props.question}
      </Text>
      <View
        style={{
          marginVertical: 15,
        }}>
        {props.choices.map((choice, index) => {
          return (
            <Button
              key={index}
              title={choice.choice_text}
              onPress={() => handleRegisterVote(choice.id, choice.votes)}
              style={{
                textAlign: 'center',
                padding: 20,
                borderWidth: 3,
                margin: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PollView;
