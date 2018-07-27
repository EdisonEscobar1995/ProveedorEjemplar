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

const SubMenuStyle = styled(SubMenu)`
  & .ant-menu-vertical.ant-menu-sub {
      max-height: 450px;
      overflow-y: auto;
    }
`;

const IconHome = styled(Icon)`
  font-size: 18px;
  color: white;
`;

const ItemStyle = {
  color: 'white',
};

function Menu(props) {
  const { categories } = props.data;
  return (
    <MenuStyle
      mode="horizontal"
    >
      <Item key="HOME" >
        <Link to={'/'} >
          <IconHome type="home" />
        </Link>
      </Item>
      {categories && categories.map((category) => {
        const items = category.items.map((item) => {
          const entry = routes.find(route => item.name === route.name && !route.hidden);
          if (item.type === 'menu' && entry) {
            return (
              <Item key={item.id} >
                <Link
                  to={entry.path}
                  style={!category.name ? ItemStyle : null}
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
            <SubMenuStyle
              key={category.name}
              title={
                <span style={ItemStyle}>
                  {category.name}
                  <Icon type="caret-down" style={{ marginLeft: 5 }} />
                </span>
              }
            >
              {items}
            </SubMenuStyle>
          );
        }
        return items;
      })}
    </MenuStyle>
  );
}

export default Menu;
