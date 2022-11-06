import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

type ProfilePicProps = {
  avatar: string;
  profileHeight: number | null;
  username: string;
};

const ProfilePic = ({avatar, profileHeight, username}: ProfilePicProps) => {
  const [noProfilePic, setError] = React.useState(true);

  if (noProfilePic && avatar != '')
    return (
      <View style={{height: profileHeight ? profileHeight : height * 0.167}}>
        <Image
          source={{
            uri: avatar,
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
          {username.slice(0, 1).toUpperCase()}
        </Text>
      </View>
    );
};
export default ProfilePic;
