import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import Button from '../components/Button';
import IconButton from '../components/iconButton';

const { height, width } = Dimensions.get('window');

const OptionBox = ({optionText}) => {
    return (
        <View>
            <View style={{height: height*0.018}}/>
            <View style={{height: height*0.05, width: width*0.9, borderColor: '#BBB', borderWidth: 1, borderRadius: height*0.006, justifyContent: 'center'}}>
                <Text style={{fontWeight: '500', fontSize: 12, marginHorizontal: '5%', color: '#6F6F6F'}}>{optionText}</Text>
            </View>
        </View>
    )
}

const CreationModal = ({setModalVisible}) => {

    const [fillHeight, setFillHeight] = React.useState(0.4)
    const [stage, setStage] = React.useState(0);
    const [options, setOptions] = React.useState(0);
    const [newText, SetText] = React.useState('');
    const [question, setQuestion] = React.useState('');
    const [o1, setO1] = React.useState('');
    const [o2, setO2] = React.useState('');
    const [o3, setO3] = React.useState('');
    const [o4, setO4] = React.useState('');
    const [media, setMedia] = React.useState(null);


    const nextStage = () => {
        if(stage == 0)
            setQuestion(newText);
        const temp = stage;
        setStage(temp+1);
        console.log(stage)
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsMultipleSelection: true,
          aspect: [6,3]
        });
        
        if (pickerResult.cancelled === true) {
          return;
        }

        console.log(pickerResult)
        setMedia(pickerResult.uri)
        
        
    };

    const addOption = () => {
        if(options == 0)
            setO1(newText)
        if(options == 1)
            setO2(newText)
        if(options == 2)
            setO3(newText)
        if(options == 3)
            setO4(newText)
        const temp = options;
        setOptions(temp+1);
    }

    const goBack = () => {
        const temp = options;
        const tStage = stage;
        if (options > 0){
            setOptions(temp-1);
        }
        else {
            setStage(stage-1);
        }
    }

    const CreationBox = () => {
        return (
            <View style={{height: height*0.216, width, alignItems: 'center'}}>
                <View style={{height: height*0.051}}/>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Add another option for your poll</Text>
                <View style={{height: height*0.018}}/>
                <TextInput onChangeText={optionText => setOptionText(optionText)} style={{height: height*0.057, borderWidth: 1, borderColor: '#DDD', width: '90%', textAlign: 'center', borderRadius: height*0.012}} placeholder='why do cows not fly?'/>
            </View>
        )
    }

    const Preview = () => {

    }

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{flex: 1, opacity: 0}}/>
            <View style={{alignItems: 'center',
            backgroundColor: 'white',
            borderTopLeftRadius: width*0.07,
            borderTopRightRadius: width*0.07,
            }}
            >

            {stage == 0 ? 
                <View>
                    <View style={{height: height*0.034}}/>
                    <View style={{height: height*0.057, justifyContent: 'center'}}>
                        <Text numberOfLines={2} style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginHorizontal: '10%'}}>Write a question you want answered</Text>
                    </View>
                    <View style={{height: height*0.191, width, alignItems: 'center'}}>
                        <View style={{height: height*0.057}}/>
                        <TextInput onChangeText={newText => SetText(newText)} style={{height: height*0.057, borderWidth: 1, borderColor: '#DDD', width: '90%', textAlign: 'center', borderRadius: height*0.012}} placeholder='why do cows not fly?'/>
                    </View>
                </View>
            :
                <View style={{alignItems: 'center'}}>
                    <View style={{height: height*0.025}}/>
                    <View style={{height: height*0.05, justifyContent: 'center'}}>
                        <Text numberOfLines={2} style={{textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginHorizontal: '10%'}}>{question}</Text>
                    </View>
                    { options > 0 && <OptionBox optionText={o1} /> }
                    { options > 1 && <OptionBox optionText={o2} /> }
                    { options > 2 && <OptionBox optionText={o3} /> }
                    { options > 3 && <OptionBox optionText={o4} /> }
                    { stage > 2 && media && <View style={{marginTop: height*0.021, height: height*0.148, backgroundColor: '#E5F7F6', width, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#B7E8E7', alignItems: 'center'}}>
                        <Image source={{uri: media}} style={{height: '100%', width: width*0.428, borderRadius: width*0.026}}/>

                    </View>}

                    <View style={{height: height*0.021, width, borderBottomWidth: 1, borderColor: '#CCCCCC'}}/>
                    { stage == 1 ?
                        <View style={{height: height*0.216, width, alignItems: 'center'}}>
                            <View style={{height: height*0.051}}/>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Add another option for your poll</Text>
                            <View style={{height: height*0.018}}/>
                            <TextInput onChangeText={newText => SetText(newText)} style={{height: height*0.057, borderWidth: 1, borderColor: '#DDD', width: '90%', textAlign: 'center', borderRadius: height*0.012}} placeholder='why do cows not fly?'/>
                        </View>
                        :
                        stage == 2 ?
                        <View style={{height: height*0.255, width, alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => openImagePickerAsync()} style={{overflow: 'hidden', flex: 1, borderRadius: width*0.077, backgroundColor: '#CCEEEE', margin: width*0.05, width: width*0.9, borderWidth: 1, borderColor: '#00AAA9'}}>
                                { media && <Image source={{uri: media}} style={{flex: 1, borderRadius: width*0.077}} /> }
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{height: height*0.216, width, alignItems: 'center'}}>
                            <View style={{height: height*0.051}}/>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Describe your poll with up to 4 focus'</Text>
                            <View style={{height: height*0.018}}/>
                            <TextInput onChangeText={newText => SetText(newText)} style={{height: height*0.057, borderWidth: 1, borderColor: '#DDD', width: '90%', textAlign: 'center', borderRadius: height*0.012}} placeholder='why do cows not fly?'/>
                        </View>

                    }
                </View>

            }
                

                


                <View style={{height: height*0.047, justifyContent: 'center', flexDirection: 'row', width: width*0.9}}>
                    { ((stage > 0 && options >= 2) || (stage > 1)) && <IconButton backgroundColor={'#414141'} action={() => goBack()} style={{ height: height*0.047, backgroundColor: '#414141', borderRadius: 1000}} name={"chevron-back-outline"} iconFill={'white'}/>  }
                    { stage == 1 && options >= 2 && <View style={{flex: 1}}/> }
                    { stage == 1 && options < 2 && <Button textSize={15} action={() => goBack()} style={{width: width*0.359, height: height*0.047, backgroundColor: '#414141', borderRadius: height*0.012}} textColor={'white'} text={'Back'}/> }
                    { ((stage == 1  && options < 2) || (stage > 1)) && <View style={{flex: 1}}/>}
                    { stage == 3 && <Button textSize={15} action={() => Preview()} style={{width: width*0.359, height: height*0.047, backgroundColor: '#414141', borderRadius: height*0.012}} textColor={'white'} text={'Preview'}/> }
                    { stage == 1 && options < 4 && <Button textSize={15} action={() => addOption()} style={{width: width*0.359, height: height*0.047, backgroundColor: '#414141', borderRadius: height*0.012}} textColor={'white'} text={'Add Choice'}/> }
                    { ((stage == 1 && options >= 2 &&  options < 4) || stage >= 1) && <View style={{flex: 1}}/> }
                    { (stage != 1 || options > 1) && <Button textSize={15} action={() => nextStage()} style={{width: width*0.359, height: height*0.047, backgroundColor: '#414141', borderRadius: height*0.012}} textColor={'white'} text={'Next'}/> }
                </View>
                <View style={{height: height*0.076}}/>
            </View>
        </View>
    )
}
export default CreationModal;
