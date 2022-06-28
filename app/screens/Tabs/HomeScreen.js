import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
  Image,
  Modal,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {REACT_APP_REACT_APP_BASE_URL} from '@env';
import {PrimaryPollish} from '../../Styling/App_Styles';
import {getPollFeed} from 'endpoints/pollish';
import PollDisplay from '../../components/pollDisplay';
import ColoredButton from '../../components/coloredButton';
import colors from '../../config/colors';
import CreatePoll from '../CreatePollScreens/CreatePoll';
const base = REACT_APP_REACT_APP_BASE_URL;

const dimensions = Dimensions.get('window');

const HomeScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const tabBarHeight = useBottomTabBarHeight();
  const [refreshing, setRefreshing] = useState(false);
  const [create, setCreate] = useState(false);
  const [number, setNum] = useState(1);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDataFromApi(1);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchDataFromApi(1);
  }, []);

  const fetchDataFromApi = async page => {
    const polls = await getPollFeed(page);
    setPosts(polls.data.results);
  };

  const loadMoreData = async page => {
    const polls = await getPollFeed(page);
    const total = [...posts, ...polls.data.results];
    setPosts(total);
  };

  const openModel = () => {
    setCreate(true);
  };

  return (
    <View>
      <Modal visible={create} animationType={'slide'}>
        <CreatePoll setPoll={setCreate} />
      </Modal>
      <View
        style={{
          height: 100,
          borderBottomWidth: 2,
          borderColor: '#EEE',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: '30%'}} />
        <ColoredButton
          whenPressed={openModel}
          color={colors.secondary}
          text={'Create Poll'}
        />
      </View>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <View style={{flex: 1, width: '100%', marginVertical: '5%'}}>
            <PollDisplay
              id={item.id}
              commentsScreen={route.params.commentsScreen}
              profileScreen={route.params.profileScreen}
            />
          </View>
        )}
        onEndReachedThreshold={0.01}
        onEndReached={info => {
          loadMoreData(number + 1);
          setNum(number + 1);
        }}
      />

      {/* <ScrollView
        decelerationRate={0.9}
        snapToAlignment={'center'}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{backgroundColor: 'transparent'}}
          />
        }
        
        >

          {posts.results?.map((post, idx) => {
            if (posts.length - 2 === idx) fetchDataFromApi2(posts.next);

            return (
              <View key={idx} style={{flex: 1, width: '100%', marginVertical: '5%'}}>
              <PollDisplay 
                id={post.id}
                commentsScreen={route.params.commentsScreen}
                profileScreen={route.params.profileScreen}
              />
              </View>
              // <PollView
              //   key={idx}
              //   commentsScreen={route.params.commentsScreen}
              //   profileScreen={route.params.profileScreen}
              //   navigation={navigation}
              //   id={post.id}></PollView>
            );
          }) || []}
      </ScrollView> */}
    </View>
  );
};

export default HomeScreen;
