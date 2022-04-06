import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import { Filter_Button, Filter_Text, Modal_Container, Modal_Position } from 'style/Comments_Style';

const colors = ['#EF946C','#5ED1D0','#DC6BAD','#000','#CCC']

const FilterPopup = ({setModalVisible, modalVisible, post, SetFilter}) => {

    return(

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={Modal_Position}>
            <View style={Modal_Container}>
                <Text style={Filter_Text}>Choose Filter</Text>
                <TouchableOpacity onPress={() => SetFilter({idx: 4, txt: "No Filter", cid: 0})}>
                    <View style={[Filter_Button, { borderColor: '#CCC' }]}>
                        <Text style={{fontWeight: 'bold', color: '#CCC'}}>No Filter</Text>
                    </View>
                </TouchableOpacity>
                {post.choices.map((option, idx) => {
                    console.log(option.id)
                    return (
                        <TouchableOpacity key={idx} onPress={() => SetFilter({idx: idx, txt: option.choice_text, cid: option.id})}>
                            <View style={[Filter_Button, { borderColor: colors[idx] }]}>
                                <Text style={{fontWeight: 'bold', color: colors[idx]}}>{option.choice_text}</Text>
                            </View>
                        </TouchableOpacity>
                        );
                    })}
            </View>
            </View>
        </Modal>
    )
}

export default FilterPopup;