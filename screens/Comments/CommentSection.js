{/*
    Component for rendering the entire comment section.
*/}

import React from 'react';
import {View, Text, FlatList, KeyboardAvoidingView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Comment from './Comment';
import PostInformation from './CommentSection/PostDetails/PostInformation';
import PostOptions from './CommentSection/PostDetails/PostOptions';
import CreateComment from './CommentSection/CreateComment';

const CommentSection = () => {

    const route = useRoute();
    const [comments, addComment] = React.useState([]);


    // Load fonts
    let [fontsLoaded] = useFonts({
        'SFRound': require('../../assets/fonts/SFRoundBold.ttf'),
      });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style ={{flex: 1}}>

            {/* Top Section (Contains details about post) */}
            <View style={{ borderBottomWidth: 2 }}>

                {/* Container with post image and question */}
                <PostInformation/>

                {/* Container with post options */}
                <PostOptions choices={route.params.options_}/>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior="padding"
                keyboardVerticalOffset={75}
            >
                {/* Section where comments are rendered */}
                <View style ={{ flex: 1 }}>
                    <FlatList
                        data={comments}
                        renderItem={Comment}
                        keyExtractor={comment => comment.idx}
                    />
                </View>

                {/* Section to type and post comments*/}
                <CreateComment/>

            </KeyboardAvoidingView>
        </View>
    )
}

export default CommentSection;