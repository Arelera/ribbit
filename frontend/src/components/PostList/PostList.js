import { useEffect, useRef, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useQuery from '../../hooks/useQuery';
import { clearPosts, getAllPosts, voteOnPost } from '../../store/actions/posts';
import Post from './Post/Post';
import PostFormRedirect from './PostFormRedirect';
import PostSorter from './PostSorter/PostSorter';

const Div = styled.div`
  width: 640px;
  ${({ theme }) => theme.tablet} {
    width: 100%;
  }
`;

const Observer = styled.div`
  height: 1px;
  width: 1px;
`;

const PostList = ({ showUserForm }) => {
  const dispatch = useDispatch();
  const { subribbit } = useParams();
  const sort = useQuery().get('sort');
  const t = useQuery().get('t'); // time range for top sort
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const [page, setPage] = useState(0);
  const currDate = new Date();
  const observeRef = useRef();

  const voteHandler = (post) => (isUpvote) => {
    dispatch(voteOnPost(post.id, isUpvote, post.isUpvote)).then((res) => {
      if (res === 'No user') {
        showUserForm('login');
      }
    });
  };

  useEffect(() => {
    dispatch(clearPosts());
    setPage(0);
  }, [sort, t, subribbit]);

  useEffect(() => {
    if (page !== 'done') {
      dispatch(getAllPosts({ subribbit, t, page })).then((res) => {
        if (res === 'done') {
          setPage(res);
        }
      });
    }
  }, [page, subribbit, t, dispatch]);

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0 && page !== 'done') {
        observer.unobserve(observeRef.current);
        setPage(page + 1);
      }
    });
  }, {});

  useEffect(() => {
    if (observeRef.current && page !== 'done') {
      observer.observe(observeRef.current);
    }
  }, [posts]);

  return (
    <Div>
      <PostFormRedirect />
      <PostSorter />
      {posts.map((post, i) => {
        // plaching an observable between the posts
        if (posts.length - 1 === i) {
          const items = (
            <Fragment key="observable">
              <Observer ref={observeRef}></Observer>
              <Post
                post={post}
                userId={user?.id}
                voteHandler={voteHandler(post)}
                currDate={currDate}
                key={post.id}
              />
            </Fragment>
          );

          return items;
        }
        return (
          <Post
            post={post}
            userId={user?.id}
            voteHandler={voteHandler(post)}
            currDate={currDate}
            key={post.id}
          />
        );
      })}
    </Div>
  );
};

export default PostList;
