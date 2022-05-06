import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GetUserPolls } from '../api/comments';

/**
 * * Shows list of polls a user owns (requires: id, pollScreen)
 * @param id - The id of the user
 * @param pollScreen - The name of poll stack screen to navigate to
 */

const PollsScreen = ({route, navigation}) => {

    const [polls, setPolls] = React.useState()

    React.useEffect(() => {
        loadPolls();
      }, []);

    const loadPolls = async () => {
        const userPolls = await GetUserPolls(route.params.id);
        setPolls(userPolls.results);
    }

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Your Polls</Text>
            {polls?.map((poll, idx) => {
                return(
                    <TouchableOpacity key={idx} onPress={() => navigation.push(route.params.pollScreen, {id: poll.id})}>
                    <Text>{poll.question_text}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default PollsScreen;