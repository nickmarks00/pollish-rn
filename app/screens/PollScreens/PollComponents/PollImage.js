import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import { Post_Image, Media_Container, Media_DropShadow } from 'style/Poll_Style';
import {BASE_URL} from '@env';

/*
    * This Component renders the image seen at the head of a poll view
    ! Requires images from post be supplied to component
*/

const url = BASE_URL;

const PollImage = ({images}) => {
    return(
        <View style={Media_Container}>
                <ScrollView 
                horizontal={true}
                decelerationRate={0}
                snapToAlignment="lefts"
                snapToInterval={Dimensions.get('screen').width*0.9}
                showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', borderRadius: 30, zIndex: 2, flex: 1, marginVertical: '1%'}}>
                        {images.map((choice, index) => {
                            return (
                                <View key={index} style={Media_DropShadow}>
                                    <Image
                                    resizeMode='cover'
                                    source={{uri: `http://${url}${choice.image}`}}
                                    style={[Post_Image,{borderRadius: 30, borderWidth: 3, borderColor: '#ACACAC'}]}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
        </View>
    );
}

export default PollImage;