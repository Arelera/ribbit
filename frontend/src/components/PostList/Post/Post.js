import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import BottomBar from './BottomBar';
import TopBar from './TopBar';
import VoteBar from './VoteBar';

const Div = styled.div`
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  max-height: 500px;
  ${({ theme }) =>
    css`
      ${theme.box()}
      :hover {
        border-color: ${theme.gray2};
      }
    `}

  position: relative;
  a:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  padding: 8px 0 0 40px;
  margin-left: 4px;
`;

const Title = styled.h3`
  font-weight: 600;
  margin: 0 8px;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      :hover {
        text-decoration: underline ${theme.gray2};
      }
    `}
`;

const TextContainer = styled.div`
  padding: 5px 8px 10px;
  max-height: 250px;
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 60%, transparent);
`;

const P = styled.p`
  line-height: 21px;
  padding: 12px 4px 4px 0;
  :first-child {
    padding-top: 0;
  }
  :last-child {
    padding-bottom: 0;
  }
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
    `}
`;

const Post = ({ post, currDate, voteHandler }) => {
  return (
    <Div>
      <VoteBar
        votes={post.votes}
        userVote={post.isUpvote}
        voteHandler={voteHandler}
      />
      <Content>
        <TopBar post={post} currDate={currDate} />
        <Link to={`/r/${post.subribbit}/${post.id}`}>
          <Title>{post.title}</Title>
        </Link>
        <TextContainer>
          {post.content.split('\n').map((p, i) => (
            <P key={i}>{p}</P>
          ))}
        </TextContainer>
        <BottomBar
          postId={post.id}
          sub={post.subribbit}
          commentCount={post.commentCount}
        />
      </Content>
    </Div>
  );
};

export default Post;
