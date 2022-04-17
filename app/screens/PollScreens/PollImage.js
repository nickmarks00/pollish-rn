import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import { Post_Image } from 'style/Poll_Style';
import {BASE_URL} from '@env';
import { PrimaryPollish } from '../Styling/App_Styles';

{/*
    This Component renders the image seen at the head of a poll view
*/}

const url = BASE_URL;

const PollImage = (props) => {
    return(
        <View style={{alignItems: 'center', flex: 1, marginHorizontal: Dimensions.get('screen').width*0.05, paddingVertical: '2%'}}>
                <ScrollView 
                horizontal={true}
                decelerationRate={0}
                snapToAlignment="lefts"
                snapToInterval={Dimensions.get('screen').width*0.9}
                showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', borderRadius: 30, zIndex: 2, flex: 1, marginVertical: '1%'}}>
                        {props.images.map((choice, index) => {
                            return (
                                <View key={index} style={{flex: 1, shadowOffset: {
                                    width: 0,
                                    height: 2
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 1,
                                    elevation: 5}}>
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
                {/* <View style={{width: Dimensions.get('screen').width, height: '70%', position: 'absolute', backgroundColor: "#CCC", zIndex: -1, top: '18%', shadowOffset: {
                                    width: 0,
                                    height: 2
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 1,
                                    elevation: 5}}/> */}
        </View>
    );
}

export default PollImage;