import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Icon, BackTop, Modal, Button } from 'antd';
import * as action from '../state/Main/action';
import FormattedMessage from '../components/shared/FormattedMessage';
import Menu from '../components/shared/Menu';
import ManagerTeamSurveyMobile from '../pages/ManagerTeamSurveyMobile';
import Router from '../components/shared/Router';
import { webDbName } from '../utils/api';
import { changeLanguage } from '../translation/functions';
import LangIntl from '../utils/translate';
import setLanguageApi from '../api/language';
import isMobile from '../utils/isMobile';

const { Header, Footer, Content } = Layout;

const logout = () => {
  window.CerrarSesionSSO(webDbName);
};

const HeaderStyle = styled(Header)`
  background: ${props => props.theme.color.primary};
`;
const HeaderLogoStyle = styled(Header)`
  padding: 0 5%;
`;
const ContentStyle = styled(Content)`  
  padding: 10px 40px 0 40px;
  background: ${props => props.theme.color.back};
`;

const ContentStyleMobile = styled(Content)`  
  padding: 10px 5px 0 5px;
  background: ${props => props.theme.color.back};
`;

const MainContentStyle = styled.div`
  padding: 2%;
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
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
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
const LanguageStyle = styled.a`
  width: 16px;
  height: 11px;
  background-image: url(${props => props.theme.images[props.language]});
  background-repeat: no-repeat;
  background-size: contain;
`;

class Document extends Component {
  componentDidMount() {
    LangIntl.setIntl(this.props.intl);
    setLanguageApi().then(() => this.props.getUserContext());
  }

  render() {
    const { userInfo } = this.props.data;
    return (
      <Layout>
        <HeaderLogoStyle>
          <HeaderContentStyle>
            <Link to={'/'}>
              <LogoStyle className="imgLogo" />
            </Link>
            <LogStyle>
              <InfoStyle>
                <UserStyle>
                  <IconStyle type="user" />
                  <LanguageStyle language={this.props.noActiveLanguage} onClick={changeLanguage} />
                </UserStyle>
                <div>
                  <WelcomeStyle>
                    <FormattedMessage id="Header.welcome" />
                  </WelcomeStyle>
                  <NameStyle>
                    {userInfo && userInfo.name}
                  </NameStyle>
                  <CloseStyle>
                    <Button onClick={logout}>
                      <FormattedMessage id="Header.logOut" />
                    </Button>
                  </CloseStyle>
                </div>
              </InfoStyle>
            </LogStyle>
          </HeaderContentStyle>
        </HeaderLogoStyle>
        {!isMobile.any() && (
          <HeaderStyle>
            <Menu {...this.props} />
          </HeaderStyle>
        )}
        {!isMobile.any() ? (
          <ContentStyle>
            <MainContentStyle>
              <BackTop />
              <Router />
            </MainContentStyle>
            <Modal
              width="50%"
              title={this.props.title}
              visible={this.props.visibleModal}
              onCancel={this.props.closeModal}
              footer={null}
            >
              {
                this.props.visibleModal && this.props.component
              }
            </Modal>
          </ContentStyle>
        ) : (
          <ContentStyleMobile>
            <MainContentStyle>
              <ManagerTeamSurveyMobile />
            </MainContentStyle>
          </ContentStyleMobile>
        )}
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
  data: state.main.data,
  visibleModal: state.main.visibleModal,
  component: state.main.component,
  loading: state.main.loading,
});

export default injectIntl(withRouter(connect(mapStateToProps, action)(Document)));
