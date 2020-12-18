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

const Dot = styled.div`
  color: ${({ theme }) => theme.gray0};
`;

const Icon = styled.div`
  height: 28px;
`;

const UpvoteBtn = styled.button`
  background: transparent;
  border: none;
  border-radius: 2px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      :hover {
        background: ${theme.gray3};
        color: ${theme.prim1};
      }
    `};
`;
const DownvoteBtn = styled.button`
  background: transparent;
  border: none;
  border-radius: 2px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      :hover {
        background: ${theme.gray3};
        color: ${theme.sec2};
      }
    `};
`;

const VoteBar = () => {
  return (
    <Div>
      <UpvoteBtn>
        <Icon>
          <UpvoteIcon />
        </Icon>
      </UpvoteBtn>
      <Dot>•</Dot>
      <DownvoteBtn>
        <Icon>
          <DownvoteIcon />
        </Icon>
      </DownvoteBtn>
    </Div>
  );
};

export default VoteBar;
