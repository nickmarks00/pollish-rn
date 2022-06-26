import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GetUserPolls } from '../../api/comments';
import PollCard from '../../components/pollCard';

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

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            {polls?.map((poll, idx) => {
                return(
                    <TouchableOpacity key={idx} onPress={() => navigation.push(route.params.pollScreen, {id: poll.id})}>
                        <PollCard color={'#51E0B8'} qText={poll.question_text} id={poll.id}/>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default PollsScreen;