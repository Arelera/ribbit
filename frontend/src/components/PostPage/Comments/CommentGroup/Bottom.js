import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CommentIcon from '../../../../icons/CommentIcon';
import {
  addComment,
  deleteComment,
  editComment,
} from '../../../../store/actions/comments';
import ElMenu from '../../../ElMenu/ElMenu';
import ReplyEdit from './ReplyEdit';

const Div = styled.div``;

const Icon = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 14px;
`;

const BottomItem = styled.button`
  font-weight: 700;
  background: none;
  border: none;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
  span {
    margin-left: 4px;
  }
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
      :hover {
        background: ${theme.gray3};
      }
    `}
`;

const Bottom = ({ commentId, isMyComment, content }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isReply, setIsReply] = useState(true);
  const [replyEditExpanded, setReplyEditExpanded] = useState(false);

  const replyEditHandler = (newContent) => {
    if (isReply) {
      dispatch(addComment(id, newContent, commentId)).then((res) => {
        setReplyEditExpanded(false);
      });
    } else {
      dispatch(editComment(commentId, newContent)).then((res) => {
        setReplyEditExpanded(false);
      });
    }
  };

  const deleteHandler = () => {
    dispatch(deleteComment(commentId)).then((res) => {
      dispatch({ type: 'CLEAR_MODAL' });
    });
  };

  return (
    <Div>
      <BottomItem
        onClick={() => {
          setReplyEditExpanded(!replyEditExpanded);
          setIsReply(true);
        }}
      >
        <Icon>
          <CommentIcon />
        </Icon>
        <span>Reply</span>
      </BottomItem>

      {isMyComment && (
        <ElMenu
          items={[
            {
              text: 'Edit',
              onClick: () => {
                setIsReply(false);
                setReplyEditExpanded(true);
              },
            },
            {
              text: 'Delete',
              onClick: () =>
                dispatch({
                  type: 'SET_MODAL',
                  title: 'Delete comment',
                  msg: 'Are you sure you wanna delete your comment?',
                  acceptBtn: 'DELETE',
                  cancelBtn: 'KEEP',
                  acceptHandler: deleteHandler,
                }),
            },
          ]}
        />
      )}

      {replyEditExpanded && (
        <ReplyEdit
          replyEditHandler={replyEditHandler}
          collapseReply={() => setReplyEditExpanded(false)}
          isReply={isReply}
          content={content}
        />
      )}
    </Div>
  );
};

export default Bottom;
