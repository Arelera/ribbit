import styled, { css } from 'styled-components';
import { format } from 'date-fns';
import CakeIcon from '../../icons/CakeIcon';
import Button from '../reusable/Button';
import { useHistory } from 'react-router-dom';

const Aside = styled.aside`
  width: 312px;
  flex-shrink: 0;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
      ${theme.tablet} {
        display: none;
      }
    `};
`;

const AsideTitle = styled.h2`
  margin-bottom: 24px;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontMed};
    `}
`;

const SubribbitInfo = styled.div`
  ${({ theme }) => theme.box()}
  border-radius: 4px;
  padding: 12px;
`;

const Members = styled.h2`
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontLarge};
`;

const MembersP = styled.p`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSmall};
  margin-bottom: 12px;
`;

const Icon = styled.span`
  display: inline-block;
  height: 16px;
  margin-right: 8px;
`;

const PostBtn = styled(Button)`
  width: 100%;
  padding: 0 16px;
  font-size: ${({ theme }) => theme.fontMed};
  height: 34px;
  margin-top: 12px;
`;

const SubPageAside = ({ info }) => {
  const history = useHistory();
  return (
    <Aside>
      <SubribbitInfo>
        <AsideTitle>About Community</AsideTitle>
        <p>{info.description}</p>
        <div>
          <Members>{info.memberCount}</Members>
          <MembersP>
            <span>Members</span>
          </MembersP>
        </div>
        <div>
          <div>
            <p>
              <Icon>
                <CakeIcon />
              </Icon>
              Created {format(new Date(info.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
          <PostBtn onClick={() => history.push(`/r/${info.name}/submit`)}>
            CREATE POST
          </PostBtn>
        </div>
      </SubribbitInfo>
    </Aside>
  );
};

export default SubPageAside;
