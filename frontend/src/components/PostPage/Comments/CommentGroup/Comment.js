import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { formatDistance } from 'date-fns';
import Voter from './Voter';
import Bottom from './Bottom';
import { useSelector } from 'react-redux';

const Div = styled.div`
  line-height: 21px;
  margin-top: 16px;
  display: flex;
  width: 100%;
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

const Poster = styled.span`
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

const Container = styled.div`
  width: 100%;
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

const Comment = ({ comment, currDate, voteHandler }) => {
  const user = useSelector((state) => state.user);

  return (
    <Div>
      <Voter isUpvote={comment.isUpvote} voteHandler={voteHandler} />
      <Container>
        <Top>
          <Link to={`/user/${comment.username}`}>
            <Poster>{comment.username}</Poster>
          </Link>
          <Points> {comment.points || 0} points</Points>
          <TimeAgo>
            {' '}
            · {formatDistance(new Date(comment.createdAt), currDate)} ago
          </TimeAgo>
          {comment.editedAt && (
            <TimeAgoEdit>
              {' '}
              · edited {formatDistance(
                new Date(comment.editedAt),
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
        <Bottom
          content={comment.content}
          isMyComment={comment.creator === user?.id}
          commentId={comment.id}
        />
      </Container>
    </Div>
  );
};

export default Comment;
