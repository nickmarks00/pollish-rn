import React from 'react';
import { View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Loader from '../../components/Loader';
import Constants from 'expo-constants';
import SectionHeader from '../../components/sectionHeader';

import {
  getFollowers,
  getFollowing,
  getUserPolls,
  checkFollowing,
  followUser,
} from 'endpoints/core';
import { useIsFocused } from '@react-navigation/native';
import Poll from '../ProfilePage/subComponents/Poll';
import FollowButtons from '../ProfilePage/subComponents/FollowButtons';
import ProfilePic from '../../components/profilePic';
import ProfileButtons from '../ProfilePage/subComponents/ProfileButtons';
import Button from '../../components/Button';
import PVV from '../ProfilePage/subComponents/PVV';

const dimensions = Dimensions.get('screen');
const { height, width } = Dimensions.get('screen');

const ProfilePage = ({route, navigation}) => {

  const isFocused = useIsFocused();

  const {user, logOut} = useAuth();
  const [followers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [polls, setPolls] = React.useState([]);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);

  const currentUser = route.params?.user ? route.params.user : user;
  const home = route.params?.user ? false : true;
  
  const POLL_LIST = route.params.pollListScreen;
  const SINGLE_POLL = route.params.singlePollScreen;

  React.useEffect(() => {
    if(isFocused) 
      getInitialData();
  }, [isFocused]);

  const getInitialData = () => {
    findFollowers();
    findFollowing();
    findPolls();
    checkFollow();
  }

  const checkFollow = async () => {
    if (route.params?.user) {
      const data = await checkFollowing(user.id, route.params.user.id);
      setIsFollowing(data.data);
    }
  };

  const findFollowers = async () => {
    const data = await getFollowers(
      route.params?.user ? route.params.user.id : user.id,
    );
    setFollowers(data.data.length);
  };

  const findFollowing = async () => {
    const data = await getFollowing(
      route.params?.user ? route.params.user.id : user.id,
    );
    setFollowing(data.data.length);
  };

  const findPolls = async () => {
    const data = await getUserPolls(
      route.params?.user ? route.params.user.id : user.id,
    );
    setPolls(data.data.results);
  };

  const navToFollowers = (name) => {
    navigation.push(route.params.followScreen, {
      id: route.params?.user ? route.params.user.id : user.id,
      title: name,
      name: name == 'Followers' ? false : true
    });
  };

  const navToPoll = (id) => {
    console.log(id)
    console.log(SINGLE_POLL)
    navigation.push(SINGLE_POLL, {
      id: id,
    })
  }

  const follow = async () => {
    if (route.params?.user) {
      const follow = await checkFollowing(user.id, route.params.user.id);
      const data = await followUser(user.id, route.params.user.id, follow.data);
      setIsFollowing(!follow.data);
    }
  };

  const navToScreen = () => {
    navigation.push(POLL_LIST, {
      id: currentUser.id,
    })
  }

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Loader visible={updating} />

      { home && <View style={{height: Constants.statusBarHeight}}/> }

      {/* Header */}
      { home && <SectionHeader name={route.params?.user ? route.params.user.username : 'My Profile'}/> }

      <View style={{height: height*0.02 }}/>

      {/* Profile Image */}
      <View style={{flexDirection: 'row', height: height*0.167, width: width*0.9, justifyContent: 'center'}}>
        <View style={{flex: 1, alignItems: 'center'}}><ProfilePic user={currentUser}/></View>
        <View style={{width: width*0.042}}/>
        <View style={{flex: 1, alignItems: 'center'}}><View style={{height: height*0.167, aspectRatio: 1, borderRadius: 10000, borderWidth: 5, borderColor: '#00AAA9' }}/></View>
      </View>
      

      <TouchableOpacity onPress={() => logOut()} style={{height: height*0.02, width}}/>

      {/* Follow / Following Buttons */}
      <FollowButtons followers={followers} following={following} navToFollowers={navToFollowers}/>

      <View style={{height: height*0.017}}/>
      
      {/* Profile Buttons / Follow User Button */}
      {currentUser.id == user.id ? 
        <ProfileButtons />
        :
        <Button style={{
                  width: width*0.9, 
                  height: height*0.057, 
                  borderColor: '#00AAA9', 
                  borderWidth: 1, 
                  borderRadius: height*0.015,
                  backgroundColor: isFollowing ? '#00AAA9' : 'white'
                }} 
                text={isFollowing ? 'Following' : 'Follow'} 
                textColor={isFollowing ? 'white' : '#00AAA9'} 
                textSize={17}
                action={follow} 
        />
      }

      <View style={{height: height*0.017}}/>
    
      {/* Polls / Votes / Voted */}

      <PVV votes={0} votesOn={0} pollNum={polls.length} navToScreen={navToScreen}/>

      <View style={{height: dimensions.height*0.028, width: '100%'}}/>

      <View style={{borderTopWidth: 1, flex: 1, borderColor: '#EFEFEF', width: '100%'}}>
        <View style={{height: dimensions.width*0.077}}/>
        <ScrollView horizontal={true} style={{flex: 1}}>
          {polls?.map((poll, idx) => {
            return(
                <Poll key={idx} poll={poll} navToPoll={navToPoll}/>
            )
          })}
        </ScrollView>
      </View>


      {/* Followers / Following buttons */}

      {/* <View
        style={{
          flexDirection: 'row',
          width: dimensions.width,
          justifyContent: 'space-evenly',
        }}>
        <ColoredButton
          color={'#51E0B8'}
          text={followers + ' Followers'}
          whenPressed={navToFollowers}
        />
        <ColoredButton
          color={'#907AD6'}
          text={following + ' Following'}
          whenPressed={navToFollowers}
        />
      </View>

      <View style={{height: '6%'}} /> */}

      {/* {!route.params?.user && (
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor={colors.primary} />}
        onPress={() => logOut()}
      />
      )} */}
    </View>
  );
};
export default ProfilePage;
