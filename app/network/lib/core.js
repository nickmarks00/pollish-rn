import axiosClient from "../apiClient";

const users = '/core/users'

export function getUser(uid){
    return axiosClient.get(`${users}/${uid}/`);
}

export function getFollowers(uid){
    return axiosClient.get(`${users}/${uid}/followers/`);
}

export function getFollowing(uid){
    return axiosClient.get(`${users}/${uid}/following/`);
}

export function getComments(uid, pid){
    return axiosClient.get(`${users}/${uid}/polls/${pid}/comments/`);
}

export function getUserPolls(id){
    return axiosClient.get(`${users}/${id}/polls/`);
}

export function getUserComms(id){
    return axiosClient.get(`${users}/${id}/communities/`);
}

export function checkFollowing(mid, uid){
    return axiosClient.get(`${users}/${mid}/following/?id=${uid}`);
}

export function searchUsers(query){
    return axiosClient.get(`${users}/?search=${query}`);
}

export function followUser(mid, uid, follow){
    return axiosClient.put(follow ? `${users}/${mid}/?unfollow=True&user_id=${uid}` : `${users}/${mid}/?user_id=${uid}`);
}