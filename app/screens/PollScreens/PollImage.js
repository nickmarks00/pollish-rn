import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Post_Image } from 'style/Poll_Style';

const dimensions = Dimensions.get('screen');

const PollImage = (props) => {
    return(
        <View style={{alignItems: 'center', flex: 1}}>
                <ScrollView 
                horizontal={true}
                decelerationRate={0}
                snapToAlignment="lefts"
                snapToInterval={dimensions.width}
                showsVerticalScrollIndicator={false}>
                    <View  style={{flexDirection: 'row'}}>
                        {props.images.map((choice, index) => {
                            return (
                                <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    navigation.navigate('FullScreen')
                                }
                                >
                                    <Image
                                    source={{uri: "https://" + choice.image_src.slice(34)}}
                                    style={Post_Image}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
        </View>
    );
}

export default PollImage;