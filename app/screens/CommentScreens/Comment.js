{/*
    Component for rendering a single comment as it would appear in a comment section
*/}


import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';

const dimension = Dimensions.get('screen');

const Comment = (props) => (
    <View style={{ flexDirection: 'row', marginVertical: 5}}>
        <View style={{marginHorizontal: dimension.width/50, width: dimension.width/90, borderRadius: dimension.width/30, backgroundColor: '#ED3030'}}/>
        <Image style={{aspectRatio: 1, borderRadius: 1000}} source={{uri: 'https://www.gannett-cdn.com/presto/2020/07/21/USAT/86dfdd2f-db14-4a9f-8137-24536a574d3c-AP_Election_2020_Kanye_West.jpg?crop=4159,2339,x0,y0&width=3200&height=1800&format=pjpg&auto=webp'}}/>
        <View style={{paddingHorizontal: 8}}>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
                
                <Text style={{fontSize: 12, marginLeft: dimension.width/50, fontWeight: 'bold'}}>nmarks00</Text>
            </View>
            <Text style={{textAlign: 'left', fontSize: 12, marginLeft: dimension.width/50}}>{props.comment_text}</Text>
        </View>
    </View>
)

export default Comment;