import React, {useState} from 'react'
import { Text, View, TextInput, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
const dimensions = Dimensions.get('screen');

const ChoicesPage = () => {

    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');

    return(
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{fontFamily: 'System', fontSize: 30, position: 'absolute', top: dimensions.height/16}}>^</Text>
            <Text style={[{fontSize: 25}, styles.text]}>What are the choices?</Text>
            <Text>Choice A</Text>
            <TextInput onChangeText={newText => setText(newText)} style={{borderBottomWidth: 2, width: dimensions.width*0.80}}></TextInput>
            {text !== '' ? <View style={{width: dimensions.width * 0.8, marginTop: 10}}>
                <Text>Choice B </Text>
                <TextInput onChangeText={newText => setText2(newText)} style={{borderBottomWidth: 1}}></TextInput>
                </View>
             : <View/> }
            {text2 !== '' ? <TextInput onChangeText={newText => setText3(newText)} style={{borderWidth: 1, width: dimensions.width}}></TextInput> : <View/> }
            {text3 !== '' ? <TextInput onChangeText={newText => setText4(newText)} style={{borderWidth: 1, width: dimensions.width}}></TextInput> : <View/> }
            <TouchableOpacity
                onPress={() => navigation.navigate('2')}
                style={{borderRadius: 15, backgroundColor: '#83EFB1', paddingHorizontal: 40, paddingVertical: 10, marginTop: 20}}
            >
                <Text style={{fontSize: 20, fontFamily: 'SFRound', color: '#FFF'}}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChoicesPage;

const styles = StyleSheet.create({
    MainStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'space-between'
    },

    input: {
        borderWidth: 1,
        width: dimensions.width/1.2,
        height: dimensions.height/20,
        paddingHorizontal: 20,
        borderColor: '#DDD',
        borderRadius: 15
    },

    text: {
        fontFamily: 'SFRound',
        textAlign: 'center'
    }
})