import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Spin } from 'antd';
import * as actions from '../../state/Home/action';
import { Carousel, Doughnut, PendingsManager, PendingsTechnical, PendingsEvaluator, PendingsSupplier } from './';
import FormattedMessage from '../shared/FormattedMessage';

const H3 = styled.h3`
  color: ${props => props.theme.color.primary};
  margin-bottom: ${props => props.theme.spaces.main};
  font-weight: bold;
`;

const Linea = styled.div`
  border: 1px solid #37907c7a;
  margin: 20px 0;
`;

class HomeContainer extends Component {
  state = {
    value: 1,
  }

  componentDidMount() {
    this.props.getAllGeneralData();
    this.props.getCurrentData();
  }

  render() {
    const { loading, dataCurrent, dataUser } = this.props;
    const rol = dataUser.rols
      && dataUser.rols.find(x => x).shortName;
    return (
      <Spin spinning={loading}>
        <Row type="flex" justify="center">
          <Col span={10} offset={2}>
            <H3><FormattedMessage id="Title.imageGallery" /></H3>
            <Carousel {...this.props} />
          </Col>
          {
            rol !== 'SUPPLIER' &&
              (
                <Col span={10} offset={2}>
                  <H3><FormattedMessage id="Title.percentageAdvance" /></H3>
                  <Doughnut {...this.props} />
                </Col>
              )
          }
        </Row>
        {
          rol === dataCurrent &&
              (
                <div>
                  <Linea />
                  <Row>
                    <Col span={24}>
                      <H3><FormattedMessage id="Title.pendings" /></H3>
                      <p><FormattedMessage id="Title.informationMessage" /></p>
                      {
                        dataCurrent === 'MANAGER_TEAM' && <PendingsManager />
                      }
                      {
                        dataCurrent === 'TECHNICAL_TEAM' && <PendingsTechnical />
                      }
                      {
                        dataCurrent === 'EVALUATOR' && <PendingsEvaluator />
                      }
                      {
                        dataCurrent === 'SUPPLIER' && <PendingsSupplier />
                      }
                    </Col>
                  </Row>
                </div>
              )}
      </Spin>
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.home.data,
    loading: state.home.loading,
    dataUser: state.main.data,
    dataCurrent: state.home.dataCurrent,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(HomeContainer);
