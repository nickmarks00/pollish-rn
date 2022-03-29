import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';

const dimensions = Dimensions.get("screen");

const CreateMedia = ({setMedia, media}) => {

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

        setMedia({m1: pickerResult.uri, m2: media.m2, m3: media.m3, m4: media.m4});
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

        setMedia({m1: media.m1, m2: pickerResult.uri, m3: media.m3, m4: media.m4});
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

        setMedia({m1: media.m1, m2: media.m2, m3: pickerResult.uri, m4: media.m4});
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
        setMedia({m1: media.m1, m2: media.m2, m3: media.m3, m4: pickerResult.uri});
    };

    return (
        <View style={{justifyContent: 'space-evenly', flex: 1, alignItems: 'center'}}>
                <Text style={{color: '#125AC5', fontWeight: 'bold', fontSize: 16}}>ADD VISUALS TO YOUR POST!</Text>
                <View style={{justifyContent: 'space-evenly', flexDirection: 'row', width: '100%'}}>
                <TouchableOpacity style={[styles.photoContainer,{borderRadius: '10%'}]} onPress={openImagePickerAsync}>
                    {media.m1 ? <Image source={{ uri: media.m1 }} style={{width: '100%', height: '100%', borderRadius: 10}} /> :
                        <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                            <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                        </View>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={[styles.photoContainer,{borderRadius: '10%'}]} onPress={openImagePickerAsync2}>
                    {media.m2 ? <Image source={{ uri: media.m2 }} style={{width: '100%', height: '100%', borderRadius: 10}} /> :
                        <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                            <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                        </View>
                    }
                </TouchableOpacity>
                    
                </View>
                <View style={{justifyContent: 'space-evenly', flexDirection: 'row', width: '100%'}}>
                    <TouchableOpacity style={[styles.photoContainer,{borderRadius: '10%'}]} onPress={openImagePickerAsync3}>
                        {media.m3 ? <Image source={{ uri: media.m3 }} style={{width: '100%', height: '100%', borderRadius: 10}} /> :
                            <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                                <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.photoContainer,{borderRadius: '10%'}]} onPress={openImagePickerAsync4}>
                        {media.m4 ? <Image source={{ uri: media.m4 }} style={{width: '100%', height: '100%', borderRadius: 10}} /> :
                            <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                                <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                </View>
    )
}

export default CreateMedia;

const styles = StyleSheet.create({
    mainPage: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'space-between'
    },
    photoContainer: {
        width: '30%', 
        aspectRatio: 1, 
        backgroundColor: '#EEE',  
        alignItems: 'center', 
        justifyContent: 'center'
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