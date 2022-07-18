import * as React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal, FlatList} from 'react-native';
import {getUserComms} from 'endpoints/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { getCommunities } from '../../network/lib/pollish';
import ColoredButton from '../../components/coloredButton';
import colors from '../../config/colors';
import CreateCommunity from '../CreatePollScreens/CreateCommunity';
import { useNavigation } from '@react-navigation/native';
import CommunityCard from '../../components/communityCard';

const Tab = createMaterialTopTabNavigator();

const CommunityTab = ({route, navigation}) => {
  const {user, logOut} = useAuth();
  const [communities, setCommunities] = React.useState([]);
  const [allComms, setAllComms] = React.useState([]);
  const [create, setCreate] = React.useState(false);

  React.useEffect(() => {
    findCommunities();
    findAllCommunities();
  }, []);

  const findCommunities = async () => {
    const data = await getUserComms(user.id);
    console.log(data.data)
    setCommunities(data.data.results);
  };

  const findAllCommunities = async () => {
    const data =  await getCommunities();
    setAllComms(data.data.results)
  }

  const openModel = () => {
    setCreate(true);
  }

  const Community = () => {

    const navigation = useNavigation();

    return (
      <FlatList
        data={communities}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            <TouchableOpacity
            onPress={() => navigation.push('C_Community', {id: item.id})}>
            <CommunityCard comm={item}/>
          </TouchableOpacity>
          </View>
        )}
      />
    )
  };

  const CommunityBrowse = () => {
    return (
      <FlatList
        data={allComms}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            <TouchableOpacity
            onPress={() => navigation.push('C_Community', {id: item.id})}>
            <CommunityCard comm={item}/>
          </TouchableOpacity>
          </View>
        )}
      />
    )
  };

  return (
    <View style={{flex: 1}}>
      <Modal visible={create} animationType={'slide'}>
        <CreateCommunity setCommunity={setCreate}/>
      </Modal>
      <View style={{height: '10%'}} />
      <Text style={{textAlign: 'center'}}>Your Communities</Text>
      <View style={{padding: '5%'}}>
      <ColoredButton
          whenPressed={openModel}
          color={colors.secondary}
          text={'Create Community'}
        />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Following" component={Community} />
        <Tab.Screen name="Browse" component={CommunityBrowse} />
      </Tab.Navigator>
    </View>
  );
};

export default CommunityTab;
