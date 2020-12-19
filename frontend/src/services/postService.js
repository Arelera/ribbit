import axios from 'axios';
import { baseUrl } from './config';

const getAll = async (order) => {
  const response = await axios.get(`${baseUrl}/posts`, { params: { order } });
  return response.data;
};

const getBySub = async (sub, order) => {
  const response = await axios.get(`${baseUrl}/posts/${sub}`, {
    params: { order },
  });
  return response.data;
};

const createOne = async (post) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`${baseUrl}/posts`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const postService = {
  getAll,
  createOne,
  getBySub,
};

export default postService;
