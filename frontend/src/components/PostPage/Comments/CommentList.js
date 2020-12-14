import styled from 'styled-components';
import CommentGroup from './CommentGroup/CommentGroup';

const Div = styled.div`
  margin: 16px 16px 0 10px;
  padding: 0 16px 16px 0;
`;

const CommentList = ({ comments }) => {
  return (
    <Div>
      {comments
        .filter((c) => !c.parentComment)
        .map((comment) => (
          <CommentGroup
            comment={comment}
            comments={comments}
            key={comment.id}
          />
        ))}
    </Div>
  );
};

export default CommentList;
