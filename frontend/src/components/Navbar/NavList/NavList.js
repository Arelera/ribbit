import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CreateIcon from '../../../icons/CreateIcon';
import GraphUpIcon from '../../../icons/GraphUpIcon';
import MessageIcon from '../../../icons/MessageIcon';
import PopularIcon from '../../../icons/PopularIcon';

const Div = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
`;

const LinkItem = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin-left: 8px;
  :first-child {
    margin-left: 0px;
  }

  width: 32px;
  height: 32px;
  padding: 8px;

  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      :hover {
        background: ${theme.gray3};
      }
      ${theme.tablet} {
        :first-child {
          display: none;
        }
      }
      ${theme.tabletS} {
        display: none;
      }
    `}
`;

const Icon = styled.div`
  height: 16px;
`;

const NavList = () => {
  return (
    <Div>
      {items.map((item, i) => (
        <Link to={item.link} component={LinkItem} key={i}>
          <Icon>
            <item.icon />
          </Icon>
        </Link>
      ))}
    </Div>
  );
};

const items = [
  {
    link: '/',
    icon: PopularIcon,
  },
  {
    link: '/',
    icon: GraphUpIcon,
  },
  {
    link: '/',
    icon: MessageIcon,
  },
  {
    link: '/submit',
    icon: CreateIcon,
  },
];

export default NavList;
