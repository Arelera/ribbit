import { useState } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Sorter from './Sorter';

const Comments = ({ showUserForm }) => {
  const [comments, setComments] = useState(fakeComments);
  const currDate = new Date();

  return (
    <>
      <CommentInput showUserForm={showUserForm} />
      <Sorter comments={comments} setComments={setComments} />
      <CommentList comments={comments} currDate={currDate} />
    </>
  );
};

const fakeComments = [
  {
    id: '1',
    creator: 'coolgue',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '',
    createdAt: '2020-12-17T01:46:53.649Z',
    updatedAt: '2020-12-17T11:16:53.649Z',
    upvotes: 2,
  },
  {
    id: '2',
    creator: 'wHatIsUo',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '',
    createdAt: '2020-12-17T11:56:53.649Z',
    updatedAt: '2020-12-17T11:26:53.649Z',
    upvotes: 24,
  },
  {
    id: '3',
    creator: 'xx123DOG321xx',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    parentComment: '2',
    createdAt: '2020-12-17T17:46:53.649Z',
    updatedAt: '2020-12-17T11:42:53.649Z',
    upvotes: 18,
  },
  {
    id: '4',
    creator: 'Bob',
    content: `Lorem ipsum pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '2',
    createdAt: '2020-12-17T11:06:53.649Z',
    updatedAt: '2020-12-17T11:49:53.649Z',
    upvotes: 5,
  },
  {
    id: '5',
    creator: 'Johnnayyy',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. 
    Consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '3',
    createdAt: '2020-12-17T10:46:53.649Z',
    updatedAt: '2020-12-17T11:46:53.649Z',
    upvotes: 45,
  },
  {
    id: '6',
    creator: '_dqwe_wejfnhew',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consa pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '',
    createdAt: '2020-12-17T11:20:53.649Z',
    updatedAt: '2020-12-17T11:26:53.649Z',
    upvotes: 11,
  },
];

export default Comments;
