import React from 'react';
import { View, Image, Text } from 'react-native';
import Styles from './styles';


const CommunityCard = ({comm}) => {

    const [noProfilePic, setError] = React.useState(false);

    return (
        <View style={Styles.container}>
            { (!noProfilePic)  ? 
                <Image source={{uri: `http://thisiswrong.com`}} style={Styles.pollImage} onError={()=> setError(true)}/> 
            :
                <View style={Styles.noImage}>
                    <Text style={Styles.noImageText}>{comm.name.slice(0,1)}</Text>
                </View>
            }

            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={Styles.questionText}>{comm.name}</Text>
                <View style={{height: '5%'}}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={Styles.votesText}>{comm.num_polls} Polls</Text>
                    <Text style={Styles.votesText}>{comm.num_users} Users</Text>
                </View>
            </View>
        </View>
    )
}
export default CommunityCard;