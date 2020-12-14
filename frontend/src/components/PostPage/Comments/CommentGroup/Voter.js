import styled, { css } from 'styled-components';
import UpvoteIcon from '../../../../icons/UpvoteIcon';
import DownvoteIcon from '../../../../icons/DownvoteIcon';

const Div = styled.div`
  padding: 0 2px;
  width: 40px;
  flex-shrink: 0;
`;

const Button = styled.button`
  background: none;
  border: none;

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
  :hover {
    color: ${({ theme }) => theme.prim1};
  }
`;

const DownvoteBtn = styled(Button)`
  :hover {
    color: ${({ theme }) => theme.sec2};
  }
`;

const Icon = styled.div`
  height: 26px;
`;

const Voter = () => {
  return (
    <Div>
      <UpvoteBtn>
        <Icon>
          <UpvoteIcon />
        </Icon>
      </UpvoteBtn>
      <DownvoteBtn>
        <Icon>
          <DownvoteIcon />
        </Icon>
      </DownvoteBtn>
    </Div>
  );
};

export default Voter;
