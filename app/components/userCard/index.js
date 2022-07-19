import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import ColoredButton from '../coloredButton';
import { getFollowers } from 'endpoints/core';
import { checkFollowing } from '../../network/lib/core';
import { followUser } from '../../network/lib/core';

const UserCard = ({oUser, navToProfile}) => {

    const [numFollower, setNumFollowers] = React.useState(0);
    const [isFollowing, setIsFollowing] = React.useState(false);
    const {user, logOut} = useAuth();


    React.useEffect(() => {
        loadFollowerCount();
        checkFollow();
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
                    <View style={{
                      margin: '2%',
                      width: '10%',
                      borderRadius: 1000,
                      backgroundColor: '#907AD6',
                      aspectRatio: 1,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Text style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>{oUser.username.slice(0,1).toUpperCase()}</Text>
                    </View>
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

export default UserCard;