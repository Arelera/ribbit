import axios from 'axios';
import { baseUrl } from './config';

const initUser = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/users/refresh`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log('INIT ERROR: ', error);
  }
};

const loginUser = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const signupUser = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/users/signup`, user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const userService = { initUser, loginUser, signupUser };

export default userService;
