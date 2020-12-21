import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import postService from '../../services/postService';
import commentService from '../../services/commentService';
import Comments from './Comments/Comments';
import PostContent from './PostContent';

const Div = styled.div`
  max-width: 1280px;
  padding: 20px 24px;
`;

const SubribbitBanner = styled.div`
  height: 80px;
  top: 0;
  background: ${({ theme }) => `${theme.sec2}`};
`;

const SubrContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Subribbit = styled.span`
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.white1};
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 740px;
  border-radius: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.gray4};
`;

const PostPage = ({ showUserForm }) => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // post id

  useEffect(() => {
    postService.getById(id).then((res) => {
      setPost(res);
    });

    commentService.getByPost(id).then((res) => {
      setComments(res);
    });
  }, [id]);

  useEffect(() => {
    if (post && comments) {
      setLoading(false);
    }
  }, [post, comments]);

  if (loading) return <div>OK</div>;
  return (
    <>
      <SubribbitBanner>
        <Link to={`/r/${post.subribbit}`}>
          <SubrContainer>
            <Subribbit>r/{post.subribbit}</Subribbit>
          </SubrContainer>
        </Link>
      </SubribbitBanner>
      <Div>
        <Container>
          <PostContent post={post} commentsLength={comments.length} />
          <Comments
            showUserForm={showUserForm}
            comments={comments}
            setComments={setComments}
          />
        </Container>
      </Div>
    </>
  );
};

// const post = {
//   id: 1,
//   subribbit: 'webdev',
//   creator: 'coolGuyye111',
//   title:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
//   content:
//     'Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.',
//   createdAt: '2020-12-17T11:46:53.649Z',
//   comments: [
//     {
//       id: 1,
//       username: 'Whatisup0101010',
//     },
//   ],
// };

export default PostPage;
