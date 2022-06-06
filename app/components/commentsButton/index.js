import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const CommentsButton = ({navigateComments}) => {
    return (
        <TouchableOpacity onPress={() => navigateComments()} style={{position: 'absolute', justifyContent: 'center', right: '8%'}}>
            <MaterialCommunityIcons
                name={"comment-text-outline"}
                size={30}
                color={'black'}
                style={{borderTopWidth: 1, borderTopColor: 'red', justifyContent: 'center'}}
            />
        </TouchableOpacity>
    )
}

export default CommentsButton;