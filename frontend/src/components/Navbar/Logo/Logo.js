import styled from 'styled-components';
import LogoSvg from './LogoSvg';

const Div = styled.div`
  display: flex;
  width: 117px;
  height: 48px;
  display: inline-flex;
  align-items: center;
`;

const Ribbit = styled.h1`
  font-family: 'Quicksand';
  color: ${({ theme }) => theme.gray0};
  padding-left: 0.5rem;
`;

const Logo = () => {
  return (
    <Div>
      <LogoSvg />
      <Ribbit>ribbit</Ribbit>
    </Div>
  );
};

export default Logo;
