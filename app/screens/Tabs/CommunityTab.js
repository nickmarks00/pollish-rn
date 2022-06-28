import * as React from 'react';
import {View, Text} from 'react-native';
import {getUserComms} from 'endpoints/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const CommunityTab = () => {
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
      return <Text key={idx}>{comm.name}</Text>;
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
