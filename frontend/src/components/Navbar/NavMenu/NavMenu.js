import styled, { css } from 'styled-components';
import ChevBotIcon from '../../../icons/ChevBotIcon';
import NavMenuItems from './NavMenuItems';
import useVisible from '../../../hooks/useVisible';

const Div = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 270px;
  background: transparent;
  height: 36px;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid transparent;
  border-radius: 4px;

  padding: 0 15px;
  ${(props) =>
    css`
      color: ${props.theme.gray0};
      border-color: ${props.expanded ? props.theme.postBorder : 'transparent'};
      :hover {
        border-color: ${props.theme.postBorder};
    `}
`;

const Username = styled.h2`
  font-size: ${({ theme }) => theme.fontMed};
`;

const ChevBot = styled.div`
  height: 20px;
  color: ${({ theme }) => theme.gray2};
`;

const NavMenu = () => {
  const [expanded, setExpanded, refVisible] = useVisible();

  return (
    <Div ref={refVisible}>
      <Button
        type="button"
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <Username>u/{user.username}</Username>
        <ChevBot>
          <ChevBotIcon />
        </ChevBot>
      </Button>
      {expanded && <NavMenuItems />}
    </Div>
  );
};

const user = {
  username: 'Bobby',
};

export default NavMenu;
