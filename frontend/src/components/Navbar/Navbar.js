import styled, { css } from 'styled-components';
import Logo from './Logo/Logo';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu/NavMenu';
import Search from './Search/Search';
import NavList from './NavList/NavList';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import SignLog from './SignLog.js/SignLog';
import { useSelector } from 'react-redux';

const Nav = styled.nav`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  position: sticky;
  top: 0;
  z-index: 100;

  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      background-color: ${theme.gray4};
      border-bottom: 1px solid ${theme.postBorder};
    `}
`;

const Navbar = ({ showUserForm }) => {
  const user = useSelector((state) => state.user);

  return (
    <Nav>
      <Link to="/">
        <Logo />
      </Link>
      {user && <NavMenu />}
      <Search />
      {user ? <NavList /> : <SignLog showUserForm={showUserForm} />}
      <ProfileMenu />
    </Nav>
  );
};

export default Navbar;
