import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Sorter from './Sorter';

const Comments = ({ showUserForm, comments, setComments }) => {
  const currDate = new Date();

  return (
    <>
      <CommentInput
        showUserForm={showUserForm}
        comments={comments}
        setComments={setComments}
      />
      <Sorter comments={comments} setComments={setComments} />
      <CommentList
        comments={comments}
        setComments={setComments}
        currDate={currDate}
      />
    </>
  );
};

export default Comments;
