import axios from 'axios';
import { baseUrl } from './config';

const getAll = async (params, token) => {
  const response = await axios.get(`${baseUrl}/posts`, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getById = async (id) => {
  const userJson = localStorage.getItem('user');
  let token;
  if (userJson) {
    token = JSON.parse(userJson).token;
  }
  const response = await axios.get(`${baseUrl}/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
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

const editOne = async (post, content, token) => {
  const response = await axios.patch(
    `${baseUrl}/posts/${post}`,
    { content, editedAt: new Date().toISOString() },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const deleteOne = async (post, token) => {
  const response = await axios.delete(`${baseUrl}/posts/${post}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const voteOn = async (post, isUpvote, token) => {
  const response = await axios.post(
    `${baseUrl}/posts/vote/${post}`,
    { isUpvote },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const postService = {
  getAll,
  getById,
  createOne,
  editOne,
  deleteOne,
  voteOn,
};

export default postService;
