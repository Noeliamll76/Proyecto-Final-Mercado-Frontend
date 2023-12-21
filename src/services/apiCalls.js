import axios from 'axios';
const hostURL = "http://localhost:8000/api"


export const registerUser = async (body) => {
    return await axios.post(`${hostURL}/register`, body);
 }

 export const logUser = async (body) => {
    return await axios.post(`${hostURL}/login`, body);
 }

 export const getUser = async (token) => {
   return await axios.get(`${hostURL}/users/profile`, { headers: { Authorization: `Bearer ${token}` } });
}

export const updateUser = async (body, token) => {
   return await axios.put(`${hostURL}/users/update`, body, { headers: { Authorization: `Bearer ${token}`, }, })
}

export const profileStore = async (token) => {
   return await axios.get(`${hostURL}/stores/profile`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getGuilds = async () => {
   return await axios.get(`${hostURL}/allGuilds`, );
}
