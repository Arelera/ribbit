import axios from 'axios';
import { baseUrl } from './config';

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

const userService = { loginUser, signupUser };

export default userService;
