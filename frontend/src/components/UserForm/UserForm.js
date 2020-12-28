import styled, { css } from 'styled-components';
import XIcon from '../../icons/XIcon';
import Login from './Login';
import Signup from './Signup';

const Container = styled.div`
  position: fixed;
  z-index: 150;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #000a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  position: relative; // for top right X
  width: 850px;
  height: 650px;
  border-radius: 4px;
  display: flex;
  margin: 32px;
  ${({ theme }) =>
    css`
      background: ${theme.gray4};
    `};
`;

const FormBox = styled.div`
  margin: auto 0;
  padding: 24px;
`;

const Decor = styled.div`
  width: 130px;
  height: 100%;
  border-radius: 4px 0 0 4px;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.prim1}, ${theme.prim2})`};
`;

const CloseBtn = styled.button`
  position: absolute;
  height: 25px;
  width: 25px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.gray2};
  top: 20px;
  right: 20px;
`;

const UserForm = ({ showUserForm, userFormType, userFormRef }) => {
  return (
    <Container>
      <Div ref={userFormRef}>
        <Decor />
        <FormBox>
          {userFormType === 'login' ? (
            <Login showUserForm={showUserForm} />
          ) : (
            <Signup showUserForm={showUserForm} />
          )}
        </FormBox>
        <CloseBtn onClick={() => showUserForm(false)}>
          <XIcon />
        </CloseBtn>
      </Div>
    </Container>
  );
};

export default UserForm;
