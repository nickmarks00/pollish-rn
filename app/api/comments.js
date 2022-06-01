import axios from 'axios';
import authStorage from '../auth/storage';
import {BASE_URL} from '@env';

// * Return a user given a user id
const GetUser = async uid => {
  const url = `${BASE_URL}/core/users/${uid}/`;
  return GetRequest(url);
};

// * Return a list of users a user follows given a user id
const GetFollowing = async uid => {
  const url = `${BASE_URL}/core/users/${uid}/following/`;
  return GetRequest(url);
};

// * Return information about a poll
const GetPoll = async pid => {
  const url = `${BASE_URL}/pollish/polls/${pid}/`;
  return GetRequest(url);
};

// * Return information about a choice on a poll
const GetChoice = async (pid, cid) => {
  const url = `${BASE_URL}/pollish/polls/${pid}/choices/${cid}/`;
  return GetRequest(url);
};

// * Return polls owned by a given user
const GetUserPolls = async id => {
  const url = `${BASE_URL}/core/users/${id}/polls/`;
  return GetRequest(url);
};

// * Return communities owned by a given user
const GetUserComms = async id => {
  const url = `${BASE_URL}/core/users/${id}/communities/`;
  return GetRequest(url);
};

// * Return polls associated with a given community
const GetCommPolls = async id => {
  const url = `${BASE_URL}/pollish/communities/${id}/`;
  return GetRequest(url);
};

// * Query API with a get request to given **url** endpoint
const GetRequest = async url => {
  const access = await authStorage.getAccess();
  const res = await axios.get(url, {headers: {Authorization: access}});
  return res.data;
};

export {
  GetUser,
  GetPoll,
  GetChoice,
  GetUserPolls,
  GetUserComms,
  GetCommPolls,
  GetFollowing,
};
