import axios from 'axios';
import { baseUrl } from './config';

const getOne = async (name) => {
  const response = await axios.get(`${baseUrl}/subribbits/${name}`);
  return response.data;
};

const getTop = async (limit) => {
  const response = await axios.get(`${baseUrl}/subribbits/top/${limit}`);
  return response.data;
};

const getSimilar = async (name, limit) => {
  const response = await axios.get(`${baseUrl}/subribbits/similar/${name}`, {
    params: { limit },
  });
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

const joinOne = async (subribbit) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.patch(
    `${baseUrl}/subribbits/join/${subribbit}`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const exitOne = async (subribbit) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.patch(
    `${baseUrl}/subribbits/exit/${subribbit}`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const subribbitService = {
  getOne,
  getTop,
  getSimilar,
  createOne,
  joinOne,
  exitOne,
};

export default subribbitService;
