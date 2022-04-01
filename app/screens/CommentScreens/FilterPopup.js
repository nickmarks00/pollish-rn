import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import { Filter_Button, Filter_Text, Modal_Container, Modal_Position } from 'style/Comments_Style';

const colors = ['#ED3030','#EBAC1F','#309EED']

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
                {post.choices.map((option, idx) => {
                    return (
                        <TouchableOpacity key={idx} onPress={() => SetFilter({idx: idx, txt: option.choice_text})}>
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