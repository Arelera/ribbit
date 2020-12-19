import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import postService from '../../services/postService';
import subribbitService from '../../services/subribitService';
import Button from '../reusable/Button';

const Container = styled.div`
  padding: 20px 24px;
  margin: 0 auto;
  height: 100px;
`;

const Form = styled.form`
  max-width: 1000px;
  margin: 0 auto;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
    `};
`;

const Title = styled.h1`
  font-weight: 600;
  padding-bottom: 12px;
  margin-bottom: 12px;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontLargeX};
      border-bottom: 1px solid ${theme.postBorder};
    `};
`;

const SubDropdown = styled.div``;

const SubInput = styled.input`
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  font-weight: 600;
  ${({ theme }) =>
    css`
      ${theme.box()}
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
      ::placeholder {
        color: ${theme.gray0};
      }
    `}
`;

const SubList = styled.div``;

const SubItem = styled.div``;

const InnerDiv = styled.div`
  width: 100%;
  border-radius: 4px;
  padding: 12px;
  background: ${({ theme }) => theme.gray4};
`;

const InputText = styled.input`
  padding: 8px 68px 8px 16px;
  width: 100%;
  background: none;
  margin-bottom: 8px;
  border-radius: 4px;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontMed};
      color: ${theme.gray0};
      border: 1px solid ${theme.postBorder};
    `};
`;

const Textarea = styled.textarea`
  padding: 8px 16px;
  width: 100%;
  background: none;
  border-radius: 4px;
  ${({ theme }) =>
    css`
      font-size: ${theme.fontMed};
      color: ${theme.gray0};
      border: 1px solid ${theme.postBorder};
    `};
`;

const SubError = styled.p`
  color: red;
  font-size: ${({ theme }) => theme.fontMed};
  margin: 0 0 8px 8px;
`;

const PostButton = styled(Button)`
  margin-top: 8px;
  padding: 4px 16px;
  width: 82px;
`;

const PostForm = () => {
  const history = useHistory();
  const [sub, setSub] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const [subs, setSubs] = useState([]);
  const [subsExpanded, setSubsExpanded] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setError('');
    postService.createOne({ sub, title, content }).then((res) => {
      if (res.error) {
        return setError(res.error);
      }
      history.push(`/r/${res.subribbit}/${res.id}`);
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      subribbitService.getSimilar(sub.trim()).then((res) => {
        setSubs(res || []);
      });
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [sub]);

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Title>Create a post</Title>

        <SubDropdown>
          <SubInput
            onFocus={() => setSubsExpanded(true)}
            onBlur={() => setSubsExpanded(false)}
            value={sub}
            onChange={(e) => setSub(`${e.target.value}`)}
            placeholder="Choose a community"
            maxLength="20"
          />
          {subsExpanded && (
            <SubList>
              {subs.map((sub) => (
                <SubItem key={sub.name}>r/{sub.name}</SubItem>
              ))}
            </SubList>
          )}
        </SubDropdown>
        <SubError>{error}</SubError>

        <InnerDiv>
          <label>
            <InputText
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </label>
          <label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Text"
              required
            ></Textarea>
          </label>
          <PostButton type="submit">POST</PostButton>
        </InnerDiv>
      </Form>
    </Container>
  );
};

export default PostForm;
