{/*
    Component for creating a comment. Type text input and submit to be added to a given post.
*/}

import React from 'react'
import {View, TextInput, StyleSheet, Button, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');

const CreateComment = () => {

    const [text, onChangeText] = React.useState("");

    // Function for adding new comment
    function handleComment(){
        const newlist = comments.concat({'item': text, 'idx': uuid.v4()})
        addComment(newlist);
    }

    return (
        <View style ={{ justifyContent: 'flex-end', padding: 10, flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
            style={styles.comment_input}
            onChangeText={onChangeText}
            value={text}
            placeholder="What do you want to know?"
            />
            <Button
            onPress={handleComment}
            title="Post"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}

export default CreateComment;


const styles = StyleSheet.create({
    comment_input: {
        height: 40,
        width: dimensions.width/1.3,
        margin: 12,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#BBB',
        padding: 10,
      },
})