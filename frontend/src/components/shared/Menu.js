import React from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt } from 'antd';
import styled from 'styled-components';

const { Item } = MenuAnt;

const MenuStyle = styled(MenuAnt)`
  line-height: 64px;
`;
const ItemStyle = styled(Item)`
  font-size:16px;
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
        return (<ItemStyle key={item.index}>
          <Link to={item.path}>
            {item.title}
          </Link>
        </ItemStyle>);
      })}
    </MenuStyle>
  );
}
export default Menu;
