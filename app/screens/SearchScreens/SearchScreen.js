import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Dimensions, Button, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {BASE_IP} from '@env';
import { useNavigation } from '@react-navigation/native';
import SearchPollView from './SearchPollView';
import authStorage from '../../auth/storage'

const base = BASE_IP;
const dimensions = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {

    const [search, setSearch] = useState('');
    const [content, setContent] = useState([])
    const [toggle, setToggle] = useState('poll')

    useEffect(() => {
      }, []);

    const searchFilter = (text) => {
        console.log(text)
        if (text) {
            findContent(text)
        }
        else{
            setContent([])
        }
        setSearch(text)
    }

    const nextPage = (poll) => {
        console.log(poll)
        if(toggle === 'user'){
            navigation.push('ProfileHome', {user: poll })
        }
        else if(toggle === 'comm'){
            navigation.push('S_Community', { polls: poll.polls })
        }
    }

    const findContent = async (text) => {
        const res = await authStorage.getTokens();
        const access = JSON.parse(res).access;
        console.log(access)
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${access}`,
            },
        }
        var url = ''
        if(toggle === 'poll') url = `http://${BASE_IP}/pollish/polls/?search=${text}`
        else if(toggle === 'comm') url = `http://${BASE_IP}/pollish/communities/?search=${text}`
        else if(toggle === 'user') url = `http://${BASE_IP}/core/users/?search=${text}`
        const response = await fetch(url, options)
        .then(response => response.json())
                .then(response => {
                    if(toggle !== 'comm')
                        setContent(response.results)
                    else setContent(response)
        })
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
                <TextInput
                style={styles.comment_input}
                onChangeText={(text) => searchFilter(text)}
                value={search}
                placeholder="What do you want to know?"
                />
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{padding: '3%'}} onPress={() => setToggle('poll')}><Text style={{color: toggle === 'poll' ? 'blue' : 'black'}}>Poll</Text></TouchableOpacity>
                    <TouchableOpacity style={{padding: '3%'}} onPress={() => setToggle('comm')}><Text style={{color: toggle === 'comm' ? 'blue' : 'black'}}>Community</Text></TouchableOpacity>
                    <TouchableOpacity style={{padding: '3%'}} onPress={() => setToggle('user')}><Text style={{color: toggle === 'user' ? 'blue' : 'black'}}>User</Text></TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1, padding: '2%'}}>
                        {content?.map((poll, idx) => {
                            return (
                                <TouchableOpacity key={idx} onPress={() => nextPage(poll)}>
                                    <Text style={{ padding: '3%', margin: '2%', borderWidth: 1 }}>{toggle==='poll' ? poll.question_text : toggle==='user' ? poll.username : poll.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
        </View>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    comment_input: {
        height: 40,
        width: dimensions.width/1.1,
        marginTop: 60,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#BBB',
        padding: 10,
        justifyContent: 'center'
      },

    post_container: {
        width: dimensions.width,
        height: dimensions.height/12,
        flexDirection: 'row',
        alignItems: 'center'
    },

    post_image: {
        height: dimensions.height/15,
        width: dimensions.width/3
    },

    text: {
        width: dimensions.width*(2/3),
        textAlign: 'center',
    }
})