import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetCommPolls } from '../api/comments';

/**
* * Show individual community and polls it contains (requires: id, pollScreen)
* @param id - The id of the community
* @param pollScreen - The name of poll stack screen to navigate to
*/

const CommunitiesScreen = ({route, navigation}) => {

    const [polls, setPolls] = React.useState()

    React.useEffect(() => {
        console.log(route.params.id + ' id')
        loadCommPolls();
    }, []);

    const loadCommPolls = async () => {
        const commPolls = await GetCommPolls(route.params.id);
        setPolls(commPolls.polls);
    }

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView>
                <View style={{flex: 1}}>
                    {polls?.map((poll, idx) => {
                        return (
                            <TouchableOpacity key={idx} onPress={() => navigation.push(route.params.pollScreen, {id: poll.id})}>
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