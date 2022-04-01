import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import { Filter_Button, Filter_Container, Filter_Background } from 'style/Comments_Style';

const colors = ['#ED3030','#EBAC1F','#309EED']

const FilterBar = ({setModalVisible, selected}) => {
    return(
        <View style={Filter_Container}>
            <View style={Filter_Background}/>
            <Text style={{color: '#AAA', fontWeight: 'bold'}}>Filtering:</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[Filter_Button, {backgroundColor: 'white', borderColor: colors[selected.idx], borderWidth: 1}]}>
                    <Text style={{fontWeight: 'bold', color: colors[selected.idx]}}>{selected.txt}</Text>            
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FilterBar;