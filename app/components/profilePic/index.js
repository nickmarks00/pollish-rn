import React from 'react';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';

const {height, width} = Dimensions.get('window');

const ProfilePic = ({user, profileHeight}) => {

    const [noProfilePic, setError] = React.useState(true);

    if (noProfilePic)
        return (
        <View style={{height: profileHeight ? profileHeight : height*0.167}}>
          <Image
            source={{
              uri: user.profile.avatar
            }}
            style={[Styles.profilePic,  profileHeight ? {borderColor: 'rgba(255,255,255,0)'} : {}]}
            onError={() => setError(false)}
          />
        </View>
        )
    else 
        return (
            <View style={[Styles.profilePic, {height: profileHeight ? profileHeight : height*0.167}]}>
            <Text style={Styles.noProfileInitial}>
                {user.username.slice(0,1).toUpperCase()}
            </Text>
            </View>
        )
      
}
export default ProfilePic;

const Styles = StyleSheet.create({
    profilePic: {
      height: '100%',
      aspectRatio: 1,
      borderRadius: 5000,
      resizeMode: 'cover',
      borderColor: '#CCCCCC',
      borderWidth: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    noProfileInitial: {
      textAlign: 'center',
      color: '#00AAA9',
      fontWeight: 'bold',
      fontSize: height/10
  }
  });