import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// @ts-ignore
import {getUserComms} from 'endpoints/core';
import CommunityCard from 'components/CommunityCard';
import {NavProps, RootStackParams, SCREEN_NAMES} from '../../constants/keys';
import {useNavigation} from '@react-navigation/native';

/**
 * * Show list of communities (requires: id, CommunityScreen)
 * @param id - The id of the user whom follows the communities
 */
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type UserFocusProps = NativeStackScreenProps<RootStackParams, 'UserFocus'>;

const UserCommunities = ({route}: UserFocusProps) => {
  const navigation = useNavigation<NavProps>();
  const [communities, setCommunities] = React.useState([]);

  React.useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    const userComms = await getUserComms(route.params.id);
    setCommunities(userComms.data.results);
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {communities?.map((comm, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            onPress={() =>
              navigation.push(SCREEN_NAMES.COMMUNITY, {
                comm: comm,
              })
            }>
            <CommunityCard comm={comm} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default UserCommunities;
