import styled, { css } from 'styled-components';
import Logo from './Logo/Logo';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu/NavMenu';
import Search from './Search/Search';
import NavList from './NavList/NavList';
import ProfileMenu from './ProfileMenu/ProfileMenu';

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

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">
        <Logo />
      </Link>
      <NavMenu />
      <Search />
      <NavList />
      <ProfileMenu />
    </Nav>
  );
};

export default Navbar;
