import styled, { css } from 'styled-components';
import DownvoteIcon from '../../../icons/DownvoteIcon';
import UpvoteIcon from '../../../icons/UpvoteIcon';

const Div = styled.div`
  height: 100%;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  z-index: 5;
  padding: 8px 4px;
  background: ${({ theme }) => theme.grayNew};
  border-radius: 4px 0 0 4px;
`;

const VoteCount = styled.div`
  font-weight: 700;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontSmall};
    `};
`;

const Icon = styled.div`
  height: 28px;
`;

const UpvoteBtn = styled.button`
  background: transparent;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  ${(props) =>
    css`
      color: ${props.userVote ? props.theme.prim1 : props.theme.gray2};
      :hover {
        background: ${props.theme.gray3};
        color: ${props.theme.prim1};
      }
    `};
`;
const DownvoteBtn = styled.button`
  background: transparent;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  ${(props) =>
    css`
      color: ${props.userVote ? props.theme.sec2 : props.theme.gray2};
      :hover {
        background: ${props.theme.gray3};
        color: ${props.theme.sec2};
      }
    `};
`;

const VoteBar = ({ votes, userVote, voteHandler }) => {
  return (
    <Div>
      <UpvoteBtn userVote={userVote === 1} onClick={() => voteHandler(1)}>
        <Icon>
          <UpvoteIcon />
        </Icon>
      </UpvoteBtn>
      <VoteCount>{votes || 0}</VoteCount>
      <DownvoteBtn userVote={userVote === -1} onClick={() => voteHandler(-1)}>
        <Icon>
          <DownvoteIcon />
        </Icon>
      </DownvoteBtn>
    </Div>
  );
};

export default VoteBar;
