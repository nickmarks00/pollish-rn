import axios from 'axios';
import authStorage from '../auth/storage';
import {REACT_APP_BASE_URL} from '@env';

// * Return a user given a user id
const GetUser = async uid => {
  const url = `${REACT_APP_BASE_URL}/core/users/${uid}/`;
  return GetRequest(url);
};

const GetPollFeed = async num => {
  const url = `http://${REACT_APP_BASE_URL}/pollish/polls/?page=${num}`;
  return GetRequest(url);
};

// * Return a list of users a user follows given a user id
const GetFollowing = async uid => {
  const url = `${REACT_APP_BASE_URL}/core/users/${uid}/following/`;
  return GetRequest(url);
};

// * Return a list of users a user follows given a user id
const GetFollowers = async uid => {
  const url = `http://${REACT_APP_BASE_URL}/core/users/${uid}/followers/`;
  return GetRequest(url);
};

// * Return information about a poll
const GetPoll = async pid => {
  const url = `${REACT_APP_BASE_URL}/pollish/polls/${pid}/`;
  return GetRequest(url);
};

// * Return information about a choice on a poll
const GetChoice = async (pid, cid) => {
  const url = `${REACT_APP_BASE_URL}/pollish/polls/${pid}/choices/${cid}/`;
  return GetRequest(url);
};

// * Return polls owned by a given user
const GetUserPolls = async id => {
  const url = `${REACT_APP_BASE_URL}/core/users/${id}/polls/`;
  return GetRequest(url);
};

// * Return communities owned by a given user
const GetUserComms = async id => {
  const url = `${REACT_APP_BASE_URL}/core/users/${id}/communities/`;
  return GetRequest(url);
};

// * Return polls associated with a given community
const GetCommPolls = async id => {
  const url = `${REACT_APP_BASE_URL}/pollish/communities/${id}/`;
  return GetRequest(url);
};

const GetComments = async (uid, pid) => {
  const url = `http://${REACT_APP_BASE_URL}/core/users/${uid}/polls/${pid}/comments/`;
  return GetRequest(url);
};

const CheckFollowing = async (mid, uid) => {
  const url = `http://${REACT_APP_BASE_URL}/core/users/${mid}/following/?id=${uid}`;
  return GetRequest(url);
};

const FollowUser = async (mid, uid, follow) => {
  const access = await authStorage.getAccess();
  var config = {
    method: 'put',
    url: follow
      ? `http://${REACT_APP_BASE_URL}/core/users/${mid}/?unfollow=True&user_id=${uid}`
      : `http://${REACT_APP_BASE_URL}/core/users/${mid}/?user_id=${uid}`,
    headers: {
      Authorization: `JWT ${access}`,
    },
  };

  axios(config).catch(function (error) {
    console.log(error);
  });
};

// * Query API with a get request to given **url** endpoint
const GetRequest = async url => {
  const access = await authStorage.getAccess();
  const res = await axios.get(url, {headers: {Authorization: `JWT ${access}`}});
  return res.data;
};

const GetPollVotes = async pid => {
  const data = await GetPoll(pid);
  var votes = 0;
  await data.choices.map(choice => {
    votes += choice.num_votes;
  });
  return votes;
};

export {
  GetUser,
  GetPoll,
  GetChoice,
  GetUserPolls,
  GetUserComms,
  GetCommPolls,
  GetFollowing,
  GetPollFeed,
  GetComments,
  GetFollowers,
  GetPollVotes,
  CheckFollowing,
  FollowUser,
};
