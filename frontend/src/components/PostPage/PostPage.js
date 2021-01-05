import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import postService from '../../services/postService';
import Comments from './Comments/Comments';
import PostContent from './PostContent';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../store/actions/comments';
import { voteOnPost } from '../../store/actions/posts';

const Div = styled.div`
  max-width: 1280px;
  padding: 20px 24px;
`;

const SubribbitBanner = styled.div`
  height: 80px;
  top: 0;
  background: ${({ theme }) => `${theme.sec2}`};
`;

const SubrContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Subribbit = styled.span`
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.white1};
  margin-left: 24px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 740px;
  border-radius: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.gray4};
`;

const PostPage = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const { id } = useParams(); // post id
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    // getting post data
    postService.getById(id).then((res) => {
      setPost(res);
    });

    dispatch(getComments(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post && comments) {
      setLoading(false);
    }
  }, [post, comments]);

  const voteHandler = (post) => (isUpvote) => {
    if (isLoggedIn()) {
      dispatch(voteOnPost(post.id, isUpvote, post.isUpvote)).then((res) => {
        setPost({
          ...post,
          points: +post.points + getVoteChange(post.isUpvote, isUpvote),
          isUpvote: post.isUpvote === isUpvote ? null : isUpvote,
        });
      });
    }
  };

  if (loading) return 'ok';
  return (
    <>
      <SubribbitBanner>
        <Link to={`/r/${post.subribbit}`}>
          <SubrContainer>
            <Subribbit>r/{post.subribbit}</Subribbit>
          </SubrContainer>
        </Link>
      </SubribbitBanner>
      <Div>
        <Container>
          <PostContent
            post={post}
            setPost={setPost}
            commentsLength={comments.length}
            voteHandler={voteHandler}
          />
          <Comments isLoggedIn={isLoggedIn} comments={comments} />
        </Container>
      </Div>
    </>
  );
};

const getVoteChange = (oldVote, newVote) => {
  if (oldVote && oldVote === newVote) {
    return -newVote;
  } else if (oldVote && oldVote !== newVote) {
    return 2 * newVote;
  } else {
    return newVote;
  }
};

export default PostPage;
