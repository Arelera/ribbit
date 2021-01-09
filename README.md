# ribbit

[Visit Site](https://theribbit.herokuapp.com/)

Ribbit is a reddit clone made with the PERN stack.

Users can login/signup, create and join communities, create posts in them, comment and vote on the posts/comments, edit or delete their own posts and comments.

User authentication is handled by sending a token created by jsonwebtoken to the frontend which gets stored in local storage. A new token is sent on every refresh, login and signup.

Redux store holds user, posts, comments and modal state.

The nested comments under the posts are rendered recursively by first looping through the comments without a parent, then adding comments whose parent is that comment under it with a left margin which makes up a comment group. We also check if a child comment also has any children and if it does, we go through the same thing again by rendering another comment group.

Votes are stored in postVotes and commentVotes tables where each rows has a creator, post and an isUpvote column. Voting is handled by sending a post request to the backend with the post and user id, an isUpvote variable which will be 1 if it's an upvote and -1 if not.

The user karma is calculated by summing that users posts and comments votes and adding them together.

Infinite scrolling is done with the IntersectionObserver API by adding +1 to the page state every time the 1x1 div enters the screen, which then triggers a useEffect hook to make a new get request to the backend. If the returned list has no posts (which would mean we got all of them), we stop making any more requests.

### Frontend

- ReactJS
- Redux, react-redux, redux-thunk
- Styled Components
- Axios
- Date-fns

### Backend

- Express
- Pg (node-postgres)
- Bcryptjs
- Jsonwebtoken
