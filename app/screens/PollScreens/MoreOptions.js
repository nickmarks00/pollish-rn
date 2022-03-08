import React from 'react';
import { More_Options } from 'style/Poll_Style';
import { Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MoreOptions = (props) => {

      // Function for adding new comment
  const Post_Comment = () => {

    fetch("http://192.168.1.140:8000/pollish/polls/", {
            method: "POST",
            headers: { Accept: "application/json", 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question_text: "hi",
            })
            }).then(() => {
                console.log(JSON.stringify({question_text: "hi"}))
            })
}

    const navigation = useNavigation();
    return(
    <View style={More_Options}>
                <Button title="More Stats" onPress={Post_Comment}/>        
                <Text>Report</Text>
                <Button
                  title="Comments"
                  onPress={() =>
                    navigation.navigate('Comments', { img: props.post.images[0].image_src, question: props.post.question_text, options_: props.post.choices, uid: props.post.user.id, pid: props.post.id})
                  }
                  />
    </View>
    );
}

export default MoreOptions;