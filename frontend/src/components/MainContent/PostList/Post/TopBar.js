import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Top = styled.div`
  margin: 0 8px 8px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Subreddit = styled.a`
  color: ${({ theme }) => theme.gray0};
  font-weight: 700;
  margin-right: 3px;
`;

const Poster = styled.a`
  color: inherit;
  margin-right: 3px;
`;

const TopBar = ({ post }) => {
  return (
    <Top>
      <Link to="" component={Subreddit}>
        r/{post.subreddit}
      </Link>
      Posted by{' '}
      <Link to="" component={Poster}>
        u/{post.user}
      </Link>
      <span>{post.createdAt}</span>
    </Top>
  );
};

export default TopBar;
