import styled, { css } from 'styled-components';

export const Form = styled.form`
  width: 280px;
  ${({ theme }) => theme.tablet} {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-weight: 600;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontLargeX};
      color: ${theme.gray0};
    `}
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 22px 36px 10px 12px;
  border: none;
  border-radius: 2px;
  margin-top: 12px;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontMed};
      border: 1px solid ${theme.postBorder};
      background: ${theme.gray3};
      color: ${theme.gray0};
    `}
`;

export const SubmitBtn = styled.button`
  width: 100%;
  border: none;
  font-weight: 700;
  padding: 8px 10px;
  border-radius: 2px;
  margin: 12px 0;
  cursor: pointer;
  ${({ theme }) =>
    css`
      background: ${theme.sec2};
      color: ${theme.gray4};
      font-size: ${theme.fontMed};
    `}
`;

export const Bottom = styled.p`
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSmall};
      color: ${theme.gray0};
    `}
`;

export const SwitchButton = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  cursor: pointer;
  font-size: inherit;
  color: ${({ theme }) => theme.sec1};
`;

export const Error = styled.p`
  color: red;
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSmall};
`;
