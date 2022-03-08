import React from 'react';
import { View, Text, Button } from 'react-native';

const InfoCard = () => {
    <View style={{flex: 1}}>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>{props.votes}</Text>
          <Button title="Close" onPress={()=>setOpen(false)}/>
    </View>
}

export default InfoCard;