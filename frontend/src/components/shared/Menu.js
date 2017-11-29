import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt } from 'antd';
import styled from 'styled-components';

const { Item } = MenuAnt;

const MenuStyle = styled(MenuAnt)`
  line-height: 64px;
  background: ${props => props.theme.color.primary};
`;
const ItemStyle = styled(Item)`
  font-size:16px;
  &  > a {
    color: ${props => props.theme.color.normal} !Important;
  }
  &  > a:hover{
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
  return (
    <MenuStyle
      mode="horizontal"
      defaultSelectedKeys={['2']}
    >
      {props.routes.map((item) => {
        if (item.show === false) {
          return null;
        }
        return (
          <ItemStyle key={item.index}>
            <Link to={item.path}>
              {item.title}
            </Link>
          </ItemStyle>
        );
      })}
    </MenuStyle>
  );
}
export default Menu;
