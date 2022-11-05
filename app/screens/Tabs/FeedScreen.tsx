import * as React from 'react';
import {View, Modal, Text, Dimensions} from 'react-native';
import Constants from 'expo-constants';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
import IconButton from '../../components/IconButton';
import {NavProps, SCREEN_NAMES} from '../../constants/keys';
import {useNavigation} from '@react-navigation/native';

const dimensions = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const FeedScreen = () => {
  const navigation = useNavigation<NavProps>();

  const navToNotifications = () => {
    navigation.push(SCREEN_NAMES.NOTIFICATIONS);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: Constants.statusBarHeight}} />
      <View style={{height: dimensions.height * 0.014}} />

      {/* Tab Navigation */}
      <View
        style={{
          paddingLeft: dimensions.width * 0.03,
          paddingRight: dimensions.width * 0.05,
          height: dimensions.height * 0.042,
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: dimensions.height * 0.042,
            width: dimensions.width * 0.69,
            borderColor: '#D9D9D9',
            borderWidth: 1,
            borderRadius: dimensions.height * 0.012,
            overflow: 'hidden',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: dimensions.width * 0.34,
              height: '100%',
              backgroundColor: '#66CCCB',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: dimensions.height * 0.012,
              borderBottomRightRadius: dimensions.height * 0.012,
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              My Feed
            </Text>
          </View>
          <View
            style={{
              width: dimensions.width * 0.345,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: dimensions.height * 0.012,
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#8F8F8F'}}>
              Browse
            </Text>
          </View>
        </View>
        <View style={{flex: 1}} />
        <IconButton
          action={navToNotifications}
          name={'notifications-outline'}
          style={{borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 1000}}
        />
      </View>
      {/* <View style={{height: dimensions.height*0.047, justifyContent: 'center', flexDirection: 'row'}}>
        <View style={{height: '100%', width: '35%', borderWidth: 1, borderColor: '#00AAA9', borderRadius: 1000, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#00AAA9'}}>My Feed</Text>
        </View>
        <View style={{width: '4%'}}/>
        <View style={{height: '100%', width: '35%', borderWidth: 0, borderRadius: 1000, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#8F8F8F'}}>Browse</Text>
        </View>
      </View> */}

      <View style={{height: dimensions.height * 0.01}}></View>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {height: dimensions.height * 0},
        })}>
        <Tab.Screen
          name="My Feed"
          children={() => <HomeScreen curate={true} />}
        />
        <Tab.Screen
          name="-----"
          children={() => <HomeScreen curate={false} />}
        />
      </Tab.Navigator>
    </View>
  );
};

export default FeedScreen;
