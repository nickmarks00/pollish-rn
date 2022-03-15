import * as React from 'react'
import { Text, Image, View, Dimensions, StyleSheet } from 'react-native'

const dimensions = Dimensions.get("screen")

const SearchPollView = (props) => {
  return (
    <View style={{alignContent: 'center', height: dimensions.width/6, flexDirection: 'row', justifyContent: 'center', width: dimensions.width, marginVertical: '3%'}}>
      <Image
        source={{uri: 'https://' + props.img.slice(34)
        }}
        style={{
          width: dimensions.width/6,
          height: dimensions.width/6,
          borderRadius: dimensions.width/32
        }}
      />
      <View style={{paddingHorizontal: '5%', width: dimensions.width*(2/3)}}>
        <Text style={{
            fontWeight: 'bold', fontSize: dimensions.width/40, marginBottom: dimensions.width/80, color: '#2134DB'
        }}>
            Sports
        </Text>
        <Text style={styles.paragraph}>
              {props.question}
        </Text>
      </View>
    </View>
  );
}

export default SearchPollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: dimensions.width/35,
    fontWeight: 'bold',
  },
});