import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get("screen");

const Styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        justifyContent: 'center', 
        right: '8%'
    },
})

export default Styles;