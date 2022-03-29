import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Option_Buttons, Option_Text } from '../Styling/Create_Style';

const dimensions = Dimensions.get("window");
const CreateBar = (props, {setSection}) => {
    return(
        <View>
            <View style={{position: 'absolute', width: dimensions.width, marginTop: dimensions.width/36, height: dimensions.width/18, backgroundColor: 'rgba(31, 113, 235, 0.1)'}}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: dimensions.width}}>
                
                <View style={{width: dimensions.width/7, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => props.setSection(0)}>
                    <View style={[Option_Buttons, {alignItems: 'center', justifyContent: 'center', backgroundColor: props.background}]}>
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: props.color}}>?</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style={Option_Text}>QUESTION</Text>
                </View>
                <View style={{width: dimensions.width/7, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => props.setSection(1)}>
                        <View style={Option_Buttons}/>
                    </TouchableOpacity>
                    <Text style={Option_Text}>CHOICES</Text>
                </View>
                <View style={{width: dimensions.width/7, alignItems: 'center'}}>
                    <View style={Option_Buttons}/>
                    <Text style={Option_Text}>IMAGES</Text>
                </View>
                <View style={{width: dimensions.width/7, alignItems: 'center'}}>
                    <View style={Option_Buttons}/>
                    <Text style={Option_Text}>SETTINGS</Text>
                </View>
            </View>
            </View>
    );
}

export default CreateBar;