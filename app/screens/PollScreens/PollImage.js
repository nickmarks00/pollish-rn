import React from 'react';
import { View, ScrollView, Image, Dimensions, Text } from 'react-native';
import { Post_Image } from 'style/Poll_Style';

{/*
    This Component renders the image seen at the head of a poll view
*/}

const PollImage = (props) => {
    return(
        <View style={{alignItems: 'center', flex: 1}}>
                <ScrollView 
                horizontal={true}
                decelerationRate={0}
                snapToAlignment="lefts"
                snapToInterval={Dimensions.get('screen').width}
                showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        {props.images.map((choice, index) => {
                            return (
                                    <Image
                                    key={index}
                                    source={{uri: "https://" + choice.image.slice(34)}}
                                    style={Post_Image}
                                    />
                            )
                        })}
                    </View>
                </ScrollView>
        </View>
    );
}

export default PollImage;