import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { getCommPolls } from 'endpoints/pollish';
import PollCard from '../components/pollCard';
import ColoredButton from '../components/coloredButton';
import { getUserComms } from '../network/lib/core';
import { followCommunity } from '../network/lib/pollish';

/**
 * * Show individual community and polls it contains (requires: id, pollScreen)
 * @param id - The id of the community
 * @param pollScreen - The name of poll stack screen to navigate to
 * TODO: Write a nicer endpoint for checking if following
 */

const Community = ({route, navigation}) => {

  const [polls, setPolls] = React.useState();
  const [commName, setCommName] = React.useState('');
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [following, setFollowing] = React.useState(0);
  const {user, logOut} = useAuth();

  React.useEffect(() => {
    loadCommPolls();
    checkIfFollowing();
  }, []);

  const checkIfFollowing = async () => {
    const data = await getUserComms(user.id)    
  }

  const loadCommPolls = async () => {
    const commPolls = await getCommPolls(route.params.id);
    setPolls(commPolls.data.polls);
    setCommName(commPolls.data.name);
  };

  const follow = async () => {
    const data = await followCommunity(route.params.id, user.id);
    checkIfFollowing();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '5%'}}>
      <ColoredButton
        fill={!isFollowing}
        color={'#00a2ed'}
        text={isFollowing ? 'Following' : 'Follow'}
        whenPressed={follow}
      />
      <View style={{height: '2%'}}/>
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
