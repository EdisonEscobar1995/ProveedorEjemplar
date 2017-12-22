import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Icon, BackTop } from 'antd';
import getUserContext from '../state/User/action';
import FormattedMessage from '../components/shared/FormattedMessage';
import Menu from '../components/shared/Menu';
import Router from '../components/shared/Router';
import { loginUrl } from '../utils/api';
// import { changeLanguage } from '../translation/functions';
import { setIntl } from '../utils/translate';

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
const FooterImgStyle = styled.img`  
  max-width: 100%;
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
  justify-content: center;
  align-items: center;
`;

const FooterStyle = styled(Footer)`
  padding: 0;
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
  font-weight: 600;
  font-style: normal;
`;
const CloseStyle = styled.h4`
  color: ${props => props.theme.color.secondary}
`;
const IconStyle = styled(Icon)`  
  font-size: 30px;
  padding: 0 10px;
`;
const UserStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;
// const LanguageStyle = styled.a`
//   width: 16px;
//   height: 11px;
//   background-image: url(${props => props.theme.images[props.language]});
//   background-repeat: no-repeat;
//   background-size: contain;
// `;


class Document extends Component {
  componentDidMount() {
    setIntl(this.props.intl);
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
                <UserStyle>
                  <IconStyle type="user" />
                  {/* 
                  <LanguageStyle language={this.props.noActiveLanguage} onClick={changeLanguage} /> 
                  */}
                </UserStyle>
                <div>
                  <WelcomeStyle>
                    <FormattedMessage id="Header.welcome" />
                  </WelcomeStyle>
                  <NameStyle>
                    {userInfo && userInfo.name}
                  </NameStyle>
                  <CloseStyle>
                    <a href={loginUrl}>
                      <FormattedMessage id="Header.logOut" />
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
            <BackTop />
            <Router />
          </MainContentStyle>
        </ContentStyle>
        <FooterStyle>
          <FooterContentStyle>
            <FooterImgStyle src="assets/images/footer.png" alt="footer" />
          </FooterContentStyle>
        </FooterStyle>
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

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(Document)));
