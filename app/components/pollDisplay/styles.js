import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get("window");

const Styles = StyleSheet.create({
    questionText: {
        fontSize: dimensions.height/50
    },
    container: {
        width: '100%',
        padding: '5%',
        backgroundColor: '#FFF', 
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    profileContainer: {
        flexDirection: 'row', 
        marginVertical: '2%', 
        alignItems: 'center'
    }
})

export default Styles;