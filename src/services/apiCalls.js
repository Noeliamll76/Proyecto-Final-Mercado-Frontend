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
export const getStoresByGuild = async (id) => {
   return await axios.get(`${hostURL}/allStoresByGuild/${id}`);
}

export const getProductsByStore = async (id) => {
   return await axios.get(`${hostURL}/product/allProductsByStore/${id}`);
}

export const getImage_productById = async (id) => {
   return await axios.get(`${hostURL}/getImage_productById/${id}`);
}

export const createOrders = async (body, token) => {
   return await axios.post(`${hostURL}/order/register`, body, { headers: { Authorization: `Bearer ${token}`, }, })
}
export const ordersBasket = async (token) => {
   return await axios.get(`${hostURL}/order/basket`, { headers: { Authorization: `Bearer ${token}` } });
}