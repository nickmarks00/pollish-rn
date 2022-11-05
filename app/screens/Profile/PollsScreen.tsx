import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
// @ts-ignore
import {getUserPolls} from 'endpoints/core';
import PollCard from '../../components/PollCard';
// @ts-ignore
import {deletePoll} from 'endpoints/pollish';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavProps, RootStackParams, SCREEN_NAMES} from '../../constants/keys';
import {useNavigation} from '@react-navigation/native';

type PollsScreenProps = NativeStackScreenProps<RootStackParams, 'PollsScreen'>;

const {height, width} = Dimensions.get('window');

/**
 * * Shows list of polls a user owns (requires: id, pollScreen)
 * @param id - The id of the user
 */

const PollsScreen = ({route}: PollsScreenProps) => {
  const navigation = useNavigation<NavProps>();
  const [polls, setPolls] = React.useState();

  React.useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    const userPolls = await getUserPolls(route.params.id);
    setPolls(userPolls.data.results);
  };

  const removePoll = async (id: number) => {
    await deletePoll(id);
    loadPolls();
  };

  const showConfirmDialog = (id: number) => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to delete this poll?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            removePoll(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{height: height * 0.021}} />
      <FlatList
        data={polls}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={{height: height * 0.021}} />;
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{flex: 1}}
            onLongPress={() => showConfirmDialog(item.id)}
            onPress={() => navigation.push(SCREEN_NAMES.POLL, {id: item.id})}>
            <PollCard qText={item.question_text} id={item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PollsScreen;
