import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CommentIcon from '../../icons/CommentIcon';
import VoteBar from '../MainContent/PostList/Post/VoteBar';

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

const Poster = styled.div`
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

const PostContent = ({ post }) => {
  return (
    <Div>
      <Content>
        <VoteBar post={post} />
        <Post>
          <Poster>
            Posted by <Link to="/">u/{post.user}</Link>
          </Poster>
          <Title>{post.title}</Title>
          {post.content.split('\n').map((c, i) => (
            <P key={i}>{c}</P>
          ))}
          <Bottom>
            <Icon>
              <CommentIcon />
            </Icon>
            <span>{post.comments.length} Comments</span>
          </Bottom>
        </Post>
      </Content>
    </Div>
  );
};

export default PostContent;
