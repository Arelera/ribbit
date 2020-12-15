import styled, { css } from 'styled-components';

const Button2 = styled.button`
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: 4px;
  cursor: pointer;
  background: none;
  line-height: 24px;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSmall};
      color: ${theme.gray0};
      border: 1px solid ${theme.gray0};
      :hover {
        color: #ebeced;
        border-color: #ebeced;
      }
    `}
`;

export default Button2;
