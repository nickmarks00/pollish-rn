import React from 'react';
import { View, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { getUserPolls } from 'endpoints/core';
import PollCard from '../../components/pollCard';
import { deletePoll } from 'endpoints/pollish'

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

    const removePoll = async (id) => {
        await deletePoll(id);
        loadPolls();
    }

    const showConfirmDialog = (id) => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to delete this poll?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                removePoll(id)
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

    

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
                    <TouchableOpacity style={{flex: 1}} onLongPress={() => showConfirmDialog(item.id)} onPress={() => navigation.push(route.params.pollScreen, {id: item.id})}>
                        <PollCard color={'#51E0B8'} qText={item.question_text} id={item.id} reload={loadPolls}/>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default PollsScreen;