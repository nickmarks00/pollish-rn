import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

type ProfilePicProps = {
  user: any;
  profileHeight: number | null;
};

// ! Need user type

const ProfilePic = ({user, profileHeight}: ProfilePicProps) => {
  const [noProfilePic, setError] = React.useState(true);

  if (noProfilePic)
    return (
      <View style={{height: profileHeight ? profileHeight : height * 0.167}}>
        <Image
          source={{
            uri: user.profile.avatar,
          }}
          style={{
            height: '100%',
            aspectRatio: 1,
            borderRadius: 5000,
            resizeMode: 'cover',
            borderColor: profileHeight ? 'rgba(255,255,255,0)' : '#CCCCCC',
            borderWidth: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onError={() => setError(false)}
        />
      </View>
    );
  else
    return (
      <View
        style={{
          height: profileHeight ? profileHeight : height * 0.167,
          aspectRatio: 1,
          borderRadius: 5000,
          borderColor: '#CCCCCC',
          borderWidth: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#00AAA9',
            fontWeight: 'bold',
            fontSize: height / 10,
          }}>
          {user.username.slice(0, 1).toUpperCase()}
        </Text>
      </View>
    );
};
export default ProfilePic;
