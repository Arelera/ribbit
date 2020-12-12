import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button from '../../reusable/Button';

const Div = styled.div`
  margin: 24px 40px 24px 48px;
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: vertical;
  min-height: 150px;
  background: transparent;
  border-radius: 2px 2px 0 0;
  padding: 8px 16px;
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.postBorder};
      color: ${theme.gray0};
    `}
  border-bottom: none;
`;

const Bottom = styled.div`
  border-radius: 0 0 2px 2px;
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.postBorder};
      background: ${theme.gray3};
    `}
  border-top: 0;
`;

const CommentButton = styled(Button)`
  margin: 4px 8px;
  padding: 5px 10px;
  width: 96px;
`;

const CommentInput = () => {
  return (
    <Div>
      <Textarea placeholder="What are your thoughts?"></Textarea>
      <Bottom>
        <CommentButton>COMMENT</CommentButton>
      </Bottom>
    </Div>
  );
};

export default CommentInput;
