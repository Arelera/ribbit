import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useQuery from '../../hooks/useQuery';
import { getAllPosts, voteOnPost } from '../../store/actions/posts';
import Post from './Post/Post';
import PostFormRedirect from './PostFormRedirect';
import PostSorter from './PostSorter/PostSorter';

const Div = styled.div`
  width: 640px;
`;

const PostList = ({ showUserForm }) => {
  const dispatch = useDispatch();
  const { subribbit } = useParams();
  const sort = useQuery().get('sort');
  const t = useQuery().get('t'); // time range for top sort
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const currDate = new Date();

  useEffect(() => {
    dispatch(getAllPosts({ subribbit, t }));
  }, [sort, t, subribbit, dispatch]);

  const voteHandler = (post) => (isUpvote) => {
    dispatch(voteOnPost(post.id, isUpvote, post.isUpvote)).then((res) => {
      if (res === 'No user') {
        showUserForm('login');
      }
    });
  };

  return (
    <Div>
      <PostFormRedirect />
      <PostSorter />
      {posts.map((post) => (
        <Post
          post={post}
          userId={user?.id}
          voteHandler={voteHandler(post)}
          currDate={currDate}
          key={post.id}
        />
      ))}
    </Div>
  );
};

export default PostList;
