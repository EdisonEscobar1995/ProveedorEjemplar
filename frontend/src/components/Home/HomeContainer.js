import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col, Spin } from 'antd';
import * as actions from '../../state/Home/action';
import { Carousel, Doughnut, PendingsManager, PendingsTechnical } from './';

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
    this.props.getStatisticalData();
    this.props.getCurrentData();
  }

  render() {
    const { loading, dataCurrent, dataUser } = this.props;
    return (
      <Spin spinning={loading}>
        <Row type="flex" justify="center">
          <Col span={10} offset={2}>
            <H3>Galería de imágenes</H3>
            <Carousel {...this.props} />
          </Col>
          <Col span={10} offset={2}>
            <H3>Porcentaje de avance</H3>
            <Doughnut {...this.props} />
          </Col>
        </Row>
        {
          dataUser.rols
              && dataUser.rols.find(x => x).shortName === dataCurrent &&
              (
                <div>
                  <Linea />
                  <Row>
                    <Col span={24}>
                      <H3>Mis pendientes</H3>
                      <p>A continuación se presentan los proveedores
                      que están pendientes por evaluar.</p>
                      {
                        dataCurrent === 'MANAGER_TEAM' && <PendingsManager />
                      },
                      {
                        dataCurrent === 'TECHNICAL_TEAM' && <PendingsTechnical />
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
    statisticalData: state.home.statisticalData,
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
