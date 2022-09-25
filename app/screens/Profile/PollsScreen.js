import React from 'react';
import { View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { getUserPolls } from 'endpoints/core';
import PollCard from '../../components/pollCard';

const { height, width } = Dimensions.get('window');

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
        const userPolls = await getUserPolls(route.params.id);
        setPolls(userPolls.data.results);
    }

    

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{height: height*0.021}}/>
            <FlatList
                data={polls}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{height: height*0.021}}/>
                    )
                }}
                renderItem={({item}) => (
                    <TouchableOpacity style={{flex: 1}} onLongPress={() => showConfirmDialog()} onPress={() => navigation.push(route.params.pollScreen, {id: item.id})}>
                        <PollCard color={'#51E0B8'} qText={item.question_text} id={item.id} reload={loadPolls}/>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default PollsScreen;