{
  /*
    Component for rendering the entire comment section.
*/
}

import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import {useFonts} from 'expo-font';

import {Question_Container, Comments_DisplayArea} from 'style/Comments_Style';
import FilterPopup from 'modals/FilterPopup';
import {PollQuestion, FilterBar, Comment, CreateComment} from 'components';
import {getComments} from 'endpoints/core';
import { useHeaderHeight } from '@react-navigation/elements'
const CommentSection = ({route}) => {
  const post = route.params.post;
  const headerHeight = useHeaderHeight();

  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [selected, setSelected] = useState({txt: 'No Filter', idx: 4, cid: 0});
  const [modalVisible, setModalVisible] = useState(false);
  const [colors, setColors] = useState({red: 0, yellow: 0, blue: 0, black: 0});

  useEffect(() => {
    fetchDataFromApi();
    assignColors();
    console.log(headerHeight)
  }, []);

  const assignColors = () => {
    route.params.post.choices.map((option, idx) => {
      if (idx == 0) setColors(prevState => ({...prevState, red: option.id}));
      if (idx == 1) setColors(prevState => ({...prevState, yellow: option.id}));
      if (idx == 2) setColors(prevState => ({...prevState, blue: option.id}));
      if (idx == 3) setColors(prevState => ({...prevState, black: option.id}));
    });
  };

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
    SFRound: require('../assets/fonts/SFRoundBold.ttf'),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const SetFilter = props => {
    setSelected({txt: props.txt, idx: props.idx, cid: props.cid});
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1}}>
      {/* Modal Popup for chosing filter */}
      <FilterPopup
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        SetFilter={SetFilter}
        post={post}
      />

      {/* Top Section containing Question information */}
      <View style={Question_Container}>
        <PollQuestion question={post.question_text} size={20} />
      </View>

      {/* FilterBar the currently selected filter */}
      <FilterBar setModalVisible={setModalVisible} selected={selected} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        >
        {/* Section where comments are rendered */}
        <View style={Comments_DisplayArea}>
          <ScrollView>
            {comments.map((comment, index) => {
              if (selected.cid == comment.choice_id || selected.cid == 0)
                return (
                  <Comment
                    key={index}
                    profileScreen={route.params.profileScreen}
                    colors={colors}
                    comment={comment}
                  />
                );
            })}
          </ScrollView>
        </View>

        {/* Section to type and post comments*/}
        <CreateComment reload={fetchDataFromApi} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentSection;
