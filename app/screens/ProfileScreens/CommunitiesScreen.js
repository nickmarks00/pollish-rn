import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CommunitiesScreen = ({route, navigation}) => {

    React.useEffect(() => {
        console.log('g')
        console.log(route.params.polls)
        console.log('e')
    }, []);

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView>
                <View style={{flex: 1}}>
                    {route.params?.polls.map((poll, idx) => {
                        return (
                            <TouchableOpacity key={idx} onPress={() => navigation.push('PollFromSearch', {post: poll})}>
                                <Text key={idx}>{poll.question_text}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}
export default CommunitiesScreen;