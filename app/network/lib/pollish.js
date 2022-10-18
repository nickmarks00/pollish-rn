import axiosClient from '../apiClient';

const polls = '/pollish/polls';
const communities = '/pollish/communities';

export function getPoll(pid) {
  return axiosClient.get(`${polls}/${pid}/`);
}

export function registerVote(id, uid, un_cid, cid) {
  return axiosClient.patch(`${polls}/${id}/vote/?user_id=${uid}`, {"unvote_id": un_cid, "vote_id": cid})
}

export function getChoice(pid, cid) {
  return axiosClient.get(`${polls}/${pid}/choices/${cid}/`);
}

export function getCommPolls(id) {
  return axiosClient.get(`${communities}/${id}/`);
}

export function getEachUserVote(pid) {
  return axiosClient.get(`${polls}/${pid}/voting/`)
}

export function getCommunities() {
  return axiosClient.get(`${communities}/`);
}

export function getCommuntiy(id) {
  return axiosClient.get(`${communities}/${id}/`);
}

export function getPollFeed(num) {
  return axiosClient.get(`${polls}/?page=${num}`);
}

export function searchPolls(query) {
  return axiosClient.get(`${polls}/?search=${query}`);
}

export function searchCommunities(query) {
  return axiosClient.get(`${communities}/?search=${query}`);
}

export function checkVote(pid) {
  return axiosClient.get(`${polls}/${pid}/`);
}

export function followCommunity(cid, uid) {
  return axiosClient.put(`${communities}/${cid}/?user_id=${uid}`)
}

export function createCommunity(data) {
  return axiosClient.post(`${communities}/`, data)
}

export function assignToComm(cid, pid) {
  return axiosClient.put(`${communities}/${cid}/?poll_id=${pid}`)
}

export function deleteComment(pid, cid) {
  return axiosClient.delete(`${polls}/${pid}/comments/${cid}/`);
}

export function deletePoll(pid) {
  return axiosClient.delete(`${polls}/${pid}/`);
}

export function updateProfilePic(data) {
  return axiosClient.patch(`/pollish/profiles/me/`, data);
}

export async function getPollVotes(pid) {
  const data = await getPoll(pid);
  var votes = 0;
  await data.data.choices.map(choice => {
    votes += choice.num_votes;
  });
  return votes;
}
