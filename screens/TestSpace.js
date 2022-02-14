import React,{ useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Animated, Dimensions, ActivityIndicator, } from "react-native";
export default function Progressbar(){
    const [index, setIndex] =useState(0);
    const [progress, setProgress] = useState(new Animated.Value(0));

    const handlePress=(props)=>{
            Animated.timing(progress, {
                toValue:index+1,
                duration:400,
                useNativeDriver:false
            }).start()
    }

    const progressAnim=progress.interpolate({
        inputRange:[0, 4],
        outputRange:["20%", "100%"],
    });

    const barWidth={
        width:progressAnim
    }
        return(
            <View style={styles.mainView}>
                <Animated.View style={[styles.bar, barWidth]}>

                </Animated.View>

                <TouchableOpacity style={styles.yesBtn} onPress={() => handlePress}>
                    <Text style={styles.yes}>
                        Yes
                    </Text>
                </TouchableOpacity>
            </View>
        )
}

const styles= StyleSheet.create({
    mainView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    bar:{
        backgroundColor:"#fc5c56",
        height:100,
        borderRadius:50,
        position:"absolute",
        top:100,
        //left:-50,
    },
    questions:{
        position:"absolute",
        fontSize:20,
        backgroundColor:"transparent",
        fontSize:20,
        color:"gray"

    },
    yes:{
        color:"white",
        fontFamily:"Avenir",
        fontSize:22,
        fontWeight:"600",
    },
    no:{
        color:"white",
        fontFamily:"Avenir",
        fontSize:22,
        fontWeight:"600",
    },
    yesBtn:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:"red",
        position:"absolute",
        bottom:200,
        left:50,
        justifyContent:"center",
        alignItems:"center"
    },
    noBtn:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:"#fc6c65",
        position:"absolute",
        bottom:200,
        right:50,
        justifyContent:"center",
        alignItems:"center",

    }
})