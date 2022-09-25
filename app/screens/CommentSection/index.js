{
  /*
    Component for rendering the entire comment section.
*/
}

import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions} from 'react-native';
import {useFonts} from 'expo-font';

import {Comments_DisplayArea} from 'style/Comments_Style';
import { CreateComment} from 'components';
import Comment from './subComponents/comment';
import {getComments} from 'endpoints/core';
import { useHeaderHeight } from '@react-navigation/elements'
import Button from '../../components/Button';

const { height, width } = Dimensions.get('window');

const BUTTON_BORDER_WIDTH = height*0.012;



const CommentSection = ({route}) => {
  const post = route.params.post;
  const headerHeight = useHeaderHeight();

  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState(-1);
  const [colors, setColors] = useState({red: 0, yellow: 0, blue: 0, black: 0});

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
  )

  const adjustFilter = () => {
    const temp = filter;
    if(temp >= route.params.post.choices.length - 1)
      setFilter(-1);
    else
      setFilter(temp+1);
  }

  const fetchDataFromApi = async () => {
    setLoading(true);

    const data = await getComments(
      route.params.post.user_id,
      route.params.post.id,
    );
    setComments(data.data);
  };

  // Load fonts
  let [fontsLoaded] = useFonts({
    SFRound: require('../../assets/fonts/SFRoundBold.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <HideKeyboard>
    <View style={{flex: 1, alignItems: 'center'}}>
      {/* Modal Popup for chosing filter */}
      <View style={{height: height*0.024}}/>

      <View style={{height: height*0.047, width: width*0.9, flexDirection: 'row', justifyContent: 'center'}}>
        <Button action={adjustFilter} style={{flex: 1, borderColor: '#00AAA9', borderWidth: 1, borderRadius: BUTTON_BORDER_WIDTH}} textColor={'#00AAA9'} 
                text={filter == -1 ? 'Showing All' : '"' + route.params.post.choices[filter].choice_text + '"'}/>
        <View style={{width: '4%'}}/>
        <Button style={{flex: 1, borderColor: '#000', borderWidth: 1, borderRadius: BUTTON_BORDER_WIDTH, backgroundColor: 'black'}} textColor={'#FFF'} text={'Most Recent'}/>
      </View>

      <View style={{height: height*0.024}}/>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        >
        {/* Section where comments are rendered */}
        <View style={Comments_DisplayArea}>
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            {comments.map((comment, index) => {
              if (filter == -1 || route.params.post.choices[filter].id == comment.choice_id)
                return (
                  <View key={index}>
                    <View style={{height: height*0.01}}/>
                    <Comment
                      reloadComments={fetchDataFromApi}
                      pid={post.id}
                      profileScreen={route.params.profileScreen}
                      colors={colors}
                      comment={comment}
                      choices={route.params.post.choices}
                    />
                  </View>
                );
            })}
          </ScrollView>
        </View>

        {/* Section to type and post comments*/}
        <CreateComment reload={fetchDataFromApi} />
      </KeyboardAvoidingView>
    </View>
    </HideKeyboard>
  );
};

export default CommentSection;
