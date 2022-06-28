import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get("screen");

const Styles = StyleSheet.create({
    container: {
        marginBottom: dimensions.height/40, 
        flexDirection: 'row', 
        width: dimensions.width, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    background: {
        position: 'absolute', 
        height: '70%', 
        width: dimensions.width*1, 
        backgroundColor: 'rgba(204,204,204,0.3)'
    },
    button: {
        marginLeft: 10,
        paddingHorizontal: 10,
        height: dimensions.width/16, 
        borderRadius: dimensions.width/60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1, 
        marginVertical: '2%'
    }

})

export default Styles;