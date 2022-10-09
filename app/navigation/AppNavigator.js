import React from 'react';
import { Modal, View, Dimensions, Text, TouchableOpacity, TextInput } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Feather, Ionicons, MaterialIcons} from '@expo/vector-icons';

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
        component={CommuntityStack}
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
        component={CommuntityStack}
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
