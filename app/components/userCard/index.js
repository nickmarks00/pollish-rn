import React from 'react';
import { View, TouchableOpacity, Text, Dimensions, Image, StyleSheet } from 'react-native';
import ColoredButton from '../coloredButton';
import { getFollowers } from 'endpoints/core';
import { checkFollowing } from '../../network/lib/core';
import { followUser } from '../../network/lib/core';

const dimensions = Dimensions.get('window')

const UserCard = ({oUser, navToProfile}) => {

    const [numFollower, setNumFollowers] = React.useState(0);
    const [isFollowing, setIsFollowing] = React.useState(false);
    const {user, logOut} = useAuth();
    const [noProfilePic, setError] = React.useState(false);


    React.useEffect(() => {
        loadFollowerCount();
        checkFollow();
        return () => {
            setNumFollowers(0);
            setIsFollowing(false);
        };
    }, []);
    
    const loadFollowerCount = async () => {
        const data = await getFollowers(oUser.id);
        setNumFollowers(data.data.length);
    }

    const checkFollow = async () => {
        const data = await checkFollowing(user.id, oUser.id);
        setIsFollowing(data.data);
    };

    const follow = async () => {
        const follow = await checkFollowing(user.id, oUser.id);
        const data = await followUser(user.id, oUser.id, follow.data);
        setIsFollowing(!follow.data);
    };


    return (
        <TouchableOpacity
                style={{
                  marginVertical: '2%',
                  width: Dimensions.get('window').width,
                  backgroundColor: '#FFF',
                  shadowColor: "#000",
                  shadowOffset: {
                  width: 0,
                  height: 0
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 5
                }}
                
                onPress={() => { 
                  navToProfile(oUser)
                }
                }>
                  <View style={{flexDirection: 'row', alignItems: 'center', width: Dimensions.get('screen').width}}>
                  { (!noProfilePic)  ? 
                      <Image source={{uri: oUser.profile.avatar}} style={Styles.pollImage} onError={()=> setError(true)}/> 
                  :
                      <View style={Styles.noImage}>
                          <Text style={Styles.noImageText}>{oUser.username.slice(0,1)}</Text>
                      </View>
                  }
                    <View style={{marginHorizontal: '2%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold'
                      }}>
                      {oUser.username}
                    </Text>
                    <Text>{numFollower} Followers</Text>
                    </View>
                    <View style={{position: 'absolute', marginVertical: '2%', right: '5%', width: '30%', justifyContent: 'center'}}>
                      <ColoredButton fill={!isFollowing} color={'#907AD6'} text={isFollowing ? 'Following' : 'Follow'} whenPressed={follow}/>
                    </View>
                  </View>
              </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
  container: {
      width: dimensions.width, 
      flexDirection: 'row', 
      paddingVertical: '4%', 
      paddingHorizontal: '6%', 
      justifyContent: 'center'
  },
  pollImage: {
      height: dimensions.width/4,
      width: dimensions.width/4,
      aspectRatio: 1,
      resizeMode: 'cover',
      borderColor: '#ffeef7',
  },
  noImage: {
      height: dimensions.width/4,
      width: dimensions.width/4,
      aspectRatio: 1,
      resizeMode: 'contain',
      borderColor: '#ffeef7',
      backgroundColor: '#907AD6',
      alignItems: 'center',
      justifyContent: 'center'
  },
  noImageText: {
      fontWeight: 'bold', 
      fontSize: dimensions.width/12, 
      color: 'white'
  },
  questionText: {
      fontWeight: 'bold', 
      flexWrap: 'wrap', 
      paddingHorizontal: '7%',
  },
  votesText: {
      fontWeight: 'bold', 
      flexWrap: 'wrap', 
      paddingHorizontal: '7%', 
      color: '#9c9c9c', 
  },
  labelContainer: {
      padding: '1%', 
      borderRadius: 1000, 
      justifyContent: 'center'
  },
  labelText: {
      fontWeight: 'bold', 
      textAlign: 'center', 
      color: 'white', 
      fontSize: dimensions.width/30, 
      paddingHorizontal: '3%'
  }
})

export default UserCard;