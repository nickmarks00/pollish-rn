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
        <PollView
            question={route.params.question_text}
            choices={route.params.choices}
        />
    )
}


export default PollViewSearch;