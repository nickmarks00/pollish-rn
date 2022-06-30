import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        padding: '3%', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    input: {
        height: dimensions.height/22,
        width: dimensions.width/1.2,
        marginRight: 12,
        borderWidth: 1,
        borderRadius: dimensions.height/60,
        borderColor: '#BBB',
        padding: '3%',
    }
})

export default Styles;