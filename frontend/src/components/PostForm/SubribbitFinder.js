import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import subribbitService from '../../services/subribbitService';

const SubDropdown = styled.div`
  position: relative;
  width: 200px;
`;

const SubInput = styled.input`
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  font-weight: 600;
  outline: none;
  ${({ theme }) =>
    css`
      ${theme.box()}
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
      ::placeholder {
        color: ${theme.gray0};
      }
    `}
`;

const SubList = styled.div`
  position: absolute;
  ${({ theme }) => theme.box()}
  border-top: none;
  border-radius: 0 0 4px 4px;
  top: 34px;
  width: 100%;
`;

const SubItem = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-weight: 600;
  padding: 8px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontMed};
      :hover {
        background: ${theme.gray3};
      }
    `}
`;

const Members = styled.span`
  display: block;
  font-weight: 400;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const SubError = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontMed};
  margin: 0 0 8px 8px;
`;

const SubribbitFinder = ({ sub, setSub, error }) => {
  const [subs, setSubs] = useState([]);
  const [subsExpanded, setSubsExpanded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      subribbitService.getSimilar(sub.trim()).then((res) => {
        setSubs(res || []);
      });
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [sub]);

  const subClickHandler = (e) => {
    const subName = e.target.innerText.split('/')[1];
    setSub(subName);
  };

  return (
    <>
      <SubDropdown>
        <SubInput
          onFocus={() => setSubsExpanded(true)}
          onBlur={() => setSubsExpanded(false)}
          value={sub}
          onChange={(e) => setSub(`${e.target.value}`)}
          placeholder="Choose a community"
          maxLength="20"
        />
        {subsExpanded && (
          <SubList>
            {subs.map((sub) => (
              <SubItem
                type="button"
                onMouseDown={subClickHandler}
                key={sub.name}
              >
                r/{sub.name}
                <Members>{sub.memberCount} members</Members>
              </SubItem>
            ))}
          </SubList>
        )}
      </SubDropdown>
      <SubError>{error}</SubError>
    </>
  );
};

export default SubribbitFinder;
