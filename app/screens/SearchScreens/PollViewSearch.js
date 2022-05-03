import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, StyleSheet, Button, Animated} from 'react-native';
import {BASE_IP} from '@env';
import { useRoute } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import PollView from '../PollScreens/PollView';
import { GetPoll } from '../../api/comments';

const dimensions = Dimensions.get('screen');

const PollViewSearch = ({}) => {

    const route = useRoute();

    const [poll, setPoll] = useState();

    useEffect(() => {
        loadPoll();
    }, []);

    const loadPoll = async () => {
        const p = await GetPoll(route.params.id);
        console.log('poll -------------' + p.user_id)
        setPoll(p); 
    }

    return(
        <View>
            { poll && 
                <PollView
                    post={poll}
                    commentsScreen={route.params.commentsScreen}
                    profileScreen={route.params.profileScreen}
                />
            }
        </View>
    )
}


export default PollViewSearch;