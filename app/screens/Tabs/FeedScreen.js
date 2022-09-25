import * as React from 'react';
import { View, Modal, Text, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';

const dimensions = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const FeedScreen = () => {

    const [create, setCreate] = React.useState(false);
    const [showCreate, setShown] = React.useState(true)
    const [focus, setFocus] = React.useState(0);
    const [nav, setNav] = React.useState(1);

    const openModel = () => {
        setCreate(true);
      };

    const hideHeader = (offset) => {
        if(offset < 60)
            setShown(true)
        else
            setShown(false)
        
    }

    const changeNav = (num) => {
        console.log(num)
        console.log('h')
        setNav(num)
    }

    

    return (
        <View style={{flex: 1}}>
      <View style={{height: Constants.statusBarHeight}}/>
      <View style={{height: dimensions.height*0.014}}/>

      {/* Tab Navigation */}
      <View style={{height: dimensions.height*0.047, justifyContent: 'center', flexDirection: 'row'}}>
        <View style={{height: '100%', width: '35%', borderWidth: 1, borderColor: '#00AAA9', borderRadius: 1000, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#00AAA9'}}>My Feed</Text>
        </View>
        <View style={{width: '4%'}}/>
        <View style={{height: '100%', width: '35%', borderWidth: 0, borderRadius: 1000, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#8F8F8F'}}>Browse</Text>
        </View>
      </View>

      <View style={{height: dimensions.height*0.014}}></View>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {height: dimensions.height*0},
              })}
        >
            <Tab.Screen name="My Feed" children={()=><HomeScreen curate={true} hideHeader={hideHeader} setNav={changeNav}/>} />
            <Tab.Screen name="-----" children={()=><HomeScreen curate={false} hideHeader={hideHeader}/>} />
        </Tab.Navigator>
        </View>
    )
}

export default FeedScreen;