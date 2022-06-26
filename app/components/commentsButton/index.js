import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Styles from './styles';


const CommentsButton = ({navigateComments}) => {
    return (
        <TouchableOpacity onPress={() => navigateComments()} style={Styles.container}>
            <MaterialCommunityIcons
                name={"comment-text-outline"}
                size={30}
                color={'black'}
            />
        </TouchableOpacity>
    )
}

export default CommentsButton;