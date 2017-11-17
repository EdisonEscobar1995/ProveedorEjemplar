import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from 'antd';
import Menu from '../components/shared/Menu';
import routes from '../routes';

const { Header, Footer, Content } = Layout;

const HeaderStyle = styled(Header)`
  position: 'fixed';
  width: '100%';
`;
const ContentStyle = styled(Content)`  
  padding: 0 50px;
`;
const MainContesStyle = styled.div`  
  padding: 24px;
`;
const LogoStyle = styled.div`  
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  float: left;
  background-image: url(${props => props.theme.images.logo});
  background-repeat: no-repeat;
  background-size: contain;
`;

const FooterContentStyle = styled.div`  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


function Document() {
  return (
    <Layout>
      <HeaderStyle>
        <LogoStyle />
        <Menu routes={routes} />
      </HeaderStyle>
      <ContentStyle>
        <MainContesStyle>
          <Switch>
            {routes.map(route => (
              <Route
                key={route.index}
                component={route.component}
                exact={route.exact === true}
                path={route.path}
              />
            ))}
          </Switch>
        </MainContesStyle>
      </ContentStyle>
      <Footer>
        <FooterContentStyle>
          <span>
            Copyright © 2017 Grupo Nutresa - Todos los derechos reservados | Medellín - Colombia
          </span>
          <LogoStyle />
        </FooterContentStyle>
      </Footer>
    </Layout>
  );
}

export default Document;
