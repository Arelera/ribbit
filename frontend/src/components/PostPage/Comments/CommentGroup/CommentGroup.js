import styled from 'styled-components';
import Comment from './Comment';

const ChildComments = styled.div`
  margin-left: 30px;
  border-left: 2px solid ${({ theme }) => theme.gray3};
  max-width: 100%;
`;

const CommentGroup = ({ comments, comment, voteHandler, currDate }) => {
  const childComments = comments.filter((c) => c.parentComment === comment.id);
  return (
    <>
      <Comment
        comment={comment}
        comments={comments}
        voteHandler={voteHandler(comment)}
        currDate={currDate}
      />
      {childComments.length > 0 && (
        <ChildComments>
          {childComments.map((child) => (
            <CommentGroup
              comment={child}
              comments={comments}
              voteHandler={voteHandler}
              currDate={currDate}
              key={child.id}
            />
          ))}
        </ChildComments>
      )}
    </>
  );
};

export default CommentGroup;
