import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { formatDistance, subDays } from 'date-fns';

const Top = styled.div`
  margin: 0 8px 8px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Subreddit = styled.span`
  color: ${({ theme }) => theme.gray0};
  font-weight: 700;
  margin-right: 3px;
`;

const Poster = styled.span`
  color: inherit;
  margin-right: 3px;
`;

const TopBar = ({ post, currDate }) => {
  return (
    <Top>
      <Link to={`/r/${post.subribbit}`}>
        <Subreddit>r/{post.subribbit}</Subreddit>
      </Link>
      Posted by{' '}
      <Link to="">
        <Poster>u/{post.user}</Poster>
      </Link>
      <span>{formatDistance(new Date(post.createdAt), currDate)} ago</span>
    </Top>
  );
};

export default TopBar;
