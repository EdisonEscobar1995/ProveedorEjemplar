import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu as MenuAnt, Spin } from 'antd';
import styled from 'styled-components';
import routes from '../../routes';
import getMenuByRol from '../../state/Menu/action';

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

class Menu extends Component {
  componentDidMount() {
    this.props.getMenuByRol();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <MenuStyle
          mode="horizontal"
        >
          {this.props.menu.map((item) => {
            const entry = routes.find(route => item.name === route.name);
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
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.menu.data,
  loading: state.menu.loading,
});

const mapDispatchToProps = dispatch => ({
  getMenuByRol: () => dispatch(getMenuByRol()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
