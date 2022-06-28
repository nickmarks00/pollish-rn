import React, {useState} from 'react';
import { View, Text, Dimensions, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Top_Options_BG, Header_Text, Content_Section, Content_Navbar } from 'style/Create_Style';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CreatePoll from './CreatePoll';
import CreateCommunity from './CreateCommunity';


const dimensions = Dimensions.get('screen');

const CreationHub = () => {

    const [poll, setPoll] = useState(false);
    const [community, setCommunity] = useState(false);

    return (
        <View style={{paddingHorizontal: '10%'}}>
            <Modal visible={poll} animationType={'slide'}>
                <CreatePoll setPoll={setPoll}/>
            </Modal>
            <Modal visible={community} animationType={'slide'}>
                <CreateCommunity setCommunity={setCommunity}/>
            </Modal>
            <View style={{height: dimensions.height/4, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={Header_Text}>Create content, find out what others think!</Text>
            </View>
            <View style={{justifyContent: 'space-evenly'}}>
                <TouchableOpacity onPress={() => setPoll(true)}>
                    <View style={styles.box}>
                        <Text>Create Poll</Text>
                        <View style={{position: 'absolute', aspectRatio: 1, width: '3%', backgroundColor: '#FFF', bottom: 0, right: 0, margin: '5%', borderRadius: 1000, alignItems: 'center', justifyContent: 'center'}}>
                        <MaterialCommunityIcons
                        name={'chevron-right'}
                        size={30}
                        color={'black'}
                        style={{}}
                        />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{height: dimensions.height/20}}/>
                <TouchableOpacity onPress={() => setCommunity(true)}>
                    <View style={styles.box}>
                        <Text>Create Community</Text>
                        <View style={{position: 'absolute', aspectRatio: 1, width: '3%', backgroundColor: '#FFF', bottom: 0, right: 0, margin: '5%', borderRadius: 1000, alignItems: 'center', justifyContent: 'center'}}>
                            <MaterialCommunityIcons
                            name={'chevron-right'}
                            size={30}
                            color={'black'}
                            style={{}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreationHub;

const styles = StyleSheet.create({
    box: {
        width: '100%', height: dimensions.height/6, backgroundColor: '#f8f8f8', borderRadius: 20, shadowColor: "#000",
          shadowOffset: {
          width: 0,
          height: 1
          },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'center'
    }
})