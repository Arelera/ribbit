import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import UfoIcon from '../../../icons/UfoIcon';
import PopularIcon from '../../../icons/PopularIcon';
import GraphUpIcon from '../../../icons/GraphUpIcon';
import TopListIcon from '../../../icons/TopListIcon';
import CogIcon from '../../../icons/CogIcon';
import MessageIcon from '../../../icons/MessageIcon';
import CreateIcon from '../../../icons/CreateIcon';

const Items = styled.div`
  width: 270px;
  min-height: 100px;
  position: absolute;
  top: 34px;
  padding-bottom: 16px;

  ${({ theme }) =>
    css`
      border: 1px solid ${theme.postBorder};
      background: ${theme.gray4};
    `}
  border-top: none;
  border-radius: 0 0 4px 4px;
`;

const H3 = styled.h3`
  padding: 16px 32px 8px;
  font-weight: 400;
  ${({ theme }) =>
    css`
      color: ${theme.gray2};
      font-size: ${theme.fontSmallX};
    `};
`;

const LinkItem = styled.div`
  padding: 8px 24px;
  height: 36px;
  font-weight: 400;
  display: flex;
  align-items: center;
  ${({ theme }) =>
    css`
      color: ${theme.gray0};
      font-size: ${theme.fontMed};
      :hover {
        background: ${theme.gray3};
      }
    `};
`;

const Icon = styled.div`
  height: 20px;
  color: ${({ theme }) => theme.sec2};
`;

const ItemText = styled.span`
  margin-left: 8px;
`;

const NavMenuItems = () => {
  return (
    <Items>
      <H3>RIBBIT FEEDS</H3>
      {redditFeeds.map((item, i) => (
        <Link to={item.link} key={i}>
          <LinkItem>
            <Icon>
              <item.icon />
            </Icon>
            <ItemText>{item.text}</ItemText>
          </LinkItem>
        </Link>
      ))}
      <H3>OTHER</H3>
      {other.map((item, i) => (
        <Link to={item.link} key={i}>
          <LinkItem>
            <Icon>
              <item.icon />
            </Icon>
            <ItemText>{item.text}</ItemText>
          </LinkItem>
        </Link>
      ))}
    </Items>
  );
};

const redditFeeds = [
  {
    link: '/',
    icon: UfoIcon,
    text: 'Home',
  },
  {
    link: '/',
    icon: PopularIcon,
    text: 'Popular',
  },
  {
    link: '/',
    icon: GraphUpIcon,
    text: 'All',
  },
  {
    link: '/',
    icon: TopListIcon,
    text: 'Top Communities',
  },
];

const other = [
  {
    link: '/',
    icon: CogIcon,
    text: 'User Settings',
  },
  {
    link: '/',
    icon: MessageIcon,
    text: 'Messages',
  },
  {
    link: '/subribbits/create',
    icon: CreateIcon,
    text: 'Create Community',
  },
];

export default NavMenuItems;
