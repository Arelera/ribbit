import { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '../reusable/Button';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 49px);
  display: flex;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      background: ${theme.gray4};
    `}
`;

const Decor = styled.div`
  width: 140px;
  min-height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.sec1}, ${theme.sec2})`};
`;

const MainTitle = styled.h1`
  font-weight: 600;
  padding-bottom: 16px;
  margin-bottom: 16px;

  ${({ theme }) =>
    css`
      font-size: ${theme.fontLarge};
      border-bottom: 1px solid ${theme.postBorder};
    `};
`;

const Title = styled.h2`
  font-weight: 600;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontLarge};
`;

const UnderTitle = styled.p`
  margin-bottom: 12px;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSmall};
      color: ${theme.gray2};
    `}
`;

const Form = styled.form`
  padding: 16px;
  width: 428px;
`;

const Label = styled.label`
  margin-bottom: 24px;
  display: block;
`;

const TextInput = styled.input`
  width: 100%;
  background: none;
  border-radius: 4px;
  padding: 8px;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.postBorder};
`;

const TextArea = styled.textarea`
  width: 100%;
  background: none;
  min-height: 60px;
  color: inherit;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.postBorder};
  resize: vertical;
`;

const SubmitBtn = styled(Button)`
  padding: 3px 16px;
  display: block;
  margin-top: 16px;
  margin-left: auto;
`;

const SubribbitForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Decor />
      <Form onSubmit={submitHandler}>
        <MainTitle>Create a community</MainTitle>
        <Label>
          <Title>Name</Title>
          <UnderTitle>
            <span>
              Community names including capitalization cannot be changed.
            </span>
          </UnderTitle>
          <TextInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Label>
        <Label>
          <Title>Description</Title>
          <UnderTitle>
            <span>
              This is how new members come to understand your community.
            </span>
          </UnderTitle>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></TextArea>
        </Label>
        <SubmitBtn type="submit">CREATE COMMUNITY</SubmitBtn>
      </Form>
    </Container>
  );
};

export default SubribbitForm;
