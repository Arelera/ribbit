import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import subribbitService from '../../../services/subribbitService';
import Button from '../../reusable/Button';

const Aside = styled.aside`
  flex-shrink: 0;
  width: 312px;
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
  a {
    font-weight: 600;
  }
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

const Members = styled.div`
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
  const [topSubribbits, setTopSubribbits] = useState([]);

  useEffect(() => {
    subribbitService.getTop(5).then((res) => {
      setTopSubribbits(res);
    });
  }, []);

  return (
    <Aside>
      <Box>
        <TrendTitle>Top Communities</TrendTitle>
        {topSubribbits.map((topSub, i) => (
          <Subreddit key={i}>
            <Left>
              <Link to={`/r/${topSub.name}`}>r/{topSub.name}</Link>
              <Members>{topSub.memberCount} members</Members>
            </Left>
            <JoinButton>JOIN</JoinButton>
          </Subreddit>
        ))}
      </Box>
    </Aside>
  );
};

export default Side;
