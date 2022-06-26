import axiosClient from "../apiClient";

const polls = '/pollish/polls'

export function getPoll(pid){
    return axiosClient.get(`${polls}/${pid}/`);
}