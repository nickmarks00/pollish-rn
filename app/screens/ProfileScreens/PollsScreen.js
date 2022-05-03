import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GetUserPolls } from '../../api/comments';

const PollsScreen = ({route, navigation}) => {

    const [polls, setPolls] = React.useState()

    React.useEffect(() => {
        loadPolls();
        console.log('name ' + route.params.pollScreen)
      }, []);

    const loadPolls = async () => {
        const userPolls = await GetUserPolls(route.params.id);
        console.log("######")
        console.log(userPolls.results);
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