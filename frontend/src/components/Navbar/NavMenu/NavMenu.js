import styled, { css } from 'styled-components';
import ChevBotIcon from '../../../icons/ChevBotIcon';
import NavMenuItems from './NavMenuItems';
import useVisible from '../../../hooks/useVisible';
import { useSelector } from 'react-redux';
import UfoIcon from '../../../icons/UfoIcon';
import { useLocation } from 'react-router-dom';
import CreateIcon from '../../../icons/CreateIcon';
import MessageIcon from '../../../icons/MessageIcon';
import CogIcon from '../../../icons/CogIcon';
import PopularIcon from '../../../icons/PopularIcon';
import GraphUpIcon from '../../../icons/GraphUpIcon';

const Div = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 270px;
  background: transparent;
  height: 36px;
  padding: 0 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) =>
    css`
      color: ${props.theme.gray0};
      border-color: ${props.expanded ? props.theme.postBorder : 'transparent'};
      :hover {
        border-color: ${props.theme.postBorder};
    `}
`;

const Text = styled.h2`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontMed};
`;

const ChevBot = styled.div`
  height: 20px;
  color: ${({ theme }) => theme.gray2};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  height: 22px;
  margin-right: 8px;
  color: ${({ theme }) => theme.sec2};
`;

const NavMenu = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [expanded, setExpanded, refVisible] = useVisible();
  const display = getPathsDisplay(location.pathname, user.username);

  return (
    <Div ref={refVisible}>
      <Button
        type="button"
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <Left>
          {display.icon && (
            <Icon>
              <display.icon />
            </Icon>
          )}
          <Text>{display.text}</Text>
        </Left>
        <ChevBot>
          <ChevBotIcon />
        </ChevBot>
      </Button>
      {expanded && <NavMenuItems />}
    </Div>
  );
};

const getPathsDisplay = (currPath, username) =>
  [
    {
      path: '/r/popular',
      icon: PopularIcon,
      text: 'Popular',
    },
    {
      path: '/r/all',
      icon: GraphUpIcon,
      text: 'All',
    },
    {
      path: '/messages/inbox',
      icon: MessageIcon,
      text: 'Messages',
    },
    {
      path: '/subribbits/create',
      icon: CreateIcon,
      text: 'Create Community',
    },
    {
      path: `/user/${username}`,
      text: `u/${username}`,
    },
    {
      path: `/r/`,
      text: `r/${currPath.split('/')[2]}`,
    },
    {
      path: '/settings',
      icon: CogIcon,
      text: 'User Settings',
    },
    {
      path: '/',
      icon: UfoIcon,
      text: 'Home',
    },
  ].find((opt) => currPath.startsWith(opt.path));

export default NavMenu;
