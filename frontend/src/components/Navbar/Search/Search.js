import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SearchIcon from '../../../icons/SearchIcon';
import subribbitService from '../../../services/subribbitService';

const Div = styled.div`
  margin: 0 16px;
  width: 100%;
  position: relative;
  ${({ theme }) => theme.mobileL} {
    margin: 0 0 0 8px;
  }
`;

const Input = styled.input`
  border-radius: 4px;
  padding: 0 16px 0px 40px;
  width: 100%;
  height: 36px;
  outline: none;

  ${({ theme }) =>
    css`
      font-size: ${theme.fontMed};
      color: ${theme.gray0};
      background: ${theme.gray3};
      border: 1px solid ${theme.postBorder};
      :hover,
      :focus {
        border-color: ${theme.gray0};
        background: ${theme.gray4};
      }
    `}
`;

const Icon = styled.div`
  height: 20px;
  position: absolute;
  top: 8px;
  left: 14px;
  color: ${({ theme }) => theme.gray2};
`;

const SubList = styled.div`
  position: absolute;
  top: 34px;
  width: 100%;
  border-radius: 0 0 4px 4px;
  max-height: 400px;
  overflow-y: scroll;
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.gray0};
      background: ${theme.gray4};
    `}
  border-top: 0;
`;

const SubItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  font-size: inherit;
  background: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
      :hover {
        background: ${theme.gray3};
      }
    `}
`;

const Members = styled.div`
  font-weight: 400;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [subs, setSubs] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        subribbitService.getSimilar(query).then((res) => {
          setSubs(res || []);
        });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <Div>
      <Icon>
        <SearchIcon />
      </Icon>
      <Input
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for subribbits"
      />
      {expanded && (
        <SubList>
          {subs.map((sub) => (
            <SubItem
              onMouseDown={() => history.push(`/r/${sub.name}`)}
              key={sub.name}
            >
              {sub.name}
              <Members>{sub.memberCount} Members</Members>
            </SubItem>
          ))}
        </SubList>
      )}
    </Div>
  );
};

export default Search;
