import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';

const dimensions = Dimensions.get("screen");

const PollView = (props) => {
    return (
        <View
            style={{
                width: dimensions.width,
                height: dimensions.height
            
        }}>
        <Image 
            source={require('./lebron.jpg')}
            style={{

                width: dimensions.width,
                height: dimensions.width/1.1,
                alignContent: 'center'
            }}  
        />
        <Text
            style={{
                fontFamily: 'System',
                textAlign: 'center',
                fontWeight: 'bold',
                marginVertical: 15
        }}>
            {props.question}
        </Text>
        <View
            style ={{
                marginVertical: 15
            }}>
            {props.choices.map((choice, id) => {
                return <Text key={id}
                            style={{
                                textAlign: 'center',
                                padding: 20,
                                borderWidth: 3,
                                margin: 5      
                        }}>
                        {choice.choice_text}
                        </Text>;
            })}
        </View>
        </View>
    )
}

export default PollView;