/**
    * * Component for rendering a single comment as it would appear in a comment section
    * TODO: Remove colors prop
*/

import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './styles';
import color from '../../../../config/colors';
import { getUser } from 'endpoints/core';
import { deleteComment } from 'endpoints/pollish';

const { height, width } = Dimensions.get('window');

/*
    * profileScreen: name of the profile screen in the stack (string)
    * colors: assignment of each color to a choice id (array)
    * comment: comment element loaded from backend (comment structure)
*/


const Comment = ({profileScreen, colors, comment, pid, reloadComments, choices}) => {

    const navigation = useNavigation();

    const [noProfilePic, setError] = React.useState(true);
    const [oUser, setUser] = React.useState("");
    const {user, logout} = useAuth();
    const [showBox, setShowBox] = React.useState(true);
    const [choiceText, setChoiceText] = React.useState('')


    React.useEffect(() => {
        findUser()
        findChoice()
        console.log(choices)
    }, []);

    const findChoice = async () => {
        choices.map((option, idx) => {
            if(option.id == comment.choice_id)
                setChoiceText(option.choice_text)
        })
    }

    const findUser = async () => {
        getUser(comment.user_id).then(function(response){
            setUser(response.data);
        })
        console.log(comment)
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
        <TouchableOpacity onLongPress={() => { if (comment.user_id == user.id) showConfirmDialog()}} 
            style={{borderRadius: width*0.026, width: width*0.9, backgroundColor: '#F8F8F8', borderColor: '#EEEEEE', borderWidth: 1, overflow: 'hidden'}}>
            <View style={{flexDirection: 'row', padding: width*0.026, borderColor: '#EEE', borderBottomWidth: 1}}>
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
            <View style={{paddingHorizontal: width*0.026}}>
                <Text style={{fontWeight: 'bold', fontSize: 12}}>{oUser.username}</Text>
                <View style={{height: height*0.005}}/>
                <Text style={{fontSize: 12, paddingRight: '5%', flexWrap: 'wrap'}}>{comment.comment_text}</Text>

            </View>
            </View>
            <View style={{flex: 1}}/>
            <View style={{height: height*0.03, width: '100%', backgroundColor: 'white', paddingHorizontal: width*0.026, justifyContent: 'center'}}>
                <Text style={{fontSize: 12, color: '#7A7A7A'}}>{choiceText}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default Comment;