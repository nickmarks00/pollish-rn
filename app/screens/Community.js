import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GetCommPolls} from '../api/comments';
import PollCard from '../components/pollCard';

/**
 * * Show individual community and polls it contains (requires: id, pollScreen)
 * @param id - The id of the community
 * @param pollScreen - The name of poll stack screen to navigate to
 */

const Community = ({route, navigation}) => {
  const [polls, setPolls] = React.useState();
  const [commName, setCommName] = React.useState('');

  React.useEffect(() => {
    loadCommPolls();
  }, []);

  const loadCommPolls = async () => {
    const commPolls = await GetCommPolls(route.params.id);
    setPolls(commPolls.polls);
    setCommName(commPolls.name);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{padding: '5%'}}>
        <Text>{commName}</Text>
      </View>
      <ScrollView>
        <View style={{flex: 1}}>
          {polls?.map((poll, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                onPress={() =>
                  navigation.push(route.params.pollScreen, {id: poll.id})
                }>
                <PollCard key={idx} color={'#51E0B8'} qText={poll.question_text} id={poll.id}/>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Community;
