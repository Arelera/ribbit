import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useQuery from '../../../hooks/useQuery';
import GraphUpIcon from '../../../icons/GraphUpIcon';
import NewIcon from '../../../icons/NewIcon';
import TopSortList from './TopSortList';

const Div = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  ${({ theme }) =>
    css`
      ${theme.box()}
      color: ${theme.gray2};
    `}
`;

const SortLink = styled.div`
  border: none;
  border-radius: 50px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 32px;
  margin-right: 8px;

  ${(props) =>
    css`
      background: ${props.active ? props.theme.gray3 : 'none'};
      color: ${props.active ? props.theme.gray0 : 'inherit'};
      font-size: ${props.theme.fontMed};
      :hover {
        background: ${props.theme.gray3};
        color: ${props.theme.gray0};
      }
    `};
`;

const Icon = styled.div`
  height: 18px;
  margin-right: 4px;
`;

const PostSorter = ({ setPosts }) => {
  const sortQuery = useQuery().get('sort');
  // const timeQuery = useQuery().get('t');
  const [sortBy, setSortBy] = useState(!!sortQuery || 'new');

  useEffect(() => {
    setSortBy(sortQuery || 'new');
  }, [sortQuery]);

  return (
    <Div>
      <Link to="?sort=new">
        <SortLink active={'new' === sortBy}>
          <Icon>
            <NewIcon />
          </Icon>
          <span>New</span>
        </SortLink>
      </Link>
      <Link to="?sort=top&t=today">
        <SortLink active={'top' === sortBy}>
          <Icon>
            <GraphUpIcon />
          </Icon>
          <span>Top</span>
        </SortLink>
      </Link>
      {sortBy === 'top' && <TopSortList />}
    </Div>
  );
};

export default PostSorter;
