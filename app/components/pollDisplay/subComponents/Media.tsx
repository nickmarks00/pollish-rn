import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ProfilePic from '../../ProfilePic';

const {height, width} = Dimensions.get('window');

/*
    * This Component renders the image seen at the head of a poll view
    ! Requires images from post be supplied to component
*/

const Media = ({post, img, user, navToProfile, fullScreenImage}) => {
  const [activeIndexNumber, setActiveIndexNumber] = React.useState(Number);

  return (
    <View style={{height: height * (42 / 120), width: '100%'}}>
      {/* <View style={{width, height: height*(43/120)}}/> */}
      {/* <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        initialNumToRender={2}
        windowSize={3}
        data={img}
        renderItem={({item}) => (
          <View style={{ width, height: height*(43/120)}}>
                <Image 
                  source={{uri: item.image, cache: "force-cache"}} 
                  style={{flex: 1, borderTopRightRadius: width*0.05, borderTopLeftRadius: width*0.05}}/>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}

      {/* Image in Scroll View */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        directionalLockEnabled={true}
        horizontal
        scrollEventThrottle={8}
        onScroll={e => {
          let slide = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width,
          );
          if (slide !== activeIndexNumber) {
            setActiveIndexNumber(slide); //here we will set our active index num
          }
        }}>
        {post.images.map((image, idx) => {
          return (
            <TouchableOpacity
              onPress={() => fullScreenImage(image, activeIndexNumber)}
              key={idx}
              style={{width, height: height * (43 / 120)}}>
              <Image
                source={{uri: image.image, cache: 'force-cache'}}
                style={{
                  flex: 1,
                  borderTopRightRadius: width * 0.05,
                  borderTopLeftRadius: width * 0.05,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  borderColor: 'rgba(0,0,0,0.2)',
                  width: '100%',
                  height: '100%',
                  borderTopRightRadius: width * 0.05,
                  borderTopLeftRadius: width * 0.05,
                  borderWidth: 2,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        onPress={navToProfile}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'rgba(255,255,255,0.4)',
          height: width * 0.105,
          aspectRatio: 1,
          borderRadius: 1000,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ProfilePic user={user} profileHeight={width * 0.09} />
      </TouchableOpacity>

      {/* Image Slide Indicator */}
      <View style={{flexDirection: 'column'}}>
        <View style={Styles.slideContainer}>
          {post.images
            .slice(0, activeIndexNumber < 5 ? 5 : post.images.length - 5)
            .map((item, index) => {
              if (post.images.length !== 1) {
                // if imagelist array length not 1
                if (activeIndexNumber < 5) {
                  //if activeindex lower than five
                  return (
                    <View
                      key={index}
                      style={[
                        index == activeIndexNumber
                          ? [
                              Styles.dot,
                              {backgroundColor: 'rgba(255,255,255,0.7)'},
                            ]
                          : Styles.dot,
                        {
                          width:
                            (width - post.images.length * 12) /
                            post.images.length,
                        },
                      ]}></View>
                  );
                } else {
                  //if activeindex higher than five
                  return (
                    <View
                      key={index}
                      style={[
                        index == activeIndexNumber - 5
                          ? [
                              Styles.dot,
                              {backgroundColor: 'rgba(255,255,255,0.7)'},
                            ]
                          : Styles.dot,
                      ]}></View>
                  );
                }
              } else {
                <View />;
              }
            })}
        </View>
      </View>
    </View>
  );
};

export default Media;

const Styles = StyleSheet.create({
  slideContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 8,
    elevation: 8,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  dot: {
    height: height * 0.008,
    width: width * 0.25,
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    position: 'relative',
    zIndex: 8,
    elevation: 8,
  },
});
