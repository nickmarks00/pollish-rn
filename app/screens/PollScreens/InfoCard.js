import React from 'react';
import { View, Text, Button, Modal, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

const InfoCard = ({setOpen, open}) => {
    return(
        <Modal visible={open} animationType={"slide"}>
            <View style={{width: dimensions.width, height: dimensions.height}}>
            <Text>hi</Text>
            <Text>hi</Text>
            <Text>10</Text>
            <Button title="Close" onPress={()=>setOpen(false)}/>
            </View>
        </Modal>
    )
}

export default InfoCard;