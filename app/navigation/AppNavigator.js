import React from 'react';
import { Modal, View, Dimensions, Text, TouchableOpacity, TextInput } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';

import HomeStack from '../stacks/HomeStack';
import SearchStack from '../stacks/SearchStack';
import ProfileStack from '../stacks/ProfileStack';
import TestingSpace from '../screens/Tabs/ProfilePage';
import CommunityTab from '../screens/Tabs/CommunityTab';
import colors from '../config/colors';
import CommuntityStack from '../stacks/CommunityStack'
import Button from '../components/Button';
import CreationModal from './CreationModal';
const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');

const AppNavigator = props => {

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{flex: 1}}>
    <Modal  visible={modalVisible} animationType="slide" transparent>
      <CreationModal setModalVisible={setModalVisible}/>
    </Modal>
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },
      }}>
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={'poll'}
              size={30}
              color={focused ? colors.secondary : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommuntityStack}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'account-group' : 'account-group-outline'}
              size={30}
              color={focused ? colors.secondary : 'black'}
              style={{}}
            />
          ),
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
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={30}
              color={focused ? colors.secondary : 'black'}
              style={{}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={30}
              color={focused ? colors.secondary : 'black'}
              style={{}}
            />
          ),
        }}
      />
    </Tab.Navigator>
    {modalVisible && <View style={{backgroundColor: '#00AAA9', opacity: 0.4, position: 'absolute', height, width}}/>}
    </View>
  );
};

export default AppNavigator;
