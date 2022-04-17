import React from 'react';
import { View, Text, Button, Modal, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Modal_Container, Modal_Position } from '../Styling/Comments_Style';
import useAuth from '../../auth/useAuth';
import { PrimaryPollish } from '../Styling/App_Styles';

const dimensions = Dimensions.get('window');
const img = 'https://www.gannett-cdn.com/presto/2020/07/21/USAT/86dfdd2f-db14-4a9f-8137-24536a574d3c-AP_Election_2020_Kanye_West.jpg?crop=4159,2339,x0,y0&width=3200&height=1800&format=pjpg&auto=webp'

const InfoCard = ({setOpen, open}) => {
    const {user, logOut} = useAuth();

    console.log(user)

    return(
        <Modal visible={open} animationType={"slide"} transparent={true}>
            <View style={Modal_Position}>
            <View style={[Modal_Container, {borderColor: PrimaryPollish, borderWidth: 5 }]}>
                <Text style={{fontWeight: 'bold', color: '#AAA'}}>Author</Text>
                <View style={{width: dimensions.width*0.7, flexDirection: 'row', alignItems: 'center', borderBottomColor: '#CCC', borderBottomWidth: 1, paddingHorizontal: '5%', paddingVertical: '3%'}}>
                    <Image style={{width: dimensions.width/8, aspectRatio: 1, borderRadius: 1000}} source={{uri: img}}/>
                    <View style={{width: '10%'}}/>
                    <View>
                        <Text style={{fontWeight: 'bold'}}>{user.username}</Text>
                        <View style={{height: '10%'}}/>
                        <TouchableOpacity style={{borderWidth: 1, borderRadius: 50, borderColor: '#1F71EB', marginHorizontal: '10%'}}>
                            <Text style={{textAlign: 'center', color: '#1F71EB'}}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{fontWeight: 'bold', color: '#AAA', marginTop: '5%'}}>Community</Text>
                <View style={{width: dimensions.width*0.7, flexDirection: 'row', alignItems: 'center', borderBottomColor: '#CCC', borderBottomWidth: 1, paddingHorizontal: '5%', paddingVertical: '10%'}}>
                    <Text style={{fontWeight: 'bold'}}>{user.username}</Text>
                        <TouchableOpacity style={{borderWidth: 1, borderRadius: 50, borderColor: '#1F71EB', marginHorizontal: '10%', paddingHorizontal: 10}}>
                            <Text style={{textAlign: 'center', color: '#1F71EB'}}>Follow</Text>
                        </TouchableOpacity>

                </View>
                <View style={{flexDirection: 'row', paddingVertical: '5%'}}>
                    <View style={{width: '50%'}}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center', color: '#AAA'}}>Votes</Text>
                        <View style={{height: 10}}/>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>345</Text>
                    </View>
                    <View style={{width: '50%'}}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center', color: '#AAA'}}>Date</Text>
                        <View style={{height: 10}}/>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>345</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: '5%'}}>
                    <View style={{width: '50%'}}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center', color: '#AAA'}}>Preference</Text>
                        <View style={{height: 10}}/>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>345</Text>
                    </View>
                    <View style={{width: '50%'}}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center', color: '#AAA'}}>Comments</Text>
                        <View style={{height: 10}}/>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>345</Text>
                    </View>
                </View>
                <View style={{height: 10}}/>
                <Button title="Close" onPress={()=>setOpen(false)}/>
            </View>
            </View>
        </Modal>
    )
}

export default InfoCard;