import * as React from 'react'
import { Text, Image, View, Dimensions, StyleSheet } from 'react-native'

const dimensions = Dimensions.get("screen")

const SearchPollView = () => {
  return (
    <View style={{height: dimensions.width/4, flexDirection: 'row', justifyContent: 'center'}}>
      <Image
        source={{uri: 'https://i.guim.co.uk/img/media/1ba7f8d5f1b4109acab48e0540983a8495fdf9d7/0_357_5521_3313/master/5521.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9f499df3073d1872dba937e1272aa062'
        }}
        style={{
          width: dimensions.width/4,
          height: dimensions.width/4,
          borderRadius: dimensions.width/16
        }}
      />
      <View style={{
          padding: dimensions.width/48, width: dimensions.width*(2/3), alignItems: 'left', flexWrap: 'wrap',           alignContent: 'left', justifyContent: 'center'
      }}>
        <Text style={{
            fontWeight: 'bold', fontSize: dimensions.width/30, marginBottom: dimensions.width/40, color: '#2134DB'
        }}>
            Sports
        </Text>
        <Text style={styles.paragraph}>
              Who is the greatest nba player dww dwdw dw dw
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
    fontSize: dimensions.width/28,
    fontWeight: 'bold',
  },
});