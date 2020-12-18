import styled, { css } from 'styled-components';
import PostList from '../PostList/PostList';
import Button from '../reusable/Button';
import SubPageAside from './SubPageAside';

const Div = styled.div``;

const Banner = styled.div`
  color: ${({ theme }) => theme.gray0};
  background: ${({ theme }) => theme.gray4};
`;

const Line = styled.div`
  height: 80px;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.sec1}, ${theme.sec2})`};
`;

const TopContainer = styled.div`
  max-width: 984px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 28px;
  margin: 10px;
`;

const JoinBtn = styled(Button)`
  padding: 4px 9px 2px;
  width: 96px;
  margin: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 24px;
  column-gap: 26px;
`;

const SubribbitPage = () => {
  return (
    <Div>
      <Banner>
        <Line />
        <TopContainer>
          <Title>{info.name}</Title>
          <JoinBtn>JOIN</JoinBtn>
        </TopContainer>
      </Banner>
      <Content>
        <PostList />
        <SubPageAside info={info} />
      </Content>
    </Div>
  );
};

const info = {
  name: 'webdev',
  description:
    'Some cool description telling you what this whole subribbit is about while being understandably brief.',
  members: 45621,
  createdAt: '2020-12-18T18:24:51.194Z',
};

export default SubribbitPage;
