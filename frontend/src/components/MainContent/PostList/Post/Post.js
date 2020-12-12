import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CommentIcon from '../../../../icons/CommentIcon';
import EllipsisIcon from '../../../../icons/EllipsisIcon';
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

const Text = styled.p`
  line-height: 21px;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
    `}
`;

const Post = ({ post }) => {
  return (
    <Div>
      <VoteBar />
      <Content>
        <TopBar post={post} />

        <Link to={`/r/${post.subreddit}/${post.id}`}>
          <Title>{post.title}</Title>
        </Link>

        <TextContainer>
          <Text>{post.content}</Text>
        </TextContainer>
        <BottomBar items={bottomBarItems(7)} />
      </Content>
    </Div>
  );
};

const bottomBarItems = (comments) => [
  {
    link: '/',
    icon: CommentIcon,
    text: `${comments} Comments`,
  },
  {
    link: '/',
    icon: EllipsisIcon,
    text: '',
  },
];

export default Post;
