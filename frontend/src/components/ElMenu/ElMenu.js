import styled, { css } from 'styled-components';
import useVisible from '../../hooks/useVisible';
import EllipsisIcon from '../../icons/EllipsisIcon';

const Icon = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 14px;
`;

const Button = styled.button`
  font-weight: 700;
  background: none;
  border: none;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
  span {
    margin-left: 4px;
  }
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
      :hover {
        background: ${theme.gray3};
      }
    `}
`;

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 10;
  ${({ theme }) =>
    css`
      ${theme.box()}
    `}
  border-radius: 2px;
  overflow: hidden;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  width: 100%;
  text-align: left;
  padding: 8px;
  cursor: pointer;
  outline: none;

  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      :hover {
        background: ${theme.gray3};
      }
    `}
`;

const ElMenu = ({ items }) => {
  const [expanded, setExpanded, menuRef] = useVisible(false);

  return (
    <MenuContainer ref={menuRef}>
      <Button onClick={() => setExpanded(!expanded)}>
        <Icon>
          <EllipsisIcon />
        </Icon>
      </Button>
      {expanded && (
        <Menu>
          {items.map((item, i) => (
            <MenuItem onClick={item.onClick} key={i}>
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      )}
    </MenuContainer>
  );
};
export default ElMenu;
