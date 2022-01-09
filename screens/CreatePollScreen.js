import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image, Button, TextInput, StyleSheet} from 'react-native';

const BASE_URL = 'http://192.168.1.140:8000';

const CreatePollScreen = (props) => {
    const [text, onChangeText] = React.useState("");
    const [text2, onChangeText2] = React.useState("");
    const [text3, onChangeText3] = React.useState("");

    const postPollToAPI = async () => {
        const url = `${BASE_URL}/polls/`;
    
        setLoading(true);
    
        const res = fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

          })
        })
          .then(res => res.json())
          .then(data => {
            setPosts(data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
      };

    return (
        <View>
            <Text
                style={{
                    fontFamily: 'System',
                    fontWeight: 'bold',
                    marginVertical: 15
                }}>Question</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="What do you want to know?"
            />
            <Text
                style={{
                    fontFamily: 'System',
                    fontWeight: 'bold',
                    marginVertical: 15
                }}>Option 1</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText2}
            value={text2}
            placeholder="Enter an option"
            />
            <Text
                style={{
                    fontFamily: 'System',
                    fontWeight: 'bold',
                    marginVertical: 15
                }}>Option 2</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText3}
            value={text3}
            placeholder="Enter an option"
            />
            <Button
            onPress={onChangeText}
            title="Post"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  

export default CreatePollScreen;