import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu as MenuAnt } from 'antd';
import styled from 'styled-components';
import routes from '../../routes';

const { Item, SubMenu } = MenuAnt;

const MenuStyle = styled(MenuAnt)`
  line-height: 64px;
  background: ${props => props.theme.color.primary};
`;
const ItemStyle = {
  fontSize: 16,
  color: 'white',
};

function Menu(props) {
  const { categories } = props.data;
  return (
    <MenuStyle
      mode="horizontal"
    >
      {categories && categories.map((category) => {
        const items = category.items.map((item) => {
          const entry = routes.find(route => item.name === route.name && !route.hidden);
          if (item.type === 'menu' && entry) {
            return (
              <Item key={item.id} >
                <Link
                  to={entry.path}
                  style={!category.name ? ItemStyle : { fontSize: 16 }}
                >
                  {item.title}
                </Link>
              </Item>
            );
          }
          return null;
        });

        if (category.name) {
          return (
            <SubMenu
              key={category.name}
              title={
                <span style={ItemStyle}>
                  {category.name}
                  <Icon type="caret-down" style={{ marginLeft: 5 }} />
                </span>
              }
            >
              {items}
            </SubMenu>
          );
        }
        return items;
      })}
    </MenuStyle>
  );
}

export default Menu;
