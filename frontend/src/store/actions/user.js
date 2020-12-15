import userService from '../../services/userService';

export const initUser = (user) => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    const user = JSON.parse(userJson);
    return {
      type: 'INIT_USER',
      user,
    };
  }
};

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
    const response = await userService.loginUser(user);
    if (response.error) {
      return dispatch({ type: 'SET_ERROR', error: response.error });
    }
    localStorage.setItem('user', JSON.stringify(response));
    dispatch({
      type: 'LOGIN',
      user: response,
    });
  };
};

export const signupUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
    const response = await userService.signupUser(user);
    if (response.error) {
      return dispatch({ type: 'SET_ERROR', error: response.error });
    }

    localStorage.setItem('user', JSON.stringify(response));
    dispatch({
      type: 'SIGNUP',
      user: response,
    });
  };
};
