import styled, { css } from 'styled-components';
import useVisible from '../../../hooks/useVisible';
import ChevBotIcon from '../../../icons/ChevBotIcon';
import KarmaIcon from '../../../icons/KarmaIcon';
import ProfileMenuList from './ProfileMenuList';

const Div = styled.div`
  position: relative;
`;

const Button = styled.button`
  height: 40px;
  width: 215px;
  background: transparent;
  margin-left: 8px;
  padding: 0 8px;
  border-radius: 4px;
  outline: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    css`
      border: 1px solid
        ${props.expanded ? props.theme.postBorder : 'transparent'};

      :hover {
        border-color: ${props.theme.postBorder};
      }
    `}
`;

const ChevBot = styled.div`
  height: 20px;
  color: ${({ theme }) => theme.gray2};
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.span`
  font-family: 'IBM Plex Sans';
  font-weight: 600;

  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontSmall};
    `};
`;

const Karma = styled.span`
  font-family: 'IBM Plex Sans';
  ${({ theme }) =>
    css`
      color: ${theme.gray1};
      font-size: ${theme.fontSmall};
    `};
`;

const IconKarma = styled.div`
  display: inline-block;
  height: 10px;
  margin-right: 2px;
  color: #2dc7ff;
`;

const ProfileMenu = () => {
  const [expanded, setExpanded, refVisible] = useVisible(false);

  return (
    <Div ref={refVisible}>
      <Button expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <LeftSide>
          <Name>Bobby</Name>
          <Karma>
            <IconKarma>
              <KarmaIcon />
            </IconKarma>
            123 karma
          </Karma>
        </LeftSide>
        <ChevBot>
          <ChevBotIcon />
        </ChevBot>
      </Button>
      {expanded && <ProfileMenuList />}
    </Div>
  );
};

export default ProfileMenu;
