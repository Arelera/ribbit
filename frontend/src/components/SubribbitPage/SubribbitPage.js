import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import subribbitService from '../../services/subribbitService';
import { setUser } from '../../store/actions/user';
import PostList from '../PostList/PostList';
import Button from '../reusable/Button';
import Button2 from '../reusable/Button2';
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

const JoinedBtn = styled(Button2)`
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { subribbit } = useParams();
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    subribbitService.getOne(subribbit).then((res) => {
      setInfo(res);
      setIsLoading(false);
    });
  }, [subribbit]);

  const joinHandler = () => {
    subribbitService.joinOne(info.name).then((res) => {
      dispatch(setUser(res));
    });
  };

  const exitSubHandler = () => {
    subribbitService.exitOne(info.name).then((res) => {
      dispatch(setUser(res));
    });
  };

  if (isLoading) return 'ok';
  return (
    <Div>
      <Banner>
        <Line />
        <TopContainer>
          <Title>{info.name}</Title>
          {user?.joinedSubribbits.includes(info.name) ? (
            <JoinedBtn onClick={exitSubHandler}>JOINED</JoinedBtn>
          ) : (
            <JoinBtn onClick={joinHandler}>JOIN</JoinBtn>
          )}
        </TopContainer>
      </Banner>
      <Content>
        <PostList />
        <SubPageAside info={info} />
      </Content>
    </Div>
  );
};

export default SubribbitPage;
