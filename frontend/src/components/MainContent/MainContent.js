import styled from 'styled-components';
import PostList from './PostList/PostList';
import Side from './Side/Side';

const Main = styled.main`
  padding: 20px 24px;
  min-height: calc(100vh - 49px);

  display: flex;
  justify-content: center;
  column-gap: 26px;
`;

const MainContent = () => {
  return (
    <Main>
      <PostList />
      <Side />
    </Main>
  );
};

export default MainContent;
