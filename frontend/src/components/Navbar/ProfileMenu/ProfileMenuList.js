import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ProfileIcon from '../../../icons/ProfileIcon';
import CogIcon from '../../../icons/CogIcon';
import LogoutIcon from '../../../icons/LogoutIcon';

const Div = styled.div`
  position: absolute;
  width: 215px;
  position: absolute;
  top: 38px;
  border-radius: 0 0 4px 4px;
  right: 0;
  ${({ theme }) =>
    css`
      background: ${theme.gray4};
      border: 1px solid ${theme.postBorder};
      border-top: none;
    `}
`;

const H3 = styled.h3`
  margin: 8px 12px 4px;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSmallX};
      color: ${theme.gray2};
    `};
`;

const LinkItem = styled.a`
  display: flex;
  padding: 10px 16px 10px 48px;
  position: relative;
  font-weight: 500;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
      :hover {
        background: ${theme.gray3};
      }
      :last-child::before {
        content: '';
        position: absolute;
        background: ${theme.postBorder};
        top: 0px;
        left: 17px;
        height: 1px;
        width: 180px;
      }
    `};
`;

const Icon = styled.div`
  color: ${({ theme }) => theme.gray2};
  height: 20px;
  position: absolute;
  left: 16px;
  top: 10px;
`;

const ProfileMenuList = () => {
  return (
    <Div>
      <H3>MY STUFF</H3>
      {items.map((item, i) => (
        <Link to={item.link} component={LinkItem} key={i}>
          <Icon>
            <item.icon />
          </Icon>
          {item.text}
        </Link>
      ))}
    </Div>
  );
};

const items = [
  {
    text: 'My Profile',
    icon: ProfileIcon,
    link: '',
  },
  {
    text: 'User Settings',
    icon: CogIcon,
    link: '',
  },
  {
    text: 'Log Out',
    icon: LogoutIcon,
    link: '',
  },
];

export default ProfileMenuList;
