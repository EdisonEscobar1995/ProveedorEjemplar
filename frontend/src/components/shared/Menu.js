import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt } from 'antd';
import styled from 'styled-components';
import routes from '../../routes';

const { Item } = MenuAnt;

const MenuStyle = styled(MenuAnt)`
  line-height: 64px;
  background: ${props => props.theme.color.primary};
`;
const ItemStyle = styled(Item)`
  font-size:16px;
  & > a {
    color: ${props => props.theme.color.normal} !Important;
  }
  & > a:hover{
    color: ${props => props.theme.color.normal} !Important;
  }
  &:hover {
    border-bottom: 2px solid ${props => props.theme.color.normal} !Important;
  }
  & .ant-menu-item-selected {
    border-bottom: 2px solid ${props => props.theme.color.normal} !Important;
  }
`;

function Menu(props) {
  const { menu } = props.data;
  return (
    <MenuStyle
      mode="horizontal"
    >
      {menu && menu.map((item) => {
        const entry = routes.find(route => item.name === route.name && !route.hidden);
        if (item.type === 'menu' && entry) {
          return (
            <ItemStyle key={item.id}>
              <Link to={entry.path}>
                {item.title}
              </Link>
            </ItemStyle>
          );
        }
        return null;
      })}
    </MenuStyle>
  );
}

export default Menu;
