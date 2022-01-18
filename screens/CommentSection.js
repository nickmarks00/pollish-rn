import React, {useState, useEffect} from 'react';
import {TouchableHighlight, View, Text, Dimensions, TextInput, Image, StyleSheet, Button, ScrollView, FlatList} from 'react-native';
import uuid from 'react-native-uuid'

const dimensions = Dimensions.get("screen");

const CommentSection = (props) => {

    const [text, onChangeText] = React.useState("");
    const [comments, addComment] = React.useState([]);

    function handleComment(){
        const newlist = comments.concat({'item': text, 'idx': uuid.v4()})
        addComment(newlist);
    }

    const renderItem = ({ item }) => (
        <View style={{
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
            marginVertical: 8,
            }}>
            <Text style ={{
                marginHorizontal: 5
            }}>
                {item.item}
            </Text>
        </View>
    )

    return (
        <View style ={{flex: 1}}>
            <View style={{
                height: dimensions.height*0.1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <TouchableHighlight><Text>hi</Text></TouchableHighlight>
                <Text>hi</Text>
                <Text>hi</Text>
            </View>
            <View style ={{
                flex: 1
            }}>
                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={comment => comment.idx}
                />
                
            </View>
            <View style ={{
                justifyContent: 'flex-end',
                marginBottom: 36
            }}>
                <TextInput
                style={styles.input}
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
    </View>
        )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default CommentSection;