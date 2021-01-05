import styled from 'styled-components';
import PostList from '../PostList/PostList';
import Side from './Side/Side';

const Main = styled.main`
  padding: 20px 24px;
  min-height: calc(100vh - 49px);

  display: flex;
  justify-content: center;
  column-gap: 26px;
  ${({ theme }) => theme.mobileL} {
    padding: 20px 12px;
  }
`;

const MainContent = ({ isLoggedIn }) => {
  return (
    <Main>
      <PostList isLoggedIn={isLoggedIn} />
      <Side />
    </Main>
  );
};

export default MainContent;
