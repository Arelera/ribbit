import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CommentIcon from '../../../icons/CommentIcon';
import { deletePost } from '../../../store/actions/posts';
import ElMenu from '../../ElMenu/ElMenu';

const Bottom = styled.div`
  display: flex;
  align-items: center;

  height: 32px;
  font-weight: 700;
  margin-left: 4px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
    `}
`;

const Item = styled.div`
  padding: 4px;
  border-radius: 2px;
  :hover {
    background: ${({ theme }) => `${theme.gray1}1A`};
  }
`;

const Icon = styled.span`
  padding-right: 4px;
  display: inline-block;
  height: 16px;
  vertical-align: middle;
  color: inherit;
`;

const BottomBar = ({ postId, usersPost, commentCount }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deletePost(postId));
  };

  return (
    <Bottom>
      <Item>
        <Link to="/">
          <Icon>
            <CommentIcon />
          </Icon>
        </Link>
        {commentCount} Comments
      </Item>
      {usersPost && (
        <ElMenu
          items={[
            {
              text: 'Delete',
              onClick: () => {
                dispatch({
                  type: 'SET_MODAL',
                  title: 'Delete post',
                  msg:
                    "Are you sure you want to delete your post? You can't undo this.",
                  acceptHandler: deleteHandler,
                  acceptBtn: 'DELETE POST',
                  cancelBtn: 'CANCEL',
                });
              },
            },
          ]}
        />
      )}
    </Bottom>
  );
};

export default BottomBar;
