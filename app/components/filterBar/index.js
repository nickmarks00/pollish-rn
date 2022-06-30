import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import Styles from './styles';

const colors = ['#EF946C','#5ED1D0','#DC6BAD','#000','#CCC']

/*
    * setModalVisible: should the popup of filters be shown (bool)
    * selected: which filter option has been selected (array: text, idx, cid)
*/

const FilterBar = ({setModalVisible, selected}) => {
    return(
        <View style={Styles.container}>
            <View style={Styles.background}/>
            <Text style={{color: '#AAA', fontWeight: 'bold'}}>Filtering:</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[Styles.button, {backgroundColor: 'white', borderColor: colors[selected.idx], borderWidth: 1}]}>
                    <Text style={{fontWeight: 'bold', color: colors[selected.idx]}}>{selected.txt}</Text>            
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FilterBar;