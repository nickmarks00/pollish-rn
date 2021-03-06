import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { getPollVotes } from 'endpoints/pollish';
import moment from 'moment';

const PollProfile = ({ user, navigateProfile, pid, voteCount, postTime }) => {

    const [noProfilePic, setError] = React.useState(false);
    console.log(user.profile.avatar)

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {!noProfilePic ?
                <TouchableOpacity style={Styles.profilePicContainer} onPress={() => navigateProfile()}>
                    <Image source={{uri: user.profile.avatar}} style={Styles.profilePic} onError={() => setError(true)}/>
                </TouchableOpacity> 
                :
                <TouchableOpacity onPress={() => navigateProfile()} style={Styles.profilePicAlt}>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: Dimensions.get('window').width/20, fontWeight: 'bold'}} >
                        {user.username.slice(0,1)}
                    </Text>
                </TouchableOpacity>
            }
            <View style={{ width: '4%' }}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>{user.username}</Text>
                    <View style={{height: '5%'}}/>
                    <Text>{voteCount} votes</Text>
                </View>
                <View style={{ width: '2%' }}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{ color: '#6c6c6c', fontSize: 10 }}>{moment(postTime).fromNow()}</Text>
                    <View style={{height: '5%'}}/>
                    <Text></Text>
                </View>
        </View>
    )
}

export default PollProfile;

const Styles = StyleSheet.create({
    profilePicContainer: {
        height: '20%',
        width: '20%',
        aspectRatio: 1,
        borderRadius: 5000,
        borderColor: 'black',
        borderWidth: 1,
    },
    profilePic: {
        height: '100%',
        width: '100%',
        aspectRatio: 1,
        borderRadius: 5000,
        resizeMode: 'cover',
    },
    profilePicAlt: {
        height: '20%',
        width: '20%',
        aspectRatio: 1,
        borderRadius: 5000,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#907AD6'
    }
})