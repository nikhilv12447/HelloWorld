import axios from 'axios';
import apiBaseUrls from "./const"

export default function (API_TYPE) {
    return {
        get: (endpoint) => {
            return axios.get(`${apiBaseUrls[API_TYPE]}${endpoint}`).then(({ data }) => data)
        },
        post: (endpoint, body) => {
            return axios.post(`${apiBaseUrls[API_TYPE]}${endpoint}`, body).then(({ data }) => data)
        }
    }
}

export const apiNames = {
    beta: "BETA"
}