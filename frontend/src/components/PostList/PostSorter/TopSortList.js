import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useQuery from '../../../hooks/useQuery';
import ChevBotIcon from '../../../icons/ChevBotIcon';
import useVisible from '../../../hooks/useVisible';

const Div = styled.div`
  position: relative;
`;

const TopSortBtn = styled.button`
  border: none;
  border-radius: 50px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 32px;

  ${(props) =>
    css`
      font-size: ${props.theme.fontMed};
      background: ${props.theme.gray3};
      color: ${props.theme.gray0};
    `};
`;

const Icon = styled.div`
  height: 18px;
  margin-right: 4px;
`;

const SortList = styled.div`
  position: absolute;
  top: 20px;
  border-radius: 4px;
  width: 100px%;
  left: 0;
  z-index: 10;
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.postBorder};
      background: ${theme.gray4};
    `}
`;

const ListItem = styled.div`
  padding: 8px;
  text-align: left;
  font-weight: 500;
  white-space: nowrap;
  ${(props) =>
    css`
      font-size: ${props.theme.fontMed};
      color: ${props.active ? props.theme.gray0 : 'inherit'};
      :hover {
        background: ${props.theme.gray3};
      }
    `}
`;

const TopSortList = () => {
  const time = useQuery().get('t');
  const [expanded, setExpanded, expandedRef] = useVisible(false);
  const [chosenItem, setChosenItem] = useState(
    (time && time[0].toUpperCase() + time.slice(1)) || 'Today'
  ); // just for displaying it on the button
  const { subribbit } = useParams();

  return (
    <Div ref={expandedRef}>
      <TopSortBtn onClick={() => setExpanded(!expanded)}>
        <span>{chosenItem}</span>
        <Icon>
          <ChevBotIcon />
        </Icon>
      </TopSortBtn>
      {expanded && (
        <SortList>
          {items(subribbit).map((item, i) => (
            <Link to={item.link} key={i}>
              <ListItem
                onClick={() => setChosenItem(item.text)}
                active={chosenItem === item.text}
              >
                {item.text}
              </ListItem>
            </Link>
          ))}
        </SortList>
      )}
    </Div>
  );
};

const items = (subribbit = '') => [
  {
    text: 'Today',
    link: `${subribbit && `/r/${subribbit}`}?sort=top&t=today`,
  },
  {
    text: 'This Week',
    link: `${subribbit && `/r/${subribbit}`}?sort=top&t=week`,
  },
  {
    text: 'This Month',
    link: `${subribbit && `/r/${subribbit}`}?sort=top&t=month`,
  },
  {
    text: 'This Year',
    link: `${subribbit && `/r/${subribbit}`}?sort=top&t=year`,
  },
  {
    text: 'All Time',
    link: `${subribbit && `/r/${subribbit}`}?sort=top&t=all`,
  },
];

export default TopSortList;
