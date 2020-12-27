import styled, { css } from 'styled-components';
import UpvoteIcon from '../../../../icons/UpvoteIcon';
import DownvoteIcon from '../../../../icons/DownvoteIcon';

const Div = styled.div`
  padding: 0 2px;
  width: 40px;
  flex-shrink: 0;
  text-align: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      :hover {
        background: ${theme.gray3};
      }
    `}
`;

const UpvoteBtn = styled(Button)`
  outline: none;
  ${(props) =>
    css`
      color: ${props.isUpvote ? props.theme.prim2 : props.theme.gray2};
      :hover {
        color: ${props.theme.prim1};
      }
    `}
`;

const DownvoteBtn = styled(Button)`
  outline: none;
  ${(props) =>
    css`
      color: ${props.isUpvote ? props.theme.sec2 : props.theme.gray2};
      :hover {
        color: ${props.theme.sec2};
      }
    `}
`;

const Icon = styled.div`
  height: 26px;
`;

const Voter = ({ isUpvote, voteHandler }) => {
  return (
    <Div>
      <UpvoteBtn isUpvote={isUpvote === 1} onClick={() => voteHandler(1)}>
        <Icon>
          <UpvoteIcon />
        </Icon>
      </UpvoteBtn>
      <DownvoteBtn isUpvote={isUpvote === -1} onClick={() => voteHandler(-1)}>
        <Icon>
          <DownvoteIcon />
        </Icon>
      </DownvoteBtn>
    </Div>
  );
};

export default Voter;
