import styled from 'styled-components';
import Comments from './Comments/Comments';
import PostContent from './PostContent';

const Div = styled.div`
  max-width: 1280px;
  padding: 20px 24px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 740px;
  border-radius: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.gray4};
`;

const PostPage = () => {
  return (
    <Div>
      <Container>
        <PostContent post={post} />
        <Comments />
      </Container>
    </Div>
  );
};

const post = {
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
};

export default PostPage;
