import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Sorter from './Sorter';

const Comments = ({ isLoggedIn }) => {
  const currDate = new Date();

  return (
    <>
      <CommentInput isLoggedIn={isLoggedIn} />
      <Sorter />
      <CommentList isLoggedIn={isLoggedIn} currDate={currDate} />
    </>
  );
};

export default Comments;
