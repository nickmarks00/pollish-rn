import React from 'react';
import { View, Text } from 'react-native';

const CreateMedia = () => {
    return (
        <View style={{justifyContent: 'space-evenly', flex: 1, alignItems: 'center'}}>
                <Text style={{color: '#125AC5', fontWeight: 'bold', fontSize: 16}}>ADD VISUALS TO YOUR POST!</Text>
                <View style={{justifyContent: 'space-evenly', flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#EEE', borderRadius: '10%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                            <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                        </View>
                    </View>
                    <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#EEE', borderRadius: '10%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                            <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                        </View>
                    </View>
                    
                </View>
                <View style={{justifyContent: 'space-evenly', flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#EEE', borderRadius: '10%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                            <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                        </View>
                    </View>
                    <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#EEE', borderRadius: '10%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: '30%', aspectRatio: 1, backgroundColor: '#83EFB1', alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
                            <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>+</Text>
                        </View>
                    </View>
                </View>
                </View>
    )
}

export default CreateMedia;