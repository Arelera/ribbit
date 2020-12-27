import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Sorter from './Sorter';

const Comments = ({ showUserForm }) => {
  const currDate = new Date();

  return (
    <>
      <CommentInput showUserForm={showUserForm} />
      <Sorter />
      <CommentList showUserForm={showUserForm} currDate={currDate} />
    </>
  );
};

export default Comments;
