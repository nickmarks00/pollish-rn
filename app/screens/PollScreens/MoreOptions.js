import React from 'react';
import { More_Options } from 'style/Poll_Style';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import arrow from '../../assets/arrow.png';
import { Nav_Text } from 'style/Poll_Style';

const dimensions = Dimensions.get('window');

const MoreOptions = (props) => {

    const navigation = useNavigation();
    return(
    <View style={More_Options}>
                <TouchableOpacity onPress={console.log("hi")} style={{position: 'absolute', flexDirection: 'row', left: dimensions.width*0.08}}>
                  <Image source={arrow} style={{
                    transform: [{rotate: '180deg'}],
                    width: dimensions.width/30,
                    height: null,
                    resizeMode: 'contain'
                  }}/>
                  <Text style={[{paddingLeft: '2%'}, Nav_Text]}>MORE INFO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Comments', { post: props.post})
                  } style={{position: 'absolute', flexDirection: 'row', right: dimensions.width*0.08}}>
                  <Text style={[{paddingRight: '2%'}, Nav_Text]}>COMMENTS</Text>
                  <Image source={arrow} style={{ 
                    width: dimensions.width/30,
                    height: null,
                    resizeMode: 'contain',
                  }}/>
                </TouchableOpacity>    
    </View>
    );
}

export default MoreOptions;