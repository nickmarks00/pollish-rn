import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import Button from '../../components/Button';
import Constants from 'expo-constants';
import IconButton from '../../components/iconButton';
import { useNavigation } from '@react-navigation/native';
import { getEachUserVote } from '../../network/lib/pollish';
import UserVote from '../../components/userVote';
const { width, height } = Dimensions.get('window');

const VoteScreen = ({route}) => {

    const [userVotes, setUserVotes] = React.useState([])

    React.useEffect(() => {
        loadUserVotes();
    }, [])

    const loadUserVotes = async () => {
        const data = await getEachUserVote(route.params.pid);
        console.log(data.data);
        setUserVotes(data.data);
    }

    const navigation = useNavigation();
    return (
        <View style={{marginTop: Constants.statusBarHeight, alignItems: 'center'}}>
            <View style={{height: height*0.05, justifyContent: 'center', alignItems: 'center', marginVertical: height*0.018, width: '100%'}}>
                <IconButton action={()=>navigation.goBack()} name={'chevron-back'} iconFill={'#FFF'} style={{position: 'absolute', left: 0, backgroundColor: '#D9D9D9', marginLeft: width*0.07, borderRadius: 1000}} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Poll Votes</Text>
            </View>
            <View style={{flexDirection: 'row', height: height*0.03, justifyContent: 'center'}}>
                <Button textColor={'#0FA3B1'} text={"All Users"} style={{height: '100%', width: width*0.435, borderColor: '#0FA3B1', borderWidth: 1, borderRadius: height*0.013}} />
                <View style={{width: width*0.026}}/>
                <Button textColor={'#FFF'} text={"All Choices"} style={{height: '100%', width: width*0.435, backgroundColor: '#0FA3B1', borderRadius: height*0.013}} />
            </View>
            <View style={{height: height*0.03}}/>
            {userVotes?.map((item, idx) => {
                var choiceText = ''
                route.params.choices.map((option, idx) => {
                    if(option.id == item.id)
                        choiceText = option.choice_text
                })
                
                return(
                item.users.map((user, idy) => {
                    return (
                        <UserVote oUser={user} voteText={choiceText}/>
                    )
                })
                )
            })}

        </View>
    )
}

export default VoteScreen;