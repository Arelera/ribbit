import axios from 'axios';
import { baseUrl } from './config';

const getByPost = async (post) => {
  const resposne = await axios.get(`${baseUrl}/comments/${post}`);
  return resposne.data;
};

// id can be a post or comment
const commentOn = async (id, comment, token) => {
  const response = await axios.post(`${baseUrl}/comments/${id}`, comment, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const editOne = async (id, content, token) => {
  const response = await axios.patch(`${baseUrl}/comments/${id}`, content, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteOne = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/comments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const commentService = {
  getByPost,
  commentOn,
  editOne,
  deleteOne,
};

export default commentService;
