import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CommentIcon from '../../icons/CommentIcon';
import VoteBar from '../PostList/Post/VoteBar';
import { formatDistance } from 'date-fns';

const Div = styled.div`
  margin: 0 auto;
  width: 100%;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
    `}
`;

const Content = styled.div`
  position: relative;
`;

const Post = styled.div`
  margin: 0 0 0 40px;
  padding: 10px 8px;
`;

const Top = styled.div`
  margin-bottom: 6px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontLargeXX};
`;

const P = styled.p`
  font-size: ${({ theme }) => theme.fontMed};
  padding: 12px 4px 12px 0;
`;

const Bottom = styled.div`
  font-weight: 700;
  margin-top: 8px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Icon = styled.div`
  vertical-align: top;
  display: inline-block;
  height: 16px;
  padding-right: 4px;
`;

const PostContent = ({ post, commentsLength }) => {
  return (
    <Div>
      <Content>
        <VoteBar post={post} />
        <Post>
          <Top>
            Posted by <Link to={`u/${post.username}`}>u/{post.username}</Link>{' '}
            {formatDistance(new Date(post.createdAt), new Date())} ago
          </Top>
          <Title>{post.title}</Title>
          {post.content.split('\n').map((c, i) => (
            <P key={i}>{c}</P>
          ))}
          <Bottom>
            <Icon>
              <CommentIcon />
            </Icon>
            <span>{commentsLength} Comments</span>
          </Bottom>
        </Post>
      </Content>
    </Div>
  );
};

export default PostContent;
