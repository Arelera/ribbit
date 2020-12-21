import axios from 'axios';
import { baseUrl } from './config';

const getByPost = async (post) => {
  const resposne = await axios.get(`${baseUrl}/comments/${post}`);
  return resposne.data;
};

const commentOn = async (post, comment) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.post(`${baseUrl}/comments/${post}`, comment, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const commentService = {
  getByPost,
  commentOn,
};

export default commentService;
