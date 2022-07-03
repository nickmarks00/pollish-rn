import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        marginVertical: '1.5%'
    },
    button: {
        aspectRatio: 1, 
        width: dimensions.height/25
    },
    content: {
        textAlign: 'left', 
        fontSize: dimensions.width/32,
        marginLeft: dimensions.width/50,
        width: dimensions.width*0.7,
        flexWrap: 'wrap'
    },
    username: {
        fontSize: dimensions.width/32, 
        fontWeight: 'bold'
    },
    colorbar: {
        marginHorizontal: dimensions.width/50, 
        width: dimensions.width/90, 
        borderRadius: dimensions.width/30, 
    },
    noProfileContainer: {
        borderRadius: 1000,
        backgroundColor: '#907AD6',
        aspectRatio: 1,
        height: dimensions.height/25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noProfileInitial: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: dimensions.height/60
    }
})

export default Styles;