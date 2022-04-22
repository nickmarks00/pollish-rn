import React from 'react';
import { View, Text, Button } from 'react-native';

const CommunitiesScreen = ({setCommunity}) => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Show Communities You follow here</Text>
            <Button onPress={() => setCommunity(false)} title='close'/>
        </View>
    )
}
export default CommunitiesScreen;