import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import VoteBar from './VoteBar';

const Div = styled.div`
  width: 100%;
  background: darkkhaki;
  border-radius: 4px;
  min-height: 100px;
  margin-bottom: 10px;
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.postBorder};
      :hover {
        border-color: ${theme.gray2};
      }
    `}

  position: relative;
  ${({ theme }) =>
    css`
      background: ${theme.gray4};
    `}
  a:hover {
    text-decoration: underline;
  }
`;

const Top = styled.div`
  margin-left: 24px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Subreddit = styled.a`
  color: ${({ theme }) => theme.gray0};
  font-weight: 600;
  margin-right: 3px;
`;

const Poster = styled.a`
  color: inherit;
  margin-right: 3px;
`;

const Date = styled.span``;

const PostContent = styled.div`
  padding: 8px 0 0 40px;
`;

const Title = styled.h3`
  font-weight: 600;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
    `}
`;

const Post = ({ post }) => {
  return (
    <Div>
      <VoteBar />
      <PostContent>
        <Top>
          <Link to="" component={Subreddit}>
            r/{post.subreddit}
          </Link>
          <Link to="" component={Poster}>
            Posted by u/{post.user}
          </Link>
          <Date>{post.createdAt}</Date>
        </Top>
        <Title>{post.title}</Title>
        <p></p>
      </PostContent>
    </Div>
  );
};

export default Post;
