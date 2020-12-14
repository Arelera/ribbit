import { useState } from 'react';
import styled from 'styled-components';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Sorter from './Sorter';

const Div = styled.div``;

const Comments = () => {
  const [comments, setComments] = useState(fakeComments);

  return (
    <Div>
      <CommentInput />
      <Sorter comments={comments} setComments={setComments} />
      <CommentList comments={comments} />
    </Div>
  );
};

const fakeComments = [
  {
    id: '1',
    user: 'coolgue',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '',
    createdAt: '22 hours ago',
    updatedAt: '13 hours ago',
    upvotes: 2,
  },
  {
    id: '2',
    user: 'wHatIsUo',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '',
    createdAt: '22 hours ago',
    updatedAt: '13 hours ago',
    upvotes: 24,
  },
  {
    id: '3',
    user: 'xx123DOG321xx',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    parentComment: '2',
    createdAt: '22 hours ago',
    updatedAt: '13 hours ago',
    upvotes: 18,
  },
  {
    id: '4',
    user: 'Bob',
    content: `Lorem ipsum pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '2',
    createdAt: '22 hours ago',
    updatedAt: '13 hours ago',
    upvotes: 5,
  },
  {
    id: '5',
    user: 'Johnnayyy',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. 
    Consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '3',
    createdAt: '22 hours ago',
    updatedAt: '13 hours ago',
    upvotes: 45,
  },
  {
    id: '6',
    user: '_dqwe_wejfnhew',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consa pariatur.
     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    parentComment: '',
    createdAt: '22 hours ago',
    updatedAt: '13 hours ago',
    upvotes: 11,
  },
];

export default Comments;
