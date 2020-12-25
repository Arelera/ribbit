import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CommentIcon from '../../icons/CommentIcon';
import VoteBar from '../PostList/Post/VoteBar';
import { formatDistance } from 'date-fns';
import ElMenu from '../ElMenu/ElMenu';
import { useState } from 'react';
import PostEdit from './PostEdit';
import { useDispatch } from 'react-redux';
import { deletePost, editPost } from '../../store/actions/posts';

const Div = styled.div`
  margin: 0 auto;
  width: 100%;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
    `}
`;

const Content = styled.div`
  position: relative;
`;

const Post = styled.div`
  margin: 0 0 0 40px;
  padding: 10px 8px;
`;

const Top = styled.div`
  margin-bottom: 6px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontLargeXX};
`;

const P = styled.p`
  font-size: ${({ theme }) => theme.fontMed};
  padding: 12px 8px 12px 0;
`;

const Bottom = styled.div`
  font-weight: 700;
  margin-top: 8px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Icon = styled.div`
  vertical-align: middle;
  display: inline-block;
  height: 16px;
  padding-right: 4px;
`;

const EditedAt = styled.span`
  font-style: italic;
`;

const PostContent = ({ post, setPost, commentsLength }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currDate = new Date();
  const [editing, setEditing] = useState(false);

  const deleteHandler = () => {
    dispatch(deletePost(post.id)).then((res) => {
      history.push('/');
    });
  };

  const editHandler = (content) => {
    dispatch(editPost(post.id, content)).then((res) => {
      setPost(res);
      setEditing(false);
    });
  };

  return (
    <Div>
      <Content>
        <VoteBar post={post} />
        <Post>
          <Top>
            Posted by <Link to={`u/${post.username}`}>u/{post.username}</Link>{' '}
            {formatDistance(new Date(post.createdAt), currDate)} ago{' '}
            {post.editedAt && (
              <EditedAt>
                · edited {formatDistance(new Date(post.editedAt), currDate)} ago
              </EditedAt>
            )}
          </Top>
          <Title>{post.title}</Title>
          {editing ? (
            <PostEdit
              content={post.content}
              editHandler={editHandler}
              cancel={() => setEditing(false)}
            />
          ) : (
            post.content.split('\n').map((c, i) => <P key={i}>{c}</P>)
          )}
          <Bottom>
            <Icon>
              <CommentIcon />
            </Icon>
            <span>{commentsLength} Comments</span>
            <ElMenu
              items={[
                { text: 'Delete', onClick: deleteHandler },
                { text: 'Edit', onClick: () => setEditing(!editing) },
              ]}
            />
          </Bottom>
        </Post>
      </Content>
    </Div>
  );
};

export default PostContent;
