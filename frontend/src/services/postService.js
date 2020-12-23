import axios from 'axios';
import { baseUrl } from './config';

const getAll = async (params) => {
  const response = await axios.get(`${baseUrl}/posts`, { params });
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/posts/${id}`);
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

const editOne = async (post, content, token) => {
  const response = await axios.patch(
    `${baseUrl}/posts/${post}`,
    { content },
    { headers: { Authorization: token } }
  );
  return response.data;
};

const deleteOne = async (post, token) => {
  const response = await axios.delete(`${baseUrl}/posts/${post}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const postService = {
  getAll,
  getById,
  createOne,
  editOne,
  deleteOne,
};

export default postService;
