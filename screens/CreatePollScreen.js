import React from 'react';
import {View, Text, Dimensions, Image, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid'

const BASE_URL = 'http://192.168.1.140:8000';

const dimensions = Dimensions.get("screen");

const CreatePollScreen = () => {

  const [selectedImage, setSelectedImage] = React.useState([]);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.cancelled === true) {
      return;
    }

    if (selectedImage.includes(pickerResult.uri)){
      
    }

    const newList = selectedImage.concat({localUri: pickerResult.uri})
    setSelectedImage(newList);
  };


    const [text, onChangeText] = React.useState("");
    const [text2, onChangeText2] = React.useState("");
    const [text3, onChangeText3] = React.useState("");

    const [options, addOptions] = React.useState([]);

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

      const PostPhotoContainer = (props) => {

        if (props.item === 0){
          props.item = ""
        }

        return (
    
            <View style={styles.container}>
                
    
                <TouchableOpacity onPress={openImagePickerAsync}>
                <Image source={{ uri: props.item }} style={styles.logo} />
                </TouchableOpacity>
            </View>
        );
    
      }

      const addOption = async () => {
        const newlist = options.concat({'item': "hi", 'idx': uuid.v4()})
        addOptions(newlist);
      }

      const removeOption = async () => {
        const reducedArr = [...options];
        reducedArr.splice(options.length-2, 1);
        addOptions(reducedArr);
      }

    return (
        <View>
          <Text
                style={{
                    fontFamily: 'SFRound',
                    fontSize: 24,
                    marginVertical: 5,
                    marginHorizontal: 15
                }}>Create a Poll, Find out what others think!</Text>
          <ScrollView
          decelerationRate={0}
          snapToAlignment="center"
          snapToInterval={dimensions.width}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          >
          <PostPhotoContainer item={selectedImage.length > 0 ? selectedImage[0].localUri :'https://i.imgur.com/TkIrScD.png'}/>
          <PostPhotoContainer item={selectedImage.length > 1 ? selectedImage[1].localUri : 'https://i.imgur.com/TkIrScD.png'}/>
          </ScrollView>
          <ScrollView style={{height: dimensions.height/2.8}}>
            <Text
                style={{
                    fontFamily: 'SFRound',
                    fontSize: 20,
                    marginVertical: 15
                }}>   What do you want to know?</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="What is the best ....."
            />
            <Text
                style={{
                    fontFamily: 'System',
                    fontWeight: 'bold',
                    marginVertical: 15
                }}>   Option 1</Text>
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
                }}>   Option 2</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText3}
            value={text3}
            placeholder="Enter an option"
            />
            {options.map((op, index) => {
              return (
                <View>
                <Text
                style={{
                    fontFamily: 'System',
                    fontWeight: 'bold',
                    marginVertical: 15
                }}>   Option 2</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText3}
            value={text3}
            placeholder="Enter an option"
            />
            </View>
              );
            })}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginBottom: 15
            }}>
            <Button
              onPress={addOption}
              title="Add option"
            />
            <Button
              color='red'
              onPress={removeOption}
              title="Remove option"
            />
            </View>
            <Button
            onPress={onChangeText}
            title="Post"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#EEE'
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: dimensions.height*0.03,
      width: dimensions.width
    },
    logo: {
      width: dimensions.width*0.9,
      height: dimensions.height*0.27,
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginBottom: 20,
    },
    instructions: {
      color: '#888',
      fontSize: 18,
      textAlign: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
    button: {
      backgroundColor: 'blue',
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    }
  });
  

export default CreatePollScreen;