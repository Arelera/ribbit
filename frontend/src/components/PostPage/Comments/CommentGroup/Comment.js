import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { formatDistance } from 'date-fns';
import CommentIcon from '../../../../icons/CommentIcon';
import Voter from './Voter';

const Div = styled.div`
  line-height: 21px;
  margin-top: 16px;
  display: flex;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
    `}
`;

const Top = styled.div`
  ${({ theme }) =>
    css`
      font-size: ${theme.fontSmall};
    `}
`;

const Poster = styled.a`
  :hover {
    text-decoration: underline;
  }
`;
const Points = styled.span`
  padding-left: 2px;
  color: ${({ theme }) => theme.gray2};
`;

const TimeAgo = styled.span`
  color: ${({ theme }) => theme.gray2};
`;
const TimeAgoEdit = styled(TimeAgo)`
  font-style: italic;
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontMed};
`;

const P = styled.p`
  padding: 8px 0 4px;
  :first-child {
    padding-top: 2px;
  }
  :last-child {
    padding-bottom: 2px;
  }
`;

const Bottom = styled.div``;

const Icon = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 14px;
  margin-right: 4px;
`;

const BottomItem = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmall};
      :hover {
        background: ${theme.gray3};
      }
    `}
`;

const Comment = ({ comment, currDate }) => {
  return (
    <Div>
      <Voter />
      <div>
        <Top>
          <Link to="/" component={Poster}>
            {comment.creator}
          </Link>
          <Points> {comment.upvotes} points</Points>
          <TimeAgo>
            {' '}
            · {formatDistance(new Date(comment.createdAt), currDate)} ago
          </TimeAgo>
          {comment.updatedAt && (
            <TimeAgoEdit>
              {' '}
              · edited {formatDistance(
                new Date(comment.updatedAt),
                currDate
              )}{' '}
              ago
            </TimeAgoEdit>
          )}
        </Top>
        <Content>
          {comment.content.split('\n').map((p, i) => (
            <P key={i}>{p}</P>
          ))}
        </Content>
        <Bottom>
          <BottomItem>
            <Icon>
              <CommentIcon />
            </Icon>
            Reply
          </BottomItem>
        </Bottom>
      </div>
    </Div>
  );
};

export default Comment;
