import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Question_InputBox, Question_Container, Question_Header } from 'style/Create_Style';
import { commentAPI } from '../../network/lib/core';
import {MaterialCommunityIcons} from '@expo/vector-icons';


import { searchCommunities } from '../../network/lib/pollish';

/*
    * Component for the question page in create section
*/

const AssignComm = ({selectComm, comm}) => {

    const [search, setSearch] = React.useState('');
    const [content, setContent] = React.useState([]);

    const findContent = async (text) => {
        setSearch(text)
        if(text){
        const data = await searchCommunities(text);
        setContent(data.data.results);
        } else {
            setContent([])
        }
        
    }

    const handleSelection = (comm) => {
        selectComm(comm)
        setSearch('')
        setContent([])
    }

    return(
        <View style={{flex: 1, 
            alignItems: 'center'}}>
            <View style={{height: '5%'}}/>
            <Text style={Question_Header}>Assign Community</Text>
            { comm ?
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', marginTop: '10%'}}>
                    <Text>{comm.name}</Text>
                    <TouchableOpacity onPress={() => handleSelection(null)}>
                    <MaterialCommunityIcons
                        name={'close-circle'}
                        size={20}
                        color={'black'}
                        style={{}}
                    />
                    </TouchableOpacity>
                </View>
            :
                <TextInput value={search} onChangeText={text => findContent(text)} placeholder='Search Communities' style={Question_InputBox}/>
            }
            
            <View style={{height: '5%'}}/>
            <View style={{flex: 1}}>
                <FlatList
                    data={content}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => handleSelection(item)}>
                                <Text>{item.name}</Text>
                        </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default AssignComm;