/**
    * * Component for rendering a single comment as it would appear in a comment section
    * TODO: Remove colors prop
*/

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { GetUser } from '../../api/comments';
import { useNavigation } from '@react-navigation/native';
import Styles from './styles';
import color from '../../config/colors';


const Comment = ({profileScreen, colors, comment}) => {

    const navigation = useNavigation();

    const [noProfilePic, setError] = React.useState(true);
    const [user, setUser] = React.useState("");

    React.useEffect(() => {
        findUser()
    }, []);

    const findUser = async () => {
        const user = await GetUser(comment.user_id);
        setUser(user);
    }

    const FindColor = () => {

        if (colors.red == comment.choice_id) return color.optionColor1
        if (colors.yellow == comment.choice_id) return color.optionColor2
        if (colors.blue == comment.choice_id) return color.optionColor3
        if (colors.black == comment.choice_id) return color.optionColor4

        return color.gray
    }

    return(
        <View style={Styles.container}>
            <View style={[Styles.colorbar, {backgroundColor: FindColor()}]}/>
            <TouchableOpacity 
                style ={{aspectRatio: 1}} 
                onPress={() => navigation.push(profileScreen, {user: user})}
            >
                {(user && noProfilePic) ?
                    <Image style={{aspectRatio: 1, borderRadius: 1000}} source={{uri: user.profile.avatar}} onError={() => setError(false)}/>
                :
                user ?
                    <View style={Styles.noProfileContainer}>
                        <Text style={Styles.noProfileInitial}>
                            {user.username.slice(0,1).toUpperCase()}
                        </Text>
                    </View>
                :
                    <View/>
                }
            </TouchableOpacity>
            <View style={{paddingHorizontal: '2%'}}>
                <Text style={Styles.username}>{user.username}</Text>
                <Text style={Styles.content}>{comment.comment_text}</Text>
            </View>
        </View>
    )
}

export default Comment;