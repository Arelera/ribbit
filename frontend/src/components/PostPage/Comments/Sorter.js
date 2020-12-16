import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useQuery from '../../../hooks/useQuery';
import useVisible from '../../../hooks/useVisible';
import ChevBotIcon from '../../../icons/ChevBotIcon';

const Sort = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 700;
  margin: 16px 40px 0px 48px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmallX};
      border-bottom: 1px solid ${theme.postBorder};
    `};
`;

const Button = styled.button`
  background: none;
  height: 30px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  margin-left: 8px;
  ${({ theme }) =>
    css`
      color: ${theme.sec1};
      font-size: ${theme.fontSmall};
    `}
`;

const Icon = styled.div`
  display: inline-block;
  height: 20px;
  vertical-align: middle;
  padding: 0 8px;
`;

const SortList = styled.div`
  position: absolute;
  left: 50px;
  top: 24px;
  width: 100px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.gray4};
`;

const SortChoice = styled.button`
  color: blue;
  padding: 8px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-weight: 600;
  ${(props) =>
    css`
      font-size: ${props.theme.fontMed};
      color: ${props.isChosen ? props.theme.gray0 : props.theme.gray2};
    `}
`;

const Sorter = ({ comments, setComments }) => {
  const history = useHistory();
  const query = useQuery().get('sort');
  const [sortBy, setSortBy] = useState(query || 'top');
  const [expanded, setExpanded, expandedRef] = useVisible(false);

  const sortChangeHandler = (param) => {
    history.push(`?sort=${param.toLowerCase()}`);
    setSortBy(param.toLowerCase());
    setExpanded(false);
  };

  useEffect(() => {
    const sorter = (array) => {
      switch (sortBy) {
        case 'bottom':
          setComments([...array.sort((a, b) => a.upvotes - b.upvotes)]);
          break;
        case 'new':
          setComments([...array.sort((a, b) => a.createdAt - b.createdAt)]);
          break;
        case 'old':
          setComments([...array.sort((a, b) => b.createdAt - a.createdAt)]);
          break;
        default:
          setComments([...array.sort((a, b) => b.upvotes - a.upvotes)]);
      }
    };
    sorter(comments);
  }, [sortBy, query, setComments]);

  return (
    <Sort ref={expandedRef}>
      <div>SORT BY</div>
      <Button onClick={() => setExpanded(!expanded)}>
        {sortBy.toUpperCase()}
        <Icon>
          <ChevBotIcon />
        </Icon>
      </Button>
      {expanded && (
        <SortList>
          {choices.map((choice, i) => (
            <SortChoice
              onClick={() => sortChangeHandler(choice)}
              isChosen={sortBy.toLowerCase() === choice.toLowerCase()}
              key={i}
            >
              {choice}
            </SortChoice>
          ))}
        </SortList>
      )}
    </Sort>
  );
};

const choices = ['Top', 'Bottom', 'New', 'Old'];

export default Sorter;
