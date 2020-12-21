import { sub } from 'date-fns';
import postService from '../../services/postService';

export const getAllPosts = ({ subribbit, sort, t }) => {
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

    const posts = await postService.getAll({
      subribbit,
      sort,
      timeStart,
    });
    dispatch({
      type: 'GET_ALL_POSTS',
      posts,
    });
  };
};
