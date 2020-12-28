import { useState } from 'react';
import styled, { css } from 'styled-components';
import SearchIcon from '../../../icons/SearchIcon';

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
  ${({ theme }) =>
    css`
      font-size: ${theme.fontMed};
      color: ${theme.gray0};
      background: ${theme.gray3};
      border: 1px solid ${theme.postBorder};
    `}
`;

const Icon = styled.div`
  height: 20px;
  position: absolute;
  top: 8px;
  left: 14px;
  color: ${({ theme }) => theme.gray2};
`;

const Search = () => {
  const [query, setQuery] = useState('');

  return (
    <Div>
      <Icon>
        <SearchIcon />
      </Icon>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
    </Div>
  );
};

export default Search;
