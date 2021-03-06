import userService from '../../services/userService';

export const initUser = () => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const response = await userService.initUser(user.token);
      localStorage.setItem('user', JSON.stringify(response));
      if (response) {
        dispatch({
          type: 'INIT_USER',
          user: response,
        });
      }
    }
  };
};

// this can be used when backend returns a modified user
// and we dont wanna make an extra request with initUser
// for example: joining or exiting subribbits
export const setUser = (newUser) => {
  return async (dispatch) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch({
      type: 'SET_USER',
      user: newUser,
    });
  };
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

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
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
