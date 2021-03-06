import axiosClient from "../apiClient";

const users = '/core/users'

export function getUser(uid){
    return axiosClient.get(`${users}/${uid}/`);
}

export function getCuratedFeed(uid) {
    return axiosClient.get(`${users}/${uid}/feed/`);
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

export async function commentAPI(uid, pid, text, voteId, myID){
    try {
        const response = await axiosClient.post(`${users}/${uid}/polls/${pid}/comments/`,{
            choice_id: voteId ? voteId : 1,
            comment_text: text,
            user_id: myID,
        }) 
        if (response.status === 200) {
            return response;
          }
    } catch (e) {
        Promise.resolve('Incorrect username or password');
    }
};