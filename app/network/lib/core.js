import axiosClient from "../apiClient";

const users = '/core/users'

export function getUser(uid){
    return axiosClient.get(`${users}/${uid}/`);
}