import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Bottom = styled.div`
  display: flex;
  align-items: center;

  height: 32px;
  font-weight: 700;
  margin-left: 4px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Item = styled.div`
  padding: 4px;
  border-radius: 2px;
  :hover {
    background: ${({ theme }) => `${theme.gray1}1A`};
  }
`;

const Icon = styled.a`
  padding-right: 4px;
  display: inline-block;
  height: 16px;
  vertical-align: middle;
  color: inherit;
`;

const BottomBar = ({ items }) => {
  return (
    <Bottom>
      {items.map((item, i) => (
        <Item key={i}>
          <Link to="/" component={Icon}>
            <item.icon />
          </Link>
          {item.text}
        </Item>
      ))}
    </Bottom>
  );
};

export default BottomBar;
