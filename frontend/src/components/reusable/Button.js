import styled, { css } from 'styled-components';

const Button = styled.button`
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSmall};
      background: ${theme.gray0};
      color: ${theme.gray4};
      :hover {
        background: #ebeced;
      }
    `}
`;

export default Button;
