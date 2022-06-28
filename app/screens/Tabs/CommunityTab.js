import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getUserComms} from 'endpoints/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const CommunityTab = ({route, navigation}) => {
  const {user, logOut} = useAuth();
  const [communities, setCommunities] = React.useState([]);

  React.useEffect(() => {
    findCommunities();
  }, []);

  const findCommunities = async () => {
    const data = await getUserComms(user.id);
    setCommunities(data.data);
  };

  const Community = () => {
    return communities?.map((comm, idx) => {
      console.log(comm.length);
      return (
        <TouchableOpacity
          key={idx}
          onPress={() => navigation.push('C_Community', {id: comm.id})}>
          <Text>{comm.name}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: '10%'}} />
      <Text style={{textAlign: 'center'}}>Your Communities</Text>
      <Tab.Navigator>
        <Tab.Screen name="Following" component={Community} />
        <Tab.Screen name="Browse" component={Community} />
      </Tab.Navigator>
    </View>
  );
};

export default CommunityTab;
