import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
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
                                    source={{uri: "https://www.gannett-cdn.com/presto/2020/07/21/USAT/86dfdd2f-db14-4a9f-8137-24536a574d3c-AP_Election_2020_Kanye_West.jpg?crop=4159,2339,x0,y0&width=3200&height=1800&format=pjpg&auto=webp"}}
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