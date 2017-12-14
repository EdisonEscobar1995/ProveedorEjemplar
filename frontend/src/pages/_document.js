import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Layout, Breadcrumb, Icon } from 'antd';
import getUserContext from '../state/User/action';
import Menu from '../components/shared/Menu';
import Router from '../components/shared/Router';

const { Header, Footer, Content } = Layout;

const HeaderStyle = styled(Header)`
  background: ${props => props.theme.color.primary};
`;
const HeaderLogoStyle = styled(Header)`
  padding: 0 74px;
`;
const ContentStyle = styled(Content)`  
  padding: 0 50px;
  background: ${props => props.theme.color.back};
`;
const BreadcrumbStyle = styled(Breadcrumb)`  
  padding: 35px 0;
  background: ${props => props.theme.color.back};
`;
const BreadcrumbItemStyle = styled(Breadcrumb.Item)`  
  color: ${props => props.theme.color.secondary};
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
const IconBreadStyle = styled(Icon)`  
  margin-right: 6px;
`;

class Document extends Component {
  componentDidMount() {
    this.props.getUserContext();
  }

  render() {
    const { userInfo, pathInfo } = this.props.data;
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
                    {userInfo && userInfo.name}
                  </NameStyle>
                  <CloseStyle>
                    <a href={pathInfo && `${pathInfo.host}${pathInfo.webDbName}?login&redirectto=${pathInfo.webDbName}/dist/index.html`}>
                      Cerrar sesión
                    </a>
                  </CloseStyle>
                </div>
              </InfoStyle>
            </LogStyle>
          </HeaderContentStyle>
        </HeaderLogoStyle>
        <HeaderStyle>
          <Menu {...this.props} />
        </HeaderStyle>
        <ContentStyle>
          <BreadcrumbStyle>
            <BreadcrumbItemStyle><IconBreadStyle type="home" /> Home</BreadcrumbItemStyle>
            <BreadcrumbItemStyle>Application Center</BreadcrumbItemStyle>
          </BreadcrumbStyle>
          <MainContentStyle>
            <Router />
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
}

const mapStateToProps = state => ({
  data: state.user.data,
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  getUserContext: () => dispatch(getUserContext()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
