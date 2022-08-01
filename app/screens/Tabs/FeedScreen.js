import * as React from 'react';
import { View, Modal } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
import colors from '../../config/colors';
import ColoredButton from '../../components/coloredButton';
import CreatePoll from '../CreatePollScreens/CreatePoll';
import UserFeed from '../UserFeed';


const Tab = createMaterialTopTabNavigator();

const FeedScreen = () => {

    const [create, setCreate] = React.useState(false);
    const [showCreate, setShown] = React.useState(true)

    const openModel = () => {
        setCreate(true);
      };

    const hideHeader = (offset) => {
        if(offset < 60)
            setShown(true)
        else
            setShown(false)
        
    }

    const CreationScreen = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', marginHorizontal: '5%'}}>
                <ColoredButton
                    whenPressed={openModel}
                    color={colors.secondary}
                    text={'Create Poll'}
                />
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
        <Modal visible={create} animationType={'slide'}>
        <CreatePoll setPoll={setCreate} />
      </Modal>
      <View style={{height: '5%'}}/>
        <Tab.Navigator>
            <Tab.Screen name="My Polls" children={()=><UserFeed hideHeader={hideHeader}/>} />
            <Tab.Screen name="Browse" children={()=><HomeScreen hideHeader={hideHeader}/>} />
            <Tab.Screen name="Create" children={()=><CreationScreen hideHeader={hideHeader}/>} />
        </Tab.Navigator>
        </View>
    )
}

export default FeedScreen;