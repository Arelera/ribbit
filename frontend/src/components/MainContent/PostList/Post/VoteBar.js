import styled from 'styled-components';
import DownvoteIcon from '../../../../icons/DownvoteIcon';
import UpvoteIcon from '../../../../icons/UpvoteIcon';

const Div = styled.div`
  height: 80px;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  padding: 8px 4px;
`;

const Dot = styled.div`
  color: ${({ theme }) => theme.gray0};
`;

const Icon = styled.div`
  height: 24px;
  color: ${({ theme }) => theme.gray2};
`;

const VoteBar = () => {
  return (
    <Div>
      <Icon>
        <UpvoteIcon />
      </Icon>
      <Dot>•</Dot>
      <Icon>
        <DownvoteIcon />
      </Icon>
    </Div>
  );
};

export default VoteBar;
