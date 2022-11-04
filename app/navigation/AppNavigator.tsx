import React from 'react';
import {Modal, View, Dimensions, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import colors from '../config/colors';
import CreationModal from './CreationModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN_NAMES} from '../constants/keys';

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
import SettingsScreen from '../screens/Settings';
import NotificationsScreen from '../screens/Notifications';

const Stack = createNativeStackNavigator();

// All Available Screens
const Notifications = () => (
  <Stack.Screen
    name={SCREEN_NAMES.NOTIFICATIONS}
    component={NotificationsScreen}
  />
);
const Settings = () => (
  <Stack.Screen name={SCREEN_NAMES.SETTINGS} component={SettingsScreen} />
);
const CommunityHome = () => (
  <Stack.Screen
    name={SCREEN_NAMES.COMMUNITY_HOME}
    component={CommunityTab}
    options={{headerShown: false}}
  />
);
const Profile = () => (
  <Stack.Screen
    name={SCREEN_NAMES.PROFILE}
    initialParams={{show: false}}
    options={({route}) => ({
      headerShown: route.params.show ? true : false,
      title: route.params.title,
    })}
    component={ProfilePage}
  />
);
const Follow = () => (
  <Stack.Screen
    name={SCREEN_NAMES.FOLLOW}
    options={({route}) => ({
      title: route.params.title,
      headerShown: true,
    })}
    component={FollowersScreen}
  />
);
const PollList = () => (
  <Stack.Screen
    name={SCREEN_NAMES.POLL_LIST}
    initialParams={{pollScreen: SCREEN_NAMES.POLL}}
    component={PollsScreen}
    options={({route}) => ({title: 'Polls', headerShown: true})}
  />
);
const Poll = () => (
  <Stack.Screen
    name={SCREEN_NAMES.POLL}
    component={SinglePoll}
    options={{title: '', headerBackTitle: 'Back'}}
  />
);
const Comments = () => (
  <Stack.Screen
    name={SCREEN_NAMES.COMMENTS}
    initialParams={{profileScreen: SCREEN_NAMES.PROFILE}}
    component={CommentSection}
    options={({route}) => ({title: '', headerShown: true})}
  />
);
const UserCommunities = () => (
  <Stack.Screen
    name={SCREEN_NAMES.FOCUS_LIST}
    initialParams={{communityScreen: SCREEN_NAMES.COMMUNITY}}
    component={CommunityList}
    options={{headerShown: true}}
  />
);
const Community = () => (
  <Stack.Screen
    name={SCREEN_NAMES.COMMUNITY}
    initialParams={{pollScreen: SCREEN_NAMES.POLL}}
    component={CommunitiesScreen}
    options={{headerShown: false}}
  />
);
const SearchHome = () => (
  <Stack.Screen
    name={SCREEN_NAMES.SEARCH_HOME}
    options={{headerShown: false}}
    component={SearchScreen}
  />
);
const VoteList = () => (
  <Stack.Screen
    name={SCREEN_NAMES.VOTE_LIST}
    component={VoteScreen}
    initialParams={{
      pollScreen: SCREEN_NAMES.POLL,
      profileScreen: SCREEN_NAMES.PROFILE,
    }}
    options={({route}) => ({title: route.params.title, headerShown: false})}
  />
);
const Feed = () => (
  <Stack.Screen
    name={SCREEN_NAMES.FEED}
    initialParams={{
      notificationsScreen: SCREEN_NAMES.NOTIFICATIONS,
      commentsScreen: SCREEN_NAMES.COMMENTS,
      profileScreen: SCREEN_NAMES.PROFILE,
    }}
    options={{headerShown: false}}
    component={FeedScreen}
  />
);

// Community Tab Stack
const CommunityStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CommunityHome"
      screenOptions={{gestureEnabled: true}}>
      {CommunityHome()}
      {Profile()}
      {Follow()}
      {PollList()}
      {Poll()}
      {Comments()}
      {UserCommunities()}
      {Community()}
    </Stack.Navigator>
  );
};

// Profile Tab Stack
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{gestureEnabled: true}}>
      {Profile()}
      {Follow()}
      {PollList()}
      {Poll()}
      {Comments()}
      {UserCommunities()}
      {Community()}
      {VoteList()}
      {Settings()}
    </Stack.Navigator>
  );
};

// Search Tab Stack
const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeSearch"
      screenOptions={{gestureEnabled: true}}>
      {SearchHome()}
      {Profile()}
      {Community()}
      {Follow()}
      {Comments()}
      {PollList()}
      {Poll()}
      {UserCommunities()}
    </Stack.Navigator>
  );
};

// Home Tab Stack
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{gestureEnabled: true}}>
      {Feed()}
      {Comments()}
      {Poll()}
      {Profile()}
      {Follow()}
      {PollList()}
      {UserCommunities()}
      {Community()}
      {VoteList()}
      {Notifications()}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const {height, width} = Dimensions.get('window');

const CustonTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 58,
        height: 58,
        borderRadius: 35,
        backgroundColor: '#0FA3B1',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const tabOptions = iconName => ({
  tabBarIcon: ({focused}) => (
    <View
      style={
        focused
          ? {
              backgroundColor: '#CFEDEF',
              width: 40,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 1000,
            }
          : {}
      }>
      <MaterialCommunityIcons
        name={iconName}
        size={25}
        color={focused ? '#0FA3B1' : '#BBBBBB'}
      />
    </View>
  ),
});

const AppNavigator = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{flex: 1}}>
      {/* Create a Poll popup */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <CreationModal setModalVisible={setModalVisible} />
      </Modal>

      {modalVisible && (
        <View
          style={{
            backgroundColor: '#00AAA9',
            opacity: 0.4,
            position: 'absolute',
            height,
            width,
            zIndex: 2,
          }}
        />
      )}

      {/* Screens in Bottom Navigation Bar */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {borderTopWidth: 0.2, borderTopColor: '#EEEEEE'},
        }}>
        <Tab.Screen
          name="T_Feed"
          component={HomeStack}
          options={tabOptions('poll')}
        />
        <Tab.Screen
          name="T_Community"
          component={CommunityStack}
          options={tabOptions('account-group')}
        />
        <Tab.Screen
          name="T_Add"
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
            tabBarButton: props => <CustonTabBarButton {...props} />,
          }}
          listeners={() => ({
            tabPress: event => {
              event.preventDefault();
              setModalVisible(true);
            },
          })}
        />
        <Tab.Screen
          name="T_Search"
          component={SearchStack}
          options={tabOptions('database-search')}
        />
        <Tab.Screen
          name="T_Profile"
          component={ProfileStack}
          options={tabOptions('account')}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AppNavigator;
