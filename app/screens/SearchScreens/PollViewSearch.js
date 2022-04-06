import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, Button, Animated} from 'react-native';
import {BASE_IP} from '@env';
import { useRoute } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import PollView from '../PollScreens/PollView';

const dimensions = Dimensions.get('screen');

const PollViewSearch = () => {

    const route = useRoute();

    return(
        <View>
        <View style={{height: 50, borderBottomWidth: 2, borderColor: '#00A6A6'}}/>
        <PollView
            post={route.params.post}
            question={route.params.post.question_text}
            choices={route.params.post.choices}
        />
        </View>
    )
}


export default PollViewSearch;