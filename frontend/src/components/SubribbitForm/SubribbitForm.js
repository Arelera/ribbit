import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import subribbitService from '../../services/subribbitService';
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
  border: 1px solid
    ${(props) => (props.nameError ? 'red' : props.theme.postBorder)};
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

const Error = styled.span`
  font-size: ${({ theme }) => theme.fontSmall};
  color: red;
`;

const SubribbitForm = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (/[^a-z0-9_]+/i.test(name)) {
      return;
    }
    subribbitService.createOne({ name, description }).then((res) => {
      if (res.error) {
        return setNameError(res.error);
      }
      history.push(`/r/${res.name}`);
    });
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    if (/[^a-z0-9_]+/i.test(e.target.value)) {
      return setNameError(
        'Name can only contain letters, numbers and undescores "_".'
      );
    }
    setNameError('');
  };

  if (!user) return <Redirect to="/" />;
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
            onChange={nameChangeHandler}
            nameError={nameError}
            required
          />
          <Error>{nameError}</Error>
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
