/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col } from 'antd';
import styled from 'styled-components';
import * as actions from '../../state/SupplierReport/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
// import SupplierReport from './SupplierReport';

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #006159;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;

  td.name {
    width: 8%;
    text-align: right;
    padding: 4px;
    color: #006159;
    font-size: 14px;
  }

  .percent {
    margin-left: 10px;
    height: 20px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .percent > div {
    background: #006159;
    height: inherit;
  }

  .percent > span {
    display: inline-block;
    padding: 0 10px;
  }
`;

/* const PuntajeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .dBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 87px;
    background: #006159;
    color: #ffffff;
    padding: 10px;
    font-size: 16px;
    border-radius: 10px;
    max-width: 150px;
  }
  .sText {
    text-align: center;
  }
  .sPuntaje {
    font-size: 25px;
  }
`; */

class SupplierReportContainer extends Component {
  componentDidMount() {
    this.props.getParticipantsByYear();
  }

  handleResults = (values) => {
    const { supplier } = values;
    const { suppliersByCall, states } = this.props.data;
    const supplierByCall = suppliersByCall.filter(item => item.idSupplier === supplier)[0];
    const stateData = states.filter(item => item.id === supplierByCall.idState)[0];
    console.log(supplierByCall);
    console.log('states = ', this.props.data.states);
    this.props.getReportBySupplier(supplierByCall.idSurvey, supplierByCall.id,
      stateData);
  };

  render() {
    const { dimensions } = this.props;
    const dataDimension = [];
    if (dimensions && dimensions.length > 0) {
      dimensions.forEach((dimension) => {
        dataDimension.push([`${dimension.name}`, dimension.percent]);
      });
    }
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
          submitMethod={this.handleResults}
          validate
        />
        {/* dimensions && dimensions.length > 0 &&
          <Card>
            {dimensions.map(dimension => (
              <div style={{ padding: 20 }} key={dimension.id}>
                <ProgressBar key={dimension.id}>
                  <div className="name">{dimension.name}</div>
                  <div className="barBox">
                    <div className="bar barOddDark" style={{ width: `${dimension.percent}%` }} />
                    <div className="bar barText">
                      <span />
                      <span>{dimension.percent}%</span>
                    </div>
                  </div>
                </ProgressBar>
              </div>
            ))}
            </Card> */}
        {/* <div id="content-export" style={{ marginTop: 20 }}>
          {dimensions && dimensions.length > 0 &&
            <div>
              <Title className="title">Evaluación general</Title>
              <Row>
                <Col span={12}>
                  <Table>
                    <tbody>
                      {dimensions.map(dimension => (
                        <tr key={dimension.id}>
                          <td className="name">{dimension.name}</td>
                          <td>
                            <div className="percent">
                              <div style={{ width: `${dimension.percent === 0 ? 1 : dimension.percent}%`, opacity: `${dimension.percent === 0 ? 0.05 : 1}` }} />
                              <span>{dimension.percent}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col span={12}>
                  <PuntajeBox>
                    <div className="dBox">
                      <span className="sText">PUNTAJE CONSOLIDADO</span>
                      <span className="sPuntaje">46.3%</span>
                    </div>
                  </PuntajeBox>
                </Col>
                <div id="data-canvas-general" />
              </Row>
              {dimensions.map((dimension, index) => (
                <Row style={{ marginTop: '25px' }} key={`id_${dimension.id}`}>
                  <Col span={24}>
                    <Title className="title">{`${dimension.name} (${dimension.percent}%)`}</Title>
                    <Table>
                      <tbody>
                        {dimension.criterions.map(criterio => (
                          <tr key={criterio.id} >
                            <td className="name">{criterio.name}</td>
                            <td>
                              <div className="percent">
                                <div style={{
                                  width: `${criterio.score === '' || criterio.score === 0 ? 1 : criterio.score}%`,
                                  opacity: `${criterio.score === '' || criterio.score === 0 ? 0.05 : 1}` }}
                                />
                                <span>{criterio.score || 0}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <div id={`data-canvas-dimension_${index}`} />
                </Row>
              ))}
            </div> }
        </div> */ }
        <div id="content-export" style={{ marginTop: 20 }}>
          {dimensions && dimensions.length > 0 &&
            <div>
              <Title className="title">Evaluación general</Title>
              <Table>
                <tbody>
                  <tr>
                    <td className="trRow" style={{ width: '50%' }}>
                      <Table>
                        <tbody>
                          {dimensions.map(dimension => (
                            <tr key={dimension.id}>
                              <td className="name">{dimension.name}</td>
                              <td>
                                <div className="percent">
                                  <div style={{ width: `${dimension.percent === 0 ? 1 : dimension.percent}%`, opacity: `${dimension.percent === 0 ? 0.05 : 1}` }}>_</div>
                                </div>
                              </td>
                              <td style={{ width: '10%' }}><span>{dimension.percent}%</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </td>
                    <td className="trRow" style={{ width: '50%' }}>
                      <Table>
                        <tbody>
                          <tr>
                            <td style={{ width: '35%' }} />
                            <td style={{ paddingTop: '18px', textAlign: 'center', background: '#006159', paddingBottom: '18px', color: '#fff', borderRadius: '10px' }}>
                              <div className="sText">PUNTAJE CONSOLIDADO</div>
                              <div className="sPuntaje">46.3%</div>
                            </td>
                            <td style={{ width: '35%' }} />
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {dimensions.map((dimension, index) => (
                <Row style={{ marginTop: '25px' }} key={`id_${dimension.id}`}>
                  <Col span={24}>
                    <Title className="title">{`${dimension.name} (${dimension.percent}%)`}</Title>
                    <Table>
                      <tbody>
                        <tr>
                          <td style={{ width: '10%' }} />
                          <td>
                            <Table>
                              <tbody>
                                {dimension.criterions.map(criterio => (
                                  <tr key={criterio.id} >
                                    <td className="name">{criterio.name}</td>
                                    <td>
                                      <div className="percent">
                                        <div style={{
                                          width: `${criterio.score === '' || criterio.score === 0 ? 1 : criterio.score}%`,
                                          opacity: `${criterio.score === '' || criterio.score === 0 ? 0.05 : 1}` }}
                                        />
                                        <span>{criterio.score || 0}%</span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </td>
                          <td style={{ width: '10%' }} />
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <div id={`data-canvas-dimension_${index}`} />
                </Row>
              ))}
            </div> }
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.supplierReport.data,
  dimensions: state.supplierReport.dimensions,
  loading: state.supplierReport.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(SupplierReportContainer);
