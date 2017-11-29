import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Icon } from 'antd';
import Menu from '../components/shared/Menu';
import routes from '../routes';

const { Header, Footer, Content } = Layout;

const HeaderStyle = styled(Header)`
  background: ${props => props.theme.color.primary};
`;
const HeaderLogoStyle = styled(Header)`
  padding: 0 74px;
`;
const ContentStyle = styled(Content)`  
  padding: 50px;
  background: ${props => props.theme.color.back};
`;
const MainContentStyle = styled.div`  
  padding: 24px;
  background: ${props => props.theme.color.normal};  
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
const HeaderContentStyle = styled.div`  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LogStyle = styled.div`  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InfoStyle = styled.div`  
  display: flex;
  flex-direction: row;
  & > * {
    line-height: normal;
  }
`;
const WelcomeStyle = styled.h4`
  color: ${props => props.theme.color.info}
`;
const NameStyle = styled.h3`  
  color: ${props => props.theme.color.primary};
  margin-bottom: 6px;
`;
const CloseStyle = styled.h4`
  color: ${props => props.theme.color.secondary}
`;
const IconStyle = styled(Icon)`  
  font-size: 30px;
  padding: 0 10px;
`;


function Document() {
  return (
    <Layout>
      <HeaderLogoStyle>
        <HeaderContentStyle>
          <LogoStyle />
          <LogStyle>
            <InfoStyle>
              <IconStyle type="user" />
              <div>
                <WelcomeStyle>
                  Bienvenido,
                </WelcomeStyle>
                <NameStyle>
                  Usuario
                </NameStyle>
                <CloseStyle>
                  Cerrar session
                </CloseStyle>
              </div>
            </InfoStyle>
          </LogStyle>
        </HeaderContentStyle>
      </HeaderLogoStyle>
      <HeaderStyle>
        <Menu routes={routes} />
      </HeaderStyle>
      <ContentStyle>
        <MainContentStyle>
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
        </MainContentStyle>
      </ContentStyle>
      <Footer>
        <FooterContentStyle>
          <span>
            Copyright © 2017 Grupo Nutresa - Todos los derechos reservados | Medellín - Colombia
          </span>
        </FooterContentStyle>
      </Footer>
    </Layout>
  );
}

export default Document;
