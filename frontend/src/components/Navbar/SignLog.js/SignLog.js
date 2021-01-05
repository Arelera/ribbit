import styled from 'styled-components';
import Button from '../../reusable/Button';
import Button2 from '../../reusable/Button2';

const Div = styled.div`
  display: flex;
  ${({ theme }) => theme.tabletS} {
    display: none;
  }
`;

const LoginBtn = styled(Button2)`
  width: 120px;
  padding: 3px 16px;
`;

const SignupBtn = styled(Button)`
  width: 120px;
  padding: 3px 16px;
  margin-left: 16px;
`;

const SignLog = ({ isLoggedIn }) => {
  return (
    <Div>
      <LoginBtn onClick={() => isLoggedIn()}>LOG IN</LoginBtn>
      <SignupBtn onClick={() => isLoggedIn('signup')}>SIGN UP</SignupBtn>
    </Div>
  );
};

export default SignLog;
