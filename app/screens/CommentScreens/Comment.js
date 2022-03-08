{/*
    Component for rendering a single comment as it would appear in a comment section
*/}


import React from 'react';
import {View, Text} from 'react-native';

const Comment = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
        <View style={{width: 20}}></View>
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
    </View>
)

export default Comment;