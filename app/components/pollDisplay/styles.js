import { StyleSheet, Dimensions } from 'react-native';

const dimensions = Dimensions.get("window");

const Styles = StyleSheet.create({
    questionText: {
        fontSize: dimensions.width/22
    },
    container: {
        width: '100%',
        paddingTop: '2%',
        paddingBottom: '5%',
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
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 8,
        elevation: 8,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        },
    dot: {
        aspectRatio: 1,
        width: 15,
        marginHorizontal: 2,
        marginVertical: 2,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        position: 'relative',
        zIndex: 8,
        elevation: 8,
    },
})

export default Styles;