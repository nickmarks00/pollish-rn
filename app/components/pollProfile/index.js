import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { GetPollVotes } from '../../api/comments';

const PollProfile = ({ user, navigateProfile, pid }) => {

    const [noProfilePic, setError] = React.useState(false);
    const [votes, setVotes] = React.useState(0);

    React.useEffect(() => {
        loadVotes();
    }, []);

    const loadVotes = async () => {
        const data = await GetPollVotes(pid);
        setVotes(data);
    }

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {noProfilePic ? 
                <Image source={{uri: user.profile.avatar}} style={Styles.profilePic} onError={setError(true)}/>
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
                    <Text>{votes} votes</Text>
                </View>
                <View style={{ width: '2%' }}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={{ color: '#6c6c6c', fontSize: 10 }}>2min ago</Text>
                    <View style={{height: '5%'}}/>
                    <Text></Text>
                </View>
        </View>
    )
}

export default PollProfile;

const Styles = StyleSheet.create({
    profilePic: {
        height: '20%',
        width: '20%',
        aspectRatio: 1,
        borderRadius: 5000,
        resizeMode: 'contain',
        borderColor: 'black',
        borderWidth: 1,
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