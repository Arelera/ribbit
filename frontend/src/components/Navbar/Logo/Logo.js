import styled from 'styled-components';
import LogoSvg from './LogoSvg';

const Div = styled.div`
  display: flex;
  height: 48px;
  display: inline-flex;
  align-items: center;
  padding-right: 8px;
`;

const Ribbit = styled.span`
  font-size: 24px;
  font-family: 'Quicksand';
  color: ${({ theme }) => theme.gray0};
  padding-left: 0.5rem;
  ${({ theme }) => theme.laptop} {
    display: none;
  }
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
