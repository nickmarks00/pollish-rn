import * as React from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
// @ts-ignore
import {getUserComms} from 'endpoints/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getCommunities} from '../../network/lib/pollish';
import {useNavigation} from '@react-navigation/native';
import CommunityCard from 'components/CommunityCard';
import {NavProps, SCREEN_NAMES} from '../../constants/keys';

const Tab = createMaterialTopTabNavigator();

const CommunityTab = () => {
  const navigation = useNavigation<NavProps>();
  // @ts-ignore
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
    setCommunities(data.data.results);
  };

  const findAllCommunities = async () => {
    const data = await getCommunities();
    setAllComms(data.data.results);
  };

  const openModel = () => {
    setCreate(true);
  };

  const Community = () => {
    return (
      <FlatList
        data={communities}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() =>
                navigation.push(SCREEN_NAMES.COMMUNITY, {
                  comm: item,
                })
              }>
              <CommunityCard comm={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  const CommunityBrowse = () => {
    return (
      <FlatList
        data={allComms}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() =>
                navigation.push(SCREEN_NAMES.COMMUNITY, {
                  comm: item,
                })
              }>
              <CommunityCard comm={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Modal visible={create} animationType={'slide'}></Modal>
      <View style={{height: '10%'}} />
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 17,
          color: '#0FA3B1',
        }}>
        Your Communities
      </Text>
      <View style={{padding: '2%'}}></View>
      <Tab.Navigator>
        <Tab.Screen name="Following" component={Community} />
        <Tab.Screen name="Browse" component={CommunityBrowse} />
      </Tab.Navigator>
    </View>
  );
};

export default CommunityTab;
