import axiosClient from '../apiClient';

const polls = '/pollish/polls';
const communities = '/pollish/communities';

export function getPoll(pid) {
  return axiosClient.get(`${polls}/${pid}/`);
}

export function getChoice(pid, cid) {
  return axiosClient.get(`${polls}/${pid}/choices/${cid}/`);
}

export function getCommPolls(id) {
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

export async function getPollVotes(pid) {
  const data = await getPoll(pid);
  var votes = 0;
  await data.data.choices.map(choice => {
    votes += choice.num_votes;
  });
  return votes;
}
