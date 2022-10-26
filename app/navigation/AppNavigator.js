import React from 'react';
import { Modal, View, Dimensions, TouchableOpacity } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import colors from '../config/colors';
import CreationModal from './CreationModal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// App Screens
import FollowersScreen from '../screens/FollowersScreen';
import PollsScreen from '../screens/Profile/PollsScreen';
import CommentSection from '../screens/CommentSection';
import CommunityList from '../screens/Profile/UserCommunities';
import CommunitiesScreen from '../screens/Community';
import ProfilePage from '../screens/Tabs/ProfilePage';
import SinglePoll from '../screens/SinglePoll';
import CommunityTab from '../screens/Tabs/CommunityTab';
import SearchScreen from '../screens/Tabs/SearchScreen';
import FeedScreen from '../screens/Tabs/FeedScreen';
import VoteScreen from '../screens/VoteScreen';

// Names associated with each screen
const SCREEN_NAMES = {
  COMMUNITY_HOME: 'CommunityHome',
  PROFILE: 'Profile',
  POLL_LIST: 'PollList',
  FOLLOW: 'Follow',
  COMMUNITY_LIST: 'CommunityList',
  COMMUNITY: 'Community',
  POLL: 'Poll',
  COMMENTS: 'Comments',
  SEARCH_HOME: 'SearchHome',
  VOTE_LIST: 'Vote',
  FEED: 'Feed'
}

// Screen is first letter of stack follow by screen name
const generateName = (id, name) => (id + '_' + name)

const Stack = createNativeStackNavigator();

// All Available Screens
const CommunityHome = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.COMMUNITY_HOME)} initialParams={{communityScreen: generateName(id, SCREEN_NAMES.COMMUNITY)}} component={CommunityTab} options={{headerShown: false}}/>
const Profile = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.PROFILE)} initialParams={{ show: false, singlePollScreen: generateName(id, SCREEN_NAMES.POLL), followScreen: generateName(id, SCREEN_NAMES.FOLLOW), pollListScreen: generateName(id, SCREEN_NAMES.POLL_LIST), communityListScreen: generateName(id, SCREEN_NAMES.COMMUNITY_LIST)}} options={({ route }) => ({headerShown: route.params.show ? true: false, contentStyle: {backgroundColor: '#FFF'}, title: route.params.title})} component={ProfilePage} />
const Follow = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.FOLLOW)} initialParams={{profileScreen: generateName(id, SCREEN_NAMES.PROFILE)}} options={({ route }) => ({ title: route.params.title, contentStyle: {backgroundColor: '#FFF'}, headerShown: true })} component={FollowersScreen} />
const PollList = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.POLL_LIST)} initialParams={{pollScreen: generateName(id, SCREEN_NAMES.POLL)}} component={PollsScreen} options={({route}) => ({ title: 'Polls', headerShown: true, })}/>
const Poll = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.POLL)} initialParams={{commentsScreen: generateName(id, SCREEN_NAMES.COMMENTS), profileScreen: generateName(id, SCREEN_NAMES.PROFILE)}} component={SinglePoll} options={{title: '', headerBackTitle: 'Back'}}/>
const Comments = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.COMMENTS)} initialParams={{profileScreen: generateName(id, SCREEN_NAMES.PROFILE)}} component={CommentSection} options={({route}) => ({ title: '', headerShown: true, })}/>
const UserCommunities = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.COMMUNITY_LIST)} initialParams={{communityScreen: generateName(id, SCREEN_NAMES.COMMUNITY)}} component={CommunityList} options={({route}) => ({ title: route.params.title, headerShown: true, })} />
const Community = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.COMMUNITY)} initialParams={{pollScreen: generateName(id, SCREEN_NAMES.POLL)}} component={CommunitiesScreen} options={({ route }) => ({ title: route.params.title, headerShown: false})}/>
const SearchHome = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.SEARCH_HOME)} options={{headerShown: false}} component={SearchScreen} screenOptions={{ }} />
const VoteList = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.VOTE_LIST)} component={VoteScreen} initialParams={{pollScreen: generateName(id, SCREEN_NAMES.POLL)}} options={({route}) => ({ title: route.params.title, headerShown: false })} />
const Feed = (id) => <Stack.Screen name={generateName(id, SCREEN_NAMES.FEED)} initialParams={{commentsScreen: generateName(id, SCREEN_NAMES.COMMENTS), profileScreen: generateName(id, SCREEN_NAMES.PROFILE)}} options={{headerShown: false}}  component={FeedScreen}/>

