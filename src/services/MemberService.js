import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/members';

export const listMembers = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createMember = (member) => {
    return axios.post(REST_API_BASE_URL, member);
}

export const getMember = (memberId) => {
    return axios.get(REST_API_BASE_URL + '/' + memberId );
}

export const updateMember = (memberId, member) => {
    return axios.put(REST_API_BASE_URL + '/' + memberId, member);
}

export const deleteMember = (memberId) => {
    return axios.delete(REST_API_BASE_URL + '/' + memberId);
}