import React from 'react';
import { View, TouchableOpacity, Image, Dimensions, Text } from 'react-native';

const {height, width} = Dimensions.get('screen');

const Poll = ({poll, navToPoll}) => {

    const [error, setError] = React.useState(false);
    
    return(
    <TouchableOpacity onPress={() => navToPoll(poll.id)} style={{
        height: '100%', overflow: 'hidden', alignItems: 'center', borderTopLeftRadius: width*0.05, borderTopRightRadius: width*0.05, width: width*0.7, backgroundColor: 'white'
      }}>
        {poll.images.length == 0 || error ? 
            <View style={{height: '80%', width: '100%', backgroundColor: 'red'}}/>
            :
            <View style={{height: '80%', width: '100%'}}>
                <Image 
                    source={{uri: poll.images[0].image}} style={{flex: 1, resizeMode: 'cover'}}
                    onError={() => setError(true)}
                />
            </View>
        }
        
        <View style={{justifyContent: 'center', alignItems: 'center', height: '20%', width: '100%', borderRightWidth: 0.5, borderLeftWidth: 0.5, borderColor: '#DEDEDE'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold', width: '90%'}} numberOfLines={2}>
            {poll.question_text}
          </Text>
        </View>

    </TouchableOpacity>
    )
}

export default Poll;