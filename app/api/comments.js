import axios from 'axios'
import authStorage from '../auth/storage'
import {BASE_URL} from '@env';

const base = BASE_URL;

// * Return a user given a user id
const GetUser = async (uid) => {
    const url = `http://${base}/core/users/${uid}/`
    return GetRequest(url);
}

// * Return information about a poll
const GetPoll = async (pid) => {
    const url = `http://${base}/pollish/polls/${pid}/`
    return GetRequest(url);
}


// * Return information about a choice on a poll
const GetChoice = async (pid, cid) => {
    const url = `http://${base}/pollish/polls/${pid}/choices/${cid}/`
    return GetRequest(url);
}

// * Return polls owned by a given user
const GetUserPolls = async (id) => {
    const url = `http://${base}/core/users/${id}/polls/`
    return GetRequest(url);
}

// * Return communities owned by a given user
const GetUserComms = async (id) => {
    const url = `http://${base}/core/users/${id}/communities/`
    return GetRequest(url);
}

// * Return polls associated with a given community
const GetCommPolls = async (id) => {
    const url = `http://${base}/pollish/communities/${id}/`
    return GetRequest(url);
}

// * Query API with a get request to given **url** endpoint
const GetRequest = async (url) => {
    const access = await authStorage.getAccess()
    const res = await axios.get(url, {headers: {Authorization: access} })
    return res.data
}

export { GetUser, GetPoll, GetChoice, GetUserPolls, GetUserComms, GetCommPolls };