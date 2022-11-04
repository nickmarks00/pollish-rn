import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {VoteButton} from 'components';
import Media from './subComponents/Media';
import {getCommuntiy, getPoll, registerVote} from '../../network/lib/pollish';
import {getUser} from '../../network/lib/core';
import PollNav from './subComponents/PollNav';
import ProfilePic from '../ProfilePic';
import moment from 'moment';
import {SCREEN_NAMES} from '../../constants/keys';

const {height, width} = Dimensions.get('window');

const PollDisplay = ({id, refreshToken}) => {
  const route = useRoute();
  const navigation = useNavigation();

  const [post, setPost] = useState(null);
  const [oUser, setUser] = useState(null);
  const [comm, setComm] = useState(null);
  const [currImgIdx, setImgIdx] = useState(0);

  const {user, logout} = useAuth();
  const [imgWidth, setWidth] = useState(1);
  const [imgHeight, setHeight] = useState(1);

  const [voteCount, setVoteCount] = useState(0);
  const [userVote, setUserVote] = useState(null);

  const [tempVoteCount, setTempVoteCount] = useState(0);
  const [tempUserVote, setTempUserVote] = useState(null);

  const [unVoted, setUnvoted] = useState(-1);
  const [showModel, setShowModel] = useState(false);
  const [focusModal, setFocusModal] = useState(false);

  useEffect(() => {
    loadPoll();
    checkVote();
  }, [refreshToken]);

  useEffect(() => {
    loadUser();
    loadComm();
    return () => {
      setUser();
      setComm();
    };
  }, [post]);

  useEffect(() => {
    if (voteCount != tempVoteCount) {
      setTempVoteCount(voteCount);
    }
    if (userVote != tempUserVote) {
      setTempUserVote(userVote);
    }
  }, [voteCount, userVote]);

  const loadPoll = async () => {
    getPoll(route.params?.id ? route.params.id : id).then(function (response) {
      setPost(response.data);
    });
  };

  const openModel = async (item, index) => {
    setImgIdx(index);
    console.log(item);
    console.log('in ' + index);
    await Image.getSize(
      item,
      (Width, Height) => {
        setWidth(Width);
        setHeight(Height);
      },
      errorMsg => {
        console.log(errorMsg);
      },
    );
    setShowModel(true);
  };

  const loadUser = async () => {
    if (post) {
      getUser(post.user_id).then(function (response) {
        setUser(response.data);
      });
    }
  };

  const loadComm = async () => {
    if (post) {
      if (post.community) {
        getCommuntiy(post.community.id).then(function (response) {
          setComm(response.data);
        });
      }
    }
  };

  const checkVote = async () => {
    const response = await getPoll(route.params?.id ? route.params.id : id);
    if (userVote != response.data.user_vote) {
      setUserVote(response.data.user_vote);
    }

    var count = 0;
    response.data.choices.map((choice, idx) => {
      count += choice.num_votes;
    });
    setVoteCount(count);
  };

  const navigateProfile = () => {
    navigation.push(SCREEN_NAMES.PROFILE, {user: oUser, title: oUser.username});
  };

  const navigateComments = () => {
    navigation.push(SCREEN_NAMES.COMMENTS, {
      post: post,
      title: post.question_text,
    });
  };

  const navigateCommunity = () => {
    if (post.community) {
      navigation.push(SCREEN_NAMES.COMMUNITY, {
        id: post.community.id,
        comm: comm,
      });
      setFocusModal(false);
    }
  };

  const navVotes = () => {
    navigation.push(SCREEN_NAMES.VOTE_LIST, {
      pid: post.id,
      choices: post.choices,
    });
  };

  const offlineVoteUpdate = cid => {
    if (tempUserVote == cid) {
      registerVote(post.id, user.id, cid, null);
      setTempUserVote(null);
      if (userVote) setTempVoteCount(voteCount - 1);
      else setTempVoteCount(voteCount);
    } else if (tempUserVote != null) {
      registerVote(post.id, user.id, tempUserVote, cid);
      setTempUserVote(cid);
    } else {
      registerVote(post.id, user.id, null, cid);
      setTempUserVote(cid);
      if (userVote) setTempVoteCount(voteCount);
      else setTempVoteCount(voteCount + 1);
    }
  };

  if (post && oUser) {
    return (
      <View style={{alignItems: 'center', width: '100%'}}>
        <Modal visible={showModel} transparent>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}>
            <TouchableOpacity
              onPress={() => setShowModel(false)}
              style={{
                position: 'absolute',
                height: height,
                width: width,
                backgroundColor: 'rgba(255,255,255,0.7)',
              }}
            />
            {post.images.length > 0 && (
              <Image
                source={{uri: post.images[currImgIdx].image}}
                style={{
                  resizeMode: 'cover',
                  width,
                  aspectRatio: imgHeight / imgWidth,
                }}
              />
            )}
          </View>
        </Modal>

        <Modal visible={focusModal} transparent>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}>
            <TouchableOpacity
              style={{position: 'absolute', height: '100%', width: '100%'}}
              onPress={() => setFocusModal(false)}
            />
            <View
              style={{
                width: '80%',
                height: '60%',
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>{moment(post.created_at).fromNow()}</Text>
              <TouchableOpacity onPress={() => navigateCommunity()}>
                <Text>{post.community ? post.community.name : 'No Focus'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {post.images.length == 0 && (
          <View
            style={{
              marginHorizontal: 20,
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{height: height * 0.15}} />
            <View
              style={{
                width: width + 6,
                height: height * 0.022,
                borderTopWidth: 3,
                borderColor: '#C6C6C6',
                borderTopRightRadius: 20,
                borderRightWidth: 3,
                borderLeftWidth: 3,
                borderTopLeftRadius: 20,
                borderRightColor: '#C6C6C6',
              }}
            />
            <TouchableOpacity onPress={navigateProfile}>
              <ProfilePic user={oUser} profileHeight={width * 0.09} />
            </TouchableOpacity>
          </View>
        )}

        {/* Image */}
        {post.images.length > 0 && (
          <Media
            fullScreenImage={openModel}
            post={post}
            img={post.images}
            user={oUser}
            navToProfile={navigateProfile}
          />
        )}

        <View style={{height: height * 0.014}} />

        {/* Question */}
        <View
          style={{
            height: Dimensions.get('window').height * 0.084,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 17, fontWeight: 'bold'}}>
            {post.question_text}
          </Text>
        </View>

        <View style={{height: height * 0.014}} />

        {/* Choices */}
        {post.choices.map((choice, idx) => {
          const count = post.choices.length;
          var h = 35;
          var margin = height * 0.014;
          if (count == 4) h = height * 0.041;
          else if (count == 3) h = height * 0.053;
          else if (count == 2) {
            margin = height * 0.018;
            h = height * 0.085;
          }

          var v = 0;

          if (isFinite(tempVoteCount)) {
            v = tempVoteCount;
          }

          console.log(h);

          return (
            // <View/>
            <VoteButton
              offlineVoteUpdate={offlineVoteUpdate}
              post={post}
              height={h}
              margin={idx == count - 1 ? 0 : margin}
              chosen={tempUserVote == choice.id ? 2 : tempUserVote ? 1 : 0}
              checkVote={checkVote}
              key={idx}
              count={post.choices.length}
              idx={idx}
              choice={choice}
              voteCount={v}
              unVoted={unVoted}
              userVote={userVote}
              setUnvoted={setUnvoted}
            />
          );
        })}

        <View
          style={{
            height:
              post.choices.length == 4
                ? Dimensions.get('window').height * 0.014
                : Dimensions.get('window').height * 0.038,
            width: '100%',
          }}
        />

        {/* Poll Buttons */}
        <PollNav
          commentCount={post.comments.length}
          voteCount={tempVoteCount}
          infoModal={setFocusModal}
          navVotes={navVotes}
          navComments={navigateComments}
        />

        <View
          style={{
            width: Dimensions.get('window').width + 6,
            height: Dimensions.get('window').height * 0.022,
            borderBottomWidth: 3,
            borderColor: '#C6C6C6',
            borderBottomRightRadius: 20,
            borderRightWidth: 3,
            borderLeftWidth: 3,
            borderBottomLeftRadius: 20,
            borderRightColor: '#C6C6C6',
          }}
        />
        <View style={{height: Dimensions.get('window').height * 0.014}} />
      </View>
    );
  } else return <View />;
};

export default PollDisplay;
