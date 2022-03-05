{/* 
    This component renders an image in device width on an all black background
*/}


import * as React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').height;

const FullScreenImage = (props) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', backgroundColor: 'black'}}>
            <ImageBackground 
                source={require('../../assets/lebron.jpg')}
                style={{width: deviceWidth/2,
                    height: deviceWidth/2,
                    resizeMode: "contain",
                    alignSelf: "center",}} 
            />
        </View>
    )
}

export default FullScreenImage;