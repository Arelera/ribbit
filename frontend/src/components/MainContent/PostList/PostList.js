import styled from 'styled-components';
import Post from './Post/Post';

const Div = styled.div`
  width: 640px;
`;

const PostList = () => {
  return (
    <Div>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Div>
  );
};

const posts = [
  {
    id: 1,
    subreddit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content:
      'Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.',
    createdAt: '3 days ago',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
  {
    id: 2,
    subreddit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content: `Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis. 
    Lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et 
    
    pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.`,
    createdAt: '3 days ago',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
  {
    id: 3,
    subreddit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content:
      'Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.',
    createdAt: '3 days ago',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
  {
    id: 4,
    subreddit: 'webdev',
    user: 'coolGuyye111',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    content:
      'Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.',
    createdAt: '3 days ago',
    comments: [
      {
        id: 1,
        username: 'Whatisup0101010',
      },
    ],
  },
];

export default PostList;
