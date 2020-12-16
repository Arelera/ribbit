import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ProfileIcon from '../../../icons/ProfileIcon';
import CogIcon from '../../../icons/CogIcon';
import LogoutIcon from '../../../icons/LogoutIcon';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/actions/user';

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

const ListItem = styled.div`
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

const ListItemButton = styled.button`
  background: none;
  border: none;
  width: 100%;
`;

const ProfileMenuList = ({ user, showUserForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <Div>
      {user ? (
        <>
          <H3>MY STUFF</H3>
          {items.map((item, i) => (
            <Link to={item.link} key={i}>
              <ListItem>
                <Icon>
                  <item.icon />
                </Icon>
                {item.text}
              </ListItem>
            </Link>
          ))}
          <ListItemButton onClick={handleLogout}>
            <ListItem>
              <Icon>
                <LogoutIcon />
              </Icon>
              Log Out
            </ListItem>
          </ListItemButton>
        </>
      ) : (
        <ListItemButton onClick={() => showUserForm('login')}>
          <ListItem>
            <Icon>
              <LogoutIcon />
            </Icon>
            Log In / Sign Up
          </ListItem>
        </ListItemButton>
      )}
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
];

export default ProfileMenuList;
