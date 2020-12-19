import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';
import Post from './Post/Post';
import PostFormRedirect from './PostFormRedirect';
import PostSorter from './PostSorter/PostSorter';

const Div = styled.div`
  width: 640px;
`;

const PostList = () => {
  const sort = useQuery().get('sort');
  const t = useQuery().get('t'); // time range for top sort
  const { subribbit } = useParams();
  const [posts, setPosts] = useState(postsList);

  useEffect(() => {
    // postService.
  }, [sort, t, subribbit]);

  const currDate = new Date();
  return (
    <Div>
      <PostFormRedirect />
      <PostSorter setPosts={setPosts} />
      {posts.map((post) => (
        <Post post={post} key={post.id} currDate={currDate} />
      ))}
    </Div>
  );
};

const postsList = [
  {
    id: 1,
    subribbit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content:
      'Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.',
    createdAt: '2020-12-17T11:46:53.649Z',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
  {
    id: 2,
    subribbit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content: `Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis. 
    Lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et 
    
    pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.`,
    createdAt: '2020-12-17T11:46:53.649Z',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
  {
    id: 3,
    subribbit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content:
      'Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.',
    createdAt: '2020-12-17T11:46:53.649Z',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
  {
    id: 4,
    subribbit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content:
      'Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.',
    createdAt: '2020-12-17T11:46:53.649Z',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
];

export default PostList;
