import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Icon } from 'antd';
import getUserContext from '../state/User/action';
import Menu from '../components/shared/Menu';
import Router from '../components/shared/Router';
import { loginUrl } from '../utils/api';

const { Header, Footer, Content } = Layout;

const HeaderStyle = styled(Header)`
  background: ${props => props.theme.color.primary};
`;
const HeaderLogoStyle = styled(Header)`
  padding: 0 74px;
`;
const ContentStyle = styled(Content)`  
  padding: 10px 40px 0 40px;
  background: ${props => props.theme.color.back};
`;
const MainContentStyle = styled.div`  
  padding: 24px;
  background: ${props => props.theme.color.normal};  
`;
const LogoStyle = styled.div`  
  width: 120px;
  height: 59px;
  margin: 0;
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

class Document extends Component {
  componentDidMount() {
    this.props.getUserContext();
  }

  render() {
    const { userInfo } = this.props.data;
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
                    <a href={loginUrl}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Document));
