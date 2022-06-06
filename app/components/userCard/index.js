import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import ColoredButton from '../coloredButton';
import { GetFollowers } from '../../api/comments';

const UserCard = ({user, navToProfile}) => {

    const [numFollower, setNumFollowers] = React.useState(0);

    React.useEffect(() => {
        loadFollowerCount();
    }, []);
    
    const loadFollowerCount = async () => {
        const data = await GetFollowers(user.id);
        setNumFollowers(data.length);
    }


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
                  navToProfile(user)
                }
                }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      }}>{user.username.slice(0,1).toUpperCase()}</Text>
                    </View>
                    <View style={{marginHorizontal: '2%'}}>
                    <Text
                      style={{
                        margin: '2%',
                        fontSize: 16,
                        fontWeight: 'bold'
                      }}>
                      {user.username}
                    </Text>
                    <Text>{numFollower} Followers</Text>
                    </View>
                    <View style={{marginVertical: '2%', marginLeft: '25%'}}>
                      <ColoredButton color={'#907AD6'} text={'Following'}/>
                    </View>
                  </View>
              </TouchableOpacity>
    )
}

export default UserCard;