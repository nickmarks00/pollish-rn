import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';


const dimensions = Dimensions.get("screen")

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', backgroundColor: '#83EFB1', width: dimensions.width, height: dimensions.height/4.5}}>
        <Image source={{uri: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'}}
        style={{
          marginTop: (dimensions.height/4.5)-(dimensions.width/4), 
          width: dimensions.width/2, 
          height: dimensions.width/2,
          borderRadius: dimensions.width/16,
          borderColor: '#83EFB1',
          borderWidth: 3}}
        />
      </View>

      <Text style={{textAlign: 'center', fontWeight: 'bold', marginTop: dimensions.width/4+3, fontSize: 15}}>
      USERNAME00
      </Text>
      <View style={{borderRadius: 10, backgroundColor: 'rgba(204, 204, 204, 0.26)', width: dimensions.width*0.92, height: dimensions.height/18, alignContent: 'center', marginLeft: dimensions.width*0.04, marginTop: dimensions.height/80, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', opacity: '50%'}}>
      <View style={{width: dimensions.width/6}}>
      <Text style={[styles.text, {fontSize: 15}]}>30</Text>
      <Text style={[styles.text, {fontSize: 10}]}>POLLS</Text>
      </View>
      <View/>
      <View style={{width: dimensions.width/6}}>
      <Text style={[styles.text, {fontSize: 15}]}>389,450</Text>
      <Text style={[styles.text, {fontSize: 10}]}>VOTES</Text>
      </View>
      <View/>
      <View style={{width: dimensions.width/6}}>
      <Text style={[styles.text, {fontSize: 15}]}>100,000</Text>
      <Text style={[styles.text, {fontSize: 10}]}>VOTED</Text>
      </View>

      </View>
      <View style={{marginLeft: dimensions.width*0.115, width: dimensions.width*0.77, height: dimensions.height/22, backgroundColor: 'rgba(204, 204, 204, 0.15)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, flexDirection: 'row'}}>
        <Text>FOLLOWERS</Text>
        <Text>FOLLOWERS</Text>
        <Text>FOLLOWERS</Text>
        <Text>FOLLOWERS</Text>
      </View>
      
    </View>
  );  
}

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});