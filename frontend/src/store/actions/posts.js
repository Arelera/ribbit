import { sub } from 'date-fns';
import postService from '../../services/postService';

export const clearPosts = () => {
  return {
    type: 'CLEAR_POSTS',
  };
};

export const getAllPosts = ({ subribbit, t, page }) => {
  return async (dispatch) => {
    let [timeStart, now] = [null, new Date()];

    if (t === 'today') {
      timeStart = sub(now, { days: 1 });
    } else if (t === 'week') {
      timeStart = sub(now, { weeks: 1 });
    } else if (t === 'month') {
      timeStart = sub(now, { months: 1 });
    } else if (t === 'year') {
      timeStart = sub(now, { years: 1 });
    }

    let posts;
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const { token } = JSON.parse(userJson);
      posts = await postService.getAll({ subribbit, timeStart, page }, token);
    } else {
      posts = await postService.getAll({ subribbit, timeStart, page });
    }

    // if no posts come back, it means we got all of em
    if (posts.length === 0) {
      return 'done';
    }

    dispatch({
      type: 'GET_ALL_POSTS',
      posts,
      page,
    });
  };
};

export const editPost = (id, content) => {
  return async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const post = await postService.editOne(id, content, token);
    return post;
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    await postService.deleteOne(id, token);
    dispatch({ type: 'DELETE_POST', id });
    dispatch({ type: 'CLEAR_MODAL' });
  };
};

export const voteOnPost = (id, isUpvote, oldVote) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return 'No user';
    }

    const { token } = JSON.parse(userJson);
    postService.voteOn(id, isUpvote, token);
    dispatch({ type: 'VOTE_POST', id, isUpvote, oldVote });
  };
};
