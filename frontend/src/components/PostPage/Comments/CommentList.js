import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentGroup from './CommentGroup/CommentGroup';

const Div = styled.div`
  margin: 16px 16px 0 10px;
  padding: 0 16px 16px 0;
`;

const CommentList = ({ currDate }) => {
  const comments = useSelector((state) => state.comments);
  return (
    <Div>
      {comments
        .filter((c) => !c.parentComment)
        .map((comment) => (
          <CommentGroup
            comment={comment}
            comments={comments}
            currDate={currDate}
            key={comment.id}
          />
        ))}
    </Div>
  );
};

export default CommentList;
