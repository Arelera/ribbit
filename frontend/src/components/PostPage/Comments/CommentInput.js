import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { addComment } from '../../../store/actions/comments';
import Button from '../../reusable/Button';
import Button2 from '../../reusable/Button2';

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
  margin-top: -5px;
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

const NoUserBox = styled.div`
  ${({ theme }) => theme.box()};
  border-radius: 4px;
  padding: 12px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoUserText = styled.span`
  font-weight: 600;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontLarge};
    `}
`;

const LoginBtn = styled(Button2)`
  padding: 3px 16px;
  margin-right: 8px;
`;

const SignupBtn = styled(Button)`
  padding: 3px 16px;
`;

const CommentInput = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const { id } = useParams(); // post id
  const user = useSelector((state) => state.user);
  const [commentContent, setCommentContent] = useState('');

  const commentHandler = () => {
    dispatch(addComment(id, commentContent)).then((res) => {
      setCommentContent('');
    });
  };

  return (
    <Div>
      {user ? (
        <>
          <Textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="What are your thoughts?"
          ></Textarea>
          <Bottom>
            <CommentButton onClick={commentHandler}>COMMENT</CommentButton>
          </Bottom>
        </>
      ) : (
        <NoUserBox>
          <NoUserText>Log in or sign up to leave a comment</NoUserText>
          <div>
            <LoginBtn onClick={() => isLoggedIn('login')}>LOG IN</LoginBtn>
            <SignupBtn onClick={() => isLoggedIn('signup')}>SIGN UP</SignupBtn>
          </div>
        </NoUserBox>
      )}
    </Div>
  );
};

export default CommentInput;