// Community Tab Stack
const CommunityStack = () => {

  const IDENTIFIER = "C";

  return (
    <Stack.Navigator initialRouteName='C_CommunityHome'
      screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
    >
      { CommunityHome(IDENTIFIER) }
      { Profile(IDENTIFIER) }
      { Follow(IDENTIFIER) }
      { PollList(IDENTIFIER) }
      { Poll(IDENTIFIER) }
      { Comments(IDENTIFIER) }
      { UserCommunities(IDENTIFIER) }
      { Community(IDENTIFIER) } 
    </Stack.Navigator>
  )
}

// Profile Tab Stack
const ProfileStack = () => {

  const IDENTIFIER = "P";

  return (
    <Stack.Navigator initialRouteName='P_Profile'
      screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
    >
      { Profile(IDENTIFIER) }    
      { Follow(IDENTIFIER) }
      { PollList(IDENTIFIER) }
      { Poll(IDENTIFIER) }
      { Comments(IDENTIFIER) }
      { UserCommunities(IDENTIFIER) }
      { Community(IDENTIFIER) }
    </Stack.Navigator>
  )
}

// Search Tab Stack
const SearchStack = () => {

  const IDENTIFIER = "S";

  return (
    <Stack.Navigator initialRouteName='S_HomeSearch'
      screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
    >
      { SearchHome(IDENTIFIER) }
      { Profile(IDENTIFIER) }
      { Community(IDENTIFIER) }
      { Follow(IDENTIFIER) }
      { Comments(IDENTIFIER) }
      { PollList(IDENTIFIER) }
      { Poll(IDENTIFIER) }
      { UserCommunities(IDENTIFIER) }
    </Stack.Navigator>
  )
}

// Home Tab Stack
const HomeStack = () => {

  const IDENTIFIER = "H";

  return (
    <Stack.Navigator initialRouteName='H_Feed'
      screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
    >
      { Feed(IDENTIFIER) }
      { Comments(IDENTIFIER) }
      { Poll(IDENTIFIER) }
      { Profile(IDENTIFIER) }
      { Follow(IDENTIFIER) }
      { PollList(IDENTIFIER) }
      { UserCommunities(IDENTIFIER) }
      { Community(IDENTIFIER) }
      { VoteList(IDENTIFIER) }
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');

const CustonTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View style={{
      width: 58,
      height: 58,
      borderRadius: 35,
      backgroundColor: '#0FA3B1'
    }}>
      {children}
    </View>

  </TouchableOpacity>
)

const AppNavigator = props => {

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{flex: 1}}>
    <Modal  visible={modalVisible} animationType="slide" transparent>
      <CreationModal setModalVisible={setModalVisible}/>
    </Modal>
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: {borderTopWidth: 0.2, borderTopColor: '#EEEEEE'} }}>
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? {backgroundColor: '#CFEDEF', width: 40, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 1000,} : {}}>
            <MaterialIcons
              name={'poll'}
              size={25}
              color={focused ? '#0FA3B1' : '#BBBBBB'}
            />
            </View>

          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? {backgroundColor: '#CFEDEF', width: 40, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 1000,} : {}}>
              <MaterialCommunityIcons
                name={focused ? 'account-group' : 'account-group-outline'}
                size={25}
                color={focused ? '#0FA3B1' : '#BBBBBB'}
                style={{}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={CommunityStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather
              name={focused ? 'plus' : 'plus'}
              size={40}
              color={focused ? colors.secondary : 'white'}
              style={{}}
            />
          ),
          tabBarButton: (props) => (
            <CustonTabBarButton { ... props} />
          )
        }}
        listeners={() => ({
          tabPress: event => {
            event.preventDefault();
            setModalVisible(true);
          }
        })}
      />

      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? {backgroundColor: '#CFEDEF', width: 40, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 1000,} : {}}>
            <MaterialIcons
              name={focused ? 'search' : 'search'}
              size={25}
              color={focused ? '#0FA3B1' : '#BBBBBB'}
              style={{}}
            />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? {backgroundColor: '#CFEDEF', width: 40, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 1000,} : {}}>

            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={25}
              color={focused ? '#0FA3B1' : '#BBBBBB'}
              style={{}}
            />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    {modalVisible && <View style={{backgroundColor: '#00AAA9', opacity: 0.4, position: 'absolute', height, width}}/>}
    </View>
  );
};

export default AppNavigator;
