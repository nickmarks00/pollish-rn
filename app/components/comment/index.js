/**
    * * Component for rendering a single comment as it would appear in a comment section
    * TODO: Remove colors prop
*/

import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './styles';
import color from '../../config/colors';
import { getUser } from 'endpoints/core';
import { deleteComment } from 'endpoints/pollish';

/*
    * profileScreen: name of the profile screen in the stack (string)
    * colors: assignment of each color to a choice id (array)
    * comment: comment element loaded from backend (comment structure)
*/


const Comment = ({profileScreen, colors, comment, pid, reloadComments}) => {

    const navigation = useNavigation();

    const [noProfilePic, setError] = React.useState(true);
    const [oUser, setUser] = React.useState("");
    const {user, logout} = useAuth();
    const [showBox, setShowBox] = React.useState(true);

    console.log(comment)

    React.useEffect(() => {
        findUser()
    }, []);

    const findUser = async () => {
        getUser(comment.user_id).then(function(response){
            setUser(response.data);
        })
    }

    const removeComment = async () => {
        await deleteComment(pid, comment.id)
        reloadComments();
    }

    const FindColor = () => {

        if (colors.red == comment.choice_id) return color.optionColor1
        if (colors.yellow == comment.choice_id) return color.optionColor2
        if (colors.blue == comment.choice_id) return color.optionColor3
        if (colors.black == comment.choice_id) return color.optionColor4

        return color.gray
    }
    
    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to delete this comment?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                setShowBox(false);
                removeComment()
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

    return(
        <TouchableOpacity onLongPress={() => { if (comment.user_id == user.id) showConfirmDialog()}} style={Styles.container}>
            <View style={[Styles.colorbar, {backgroundColor: FindColor()}]}/>
            <TouchableOpacity 
                style ={Styles.button} 
                onPress={() => navigation.push(profileScreen, {user: oUser})}
            >
                {(oUser && noProfilePic) ?
                    <Image style={{aspectRatio: 1, borderRadius: 1000}} source={{uri: oUser.profile.avatar}} onError={() => setError(false)}/>
                :
                oUser ?
                    <View style={Styles.noProfileContainer}>
                        <Text style={Styles.noProfileInitial}>
                            {oUser.username.slice(0,1).toUpperCase()}
                        </Text>
                    </View>
                :
                    <View/>
                }
            </TouchableOpacity>
            <View style={{paddingHorizontal: '2%'}}>
                <Text style={Styles.content}><Text style={Styles.username}>{oUser.username}{' '}</Text>
                    {comment.comment_text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Comment;