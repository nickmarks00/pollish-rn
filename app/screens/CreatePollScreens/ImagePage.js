import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';

const dimensions = Dimensions.get("screen");

const ImagePage = () => {
    const navigation = useNavigation();

    const [selectedImage, setSelectedImage] = React.useState('');
    const [selectedImage2, setSelectedImage2] = React.useState('');
    const [selectedImage3, setSelectedImage3] = React.useState('');
    const [selectedImage4, setSelectedImage4] = React.useState('');

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

        setSelectedImage(pickerResult.uri);
    };

    let openImagePickerAsync2 = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
          return;
        }
    
        if (selectedImage2.includes(pickerResult.uri)){
          
        }

        setSelectedImage2(pickerResult.uri);
    };

    let openImagePickerAsync3 = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
          return;
        }
    
        if (selectedImage3.includes(pickerResult.uri)){
          
        }

        setSelectedImage3(pickerResult.uri);
    };

    let openImagePickerAsync4 = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
          return;
        }
    
        if (selectedImage4.includes(pickerResult.uri)){
          
        }

        setSelectedImage4(pickerResult.uri);
    };

      const PostPhotoContainer = (props) => {

    

        if (props.item === 0){
          props.item = ""
        }
    
        return (
    
            <View style={styles.container}>
                
    
                <TouchableOpacity onPress={
                    props.number === 1 ? openImagePickerAsync : props.number === 2 ? openImagePickerAsync2: props.number === 3 ? openImagePickerAsync3 : openImagePickerAsync4
                }>
                <Image source={{ uri: props.item }} style={styles.logo} />
                <View style={{
                    position: 'absolute', 
                    left: dimensions.width/2.9, 
                    top: dimensions.width/2.9, 
                    width: dimensions.width/8.8, 
                    height: dimensions.width/8.8,
                    borderRadius: 30,
                    backgroundColor: '#83EFB1',
                    justifyContent: 'center'
                }}>
                    <Text style={{textAlign: 'center', fontFamily: 'System', color: '#FFF', fontSize: 25}}>{props.item !== "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png" ? "x" : "+"}</Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    
      }

    return (
        <View style={styles.mainPage}>
            <View/>
            <View/>
            <Text style={{fontFamily: 'SFRound', fontSize: 24, marginHorizontal: 10}}>Add Images and or Videos to your Post</Text>
            <View> 
            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <PostPhotoContainer style={styles.photos} number={1} item={selectedImage !== '' ? selectedImage :'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'}/>
            <PostPhotoContainer style={styles.photos} number={2} item={selectedImage2 !== '' ? selectedImage2 :'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'}/>
            </View>
            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <PostPhotoContainer style={styles.photos} number={3} item={selectedImage3 !== '' ? selectedImage3 :'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'}/>
            <PostPhotoContainer style={styles.photos} number={4} item={selectedImage4 !== '' ? selectedImage4 :'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'}/>
            </View>
            </View>   
            <View/>
            <TouchableOpacity
                onPress={() => navigation.navigate('3')}
                style={{borderRadius: 15, backgroundColor: '#83EFB1', paddingHorizontal: 40, paddingVertical: 20}}
            >
                <Text style={{fontSize: 20, fontFamily: 'SFRound', color: '#FFF'}}>Next</Text>
            </TouchableOpacity>
            <View/>
        </View>
    );
}

export default ImagePage;

const styles = StyleSheet.create({
    mainPage: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'space-between'
    },
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
        width: dimensions.width/2
      },
      logo: {
        width: dimensions.width/2.3,
        height: dimensions.width/2.3,
        padding: 0,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 30,
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
      },
      photos: {
          width: dimensions.width/2,
          height: dimensions.width/4
      }
})