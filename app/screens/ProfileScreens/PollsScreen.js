import React from 'react';
import { View, Text, Button } from 'react-native';

const PollsScreen = ({setPolls}) => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Show Polls You created here</Text>
            <Button onPress={() => setPolls(false)} title='close'/>
        </View>
    )
}
export default PollsScreen;