import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useQuery from '../../hooks/useQuery';
import { getAllPosts } from '../../store/actions/posts';
import Post from './Post/Post';
import PostFormRedirect from './PostFormRedirect';
import PostSorter from './PostSorter/PostSorter';

const Div = styled.div`
  width: 640px;
`;

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const sort = useQuery().get('sort');
  const t = useQuery().get('t'); // time range for top sort
  const { subribbit } = useParams();

  useEffect(() => {
    dispatch(getAllPosts({ subribbit, sort, t }));
  }, [sort, t, subribbit, dispatch]);

  const currDate = new Date();
  return (
    <Div>
      <PostFormRedirect />
      <PostSorter />
      {posts.map((post) => (
        <Post post={post} key={post.id} currDate={currDate} />
      ))}
    </Div>
  );
};

export default PostList;
