/**
    * * Component for rendering a single comment as it would appear in a comment section
    * TODO: Remove colors prop
*/

import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './styles';
import color from '../../config/colors';
import { getUser } from 'endpoints/core';

/*
    * profileScreen: name of the profile screen in the stack (string)
    * colors: assignment of each color to a choice id (array)
    * comment: comment element loaded from backend (comment structure)
*/


const Comment = ({profileScreen, colors, comment}) => {

    const navigation = useNavigation();

    const [noProfilePic, setError] = React.useState(true);
    const [user, setUser] = React.useState("");

    React.useEffect(() => {
        findUser()
    }, []);

    const findUser = async () => {
        getUser(comment.user_id).then(function(response){
            setUser(response.data);
        })
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
                style ={Styles.button} 
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
                <Text style={Styles.content}><Text style={Styles.username}>{user.username}{' '}</Text>
                    {comment.comment_text}
                </Text>
            </View>
        </View>
    )
}

export default Comment;