import axios from 'axios';
const hostURL = "http://localhost:8000/api"


export const registerUser = async (body) => {
    return await axios.post(`${hostURL}/register`, body);
 }

 export const logUser = async (body) => {
    return await axios.post(`${hostURL}/login`, body);
 }