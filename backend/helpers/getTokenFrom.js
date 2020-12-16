const getTokenFrom = (req) => {
  const auth = req.get('Authorization');
  if (auth && auth.startsWith('Bearer ')) {
    return auth.substring(7);
  }
  return null;
};
module.exports = getTokenFrom;
