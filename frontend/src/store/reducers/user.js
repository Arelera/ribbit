// state = { username: string, karma: number }
const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'SIGNUP':
    case 'INIT_USER':
      return action.user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default reducer;
