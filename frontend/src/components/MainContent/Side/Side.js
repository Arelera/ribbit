import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button from '../../reusable/Button';

const Aside = styled.aside`
  flex-shrink: 0;
  width: 312px;
  height: 300px;
`;
const Box = styled.div`
  border-radius: 4px;
  padding: 12px;

  ${({ theme }) => theme.box()};
`;

const TrendTitle = styled.h2`
  letter-spacing: 0.5px;
  padding-bottom: 12px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontMed};
    `}
`;

const Left = styled.div`
  width: 144px;
`;

const Subreddit = styled.div`
  padding: 12px 0 4px 0;
  display: flex;
  justify-content: space-between;

  a:hover {
    text-decoration: underline;
  }

  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontSmall};
    `};
`;

const Members = styled.p`
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSmall};
    `}
`;

const JoinButton = styled(Button)`
  padding: 4px 9px;
  width: 100%;
  height: 32px;
  width: 106px;
`;

const Side = () => {
  return (
    <Aside>
      <Box>
        <TrendTitle>Trending Communities</TrendTitle>
        {trends.map((trend) => (
          <Subreddit>
            <Left>
              <Link to={trend.link}>r/{trend.name}</Link>
              <Members>{trend.members} members</Members>
            </Left>
            <JoinButton>JOIN</JoinButton>
          </Subreddit>
        ))}
      </Box>
    </Aside>
  );
};

const trends = [
  {
    name: 'dogs',
    link: '/',
    members: 235241,
  },
  {
    name: 'cats',
    link: '/',
    members: 52341,
  },
  {
    name: 'birds',
    link: '/',
    members: 1489241,
  },
];

export default Side;
