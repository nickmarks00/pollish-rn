import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

const Styles = StyleSheet.create({
    Post_Option: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '2%',
        marginHorizontal: '5%',
        flex: 1,
        borderColor: '#EEE', 
        borderWidth: dimensions.height/3000,
        backgroundColor: '#FEFEFE', borderRadius: 10,
        borderColor: '#907AD6', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
    }
})

export default Styles;