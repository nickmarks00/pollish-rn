import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get("screen");

const Styles = StyleSheet.create({
    container: {
        padding: '2.5%', 
        borderRadius: 1000, 
        borderWidth: 1
    },
    content: {
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: dimensions.width/24
    }
})

export default Styles;