import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { voteOnComment } from '../../../store/actions/comments';
import CommentGroup from './CommentGroup/CommentGroup';

const Div = styled.div`
  margin: 16px 16px 0 10px;
  padding: 0 16px 16px 0;
`;

const CommentList = ({ currDate, showUserForm }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  const voteHandler = (comment) => (isUpvote) => {
    dispatch(voteOnComment(comment.id, isUpvote, comment.isUpvote)).then(
      (res) => {
        if (res === 'No user') {
          showUserForm('login');
        }
      }
    );
  };

  return (
    <Div>
      {comments
        .filter((c) => !c.parentComment)
        .map((comment) => (
          <CommentGroup
            comment={comment}
            comments={comments}
            voteHandler={voteHandler}
            currDate={currDate}
            key={comment.id}
          />
        ))}
    </Div>
  );
};

export default CommentList;
