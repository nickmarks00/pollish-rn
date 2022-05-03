import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GetUserComms } from '../../api/comments';

const CommunityList = ({route, navigation}) => {

    const [communities, setCommunities] = React.useState()

    React.useEffect(() => {
        loadCommunities();
      }, []);

    const loadCommunities = async () => {
        const userComms = await GetUserComms(route.params.id);
        console.log(userComms);
        setCommunities(userComms);
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
export default CommunityList;