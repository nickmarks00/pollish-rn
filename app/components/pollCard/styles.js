import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get("screen");

const Styles = StyleSheet.create({
    container: {
        width: dimensions.width, 
        flexDirection: 'row', 
        paddingVertical: '4%', 
        paddingHorizontal: '6%', 
        justifyContent: 'center'
    },
    pollImage: {
        height: dimensions.width/5,
        width: dimensions.width/5,
        aspectRatio: 1,
        borderRadius: 15,
        resizeMode: 'contain',
        borderColor: '#ffeef7',
    },
    noImage: {
        height: dimensions.width/5,
        width: dimensions.width/5,
        aspectRatio: 1,
        borderRadius: 15,
        resizeMode: 'contain',
        borderColor: '#ffeef7',
        backgroundColor: '#907AD6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noImageText: {
        fontWeight: 'bold', 
        fontSize: dimensions.width/12, 
        color: 'white'
    },
    questionText: {
        fontWeight: 'bold', 
        flexWrap: 'wrap', 
        paddingHorizontal: '7%',
    },
    votesText: {
        fontWeight: 'bold', 
        flexWrap: 'wrap', 
        paddingHorizontal: '7%', 
        color: '#9c9c9c', 
    },
    labelContainer: {
        padding: '1%', 
        borderRadius: 1000, 
        justifyContent: 'center'
    },
    labelText: {
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: 'white', 
        fontSize: dimensions.width/30, 
        paddingHorizontal: '3%'
    }
})

export default Styles;