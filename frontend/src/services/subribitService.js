import axios from 'axios';
import { baseUrl } from './config';

const getPosts = async (name) => {
  const response = await axios.get(`${baseUrl}/subribbits/${name}`);
  return response.data;
};

const createOne = async (subribbit) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`${baseUrl}/subribbits`, subribbit, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const subribbitService = { getPosts, createOne };

export default subribbitService;
