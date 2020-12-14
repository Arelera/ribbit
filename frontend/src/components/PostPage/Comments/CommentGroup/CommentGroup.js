import styled from 'styled-components';
import Comment from './Comment';

const ChildComments = styled.div`
  margin-left: 30px;
  border-left: 2px solid ${({ theme }) => theme.gray3};
`;

const CommentGroup = ({ comments, comment }) => {
  const childComments = comments.filter((c) => c.parentComment === comment.id);
  return (
    <div>
      <Comment comment={comment} />
      {childComments.length > 0 && (
        <ChildComments>
          {childComments.map((d) => (
            <CommentGroup comment={d} comments={comments} key={d.id} />
          ))}
        </ChildComments>
      )}
    </div>
  );
};

export default CommentGroup;
