import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getUserComms } from 'endpoints/core';

/**
 * * Show list of communities (requires: id, CommunityScreen)
 * @param id - The id of the user whom follows the communities
 * @param CommunityScreen - The name of community stack screen to navigate to
*/

const UserCommunities = ({route, navigation}) => {

    const [communities, setCommunities] = React.useState()

    React.useEffect(() => {
        loadCommunities();
      }, []);

    const loadCommunities = async () => {
        const userComms = await getUserComms(route.params.id);
        setCommunities(userComms.data);
    }

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {communities?.map((comm, idx) => {
                return(
                    <TouchableOpacity key={idx} onPress={() => navigation.push(route.params.communityScreen, {id: comm.id})}>
                        <Text>{comm.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default UserCommunities;