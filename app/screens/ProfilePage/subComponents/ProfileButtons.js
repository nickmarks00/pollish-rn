import React from 'react';
import { Dimensions, View } from 'react-native';
import IconButton from '../../../components/iconButton';

const { height, width } = Dimensions.get('window');

const ProfileButtons = ({ navToCommList, navToSettings }) => {
    return (
        <View style={{width: width*0.9, height: height*0.057, flexDirection: 'row', justifyContent: 'space-between'}}>
        <IconButton name={"notifications"} outlineWidth={1} outlineColor={"#ECEEEE"}/>
        <IconButton backgroundColor={'#CCCCCC'} />
        <IconButton action={navToCommList} name={"eye"} outlineWidth={1} outlineColor={"#ECEEEE"}/>
        <IconButton backgroundColor={'#CCCCCC'} />
        <IconButton action={navToSettings} name={"settings"} outlineWidth={1} outlineColor={"#ECEEEE"}/>
      </View>
    )
}
export default ProfileButtons;