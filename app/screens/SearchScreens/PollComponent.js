import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Dimensions, Button, ScrollView, Image, Text} from 'react-native';
import {BASE_IP} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useNavigation } from '@react-navigation/native';
import SearchPollView from './SearchPollView';
import { SearchBar } from 'react-native-paper';

const PollComponent = ({post}) => {
const [image, setImage] = useState(null)
useEffect(() => {
    setImage(post);
  }, []);
return (
        <Text>{image ? image.image : 'hi'}</Text>
    
)
    }

    export default PollComponent;