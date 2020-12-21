import styled from 'styled-components';
import CommentGroup from './CommentGroup/CommentGroup';

const Div = styled.div`
  margin: 16px 16px 0 10px;
  padding: 0 16px 16px 0;
`;

const CommentList = ({ comments, setComments, currDate }) => {
  return (
    <Div>
      {comments
        .filter((c) => !c.parentComment)
        .map((comment) => (
          <CommentGroup
            comment={comment}
            setComments={setComments}
            comments={comments}
            currDate={currDate}
            key={comment.id}
          />
        ))}
    </Div>
  );
};

export default CommentList;
