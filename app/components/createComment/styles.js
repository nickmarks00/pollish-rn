import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    input: {
        height: 40,
        width: dimensions.width/1.2,
        marginRight: 12,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#BBB',
        padding: 10,
    }
})

export default Styles;