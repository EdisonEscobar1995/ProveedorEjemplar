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
    width: 20%;
    text-align: right;
    padding: 4px;
    color: #006159;
    font-size: 14px;
  }

  .percent {
    margin-left: 5px;
    width: 85%;
    opacity: 1;
    height: 20px;
  }

  .percent > div {
    background: #006159;
    height: inherit;
  }
`;

const TrTable = styled.tr`
  .percent > div {
    &:after {
      content: ${props => `'${props.widthTr}'` || ' '};
      color: #000;
      position: relative;
      left: 100%;
      margin-left: 8px;
    }
  }
`;

const PuntajeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .dBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
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
`;

class SupplierReportContainer extends Component {
  componentDidMount() {
    this.props.getParticipantsByYear();
  }

  handleResults = (values) => {
    const { supplier } = values;
    const { suppliersByCall } = this.props.data;
    const supplierByCall = suppliersByCall.filter(item => item.idSupplier === supplier)[0];
    const data = {};
    data.idCall = supplierByCall.idCall;
    data.idSupplier = supplierByCall.idSupplier;
    data.idSurvey = supplierByCall.idSurvey;
    this.props.getReportBySupplier(data);
  };

  render() {
    const { totalScoreSupplier } = this.props;

    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
          submitMethod={this.handleResults}
          validate
        />
        {console.log('totalScoreSupplier == ', totalScoreSupplier) /* totalScoreSupplier && totalScoreSupplier.totalScoreEvaluatorDimension && totalScoreSupplier.totalScoreEvaluatorDimension.length > 0 &&
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
        {<div id="content-export" style={{ marginTop: 20 }}>
          {totalScoreSupplier && totalScoreSupplier.totalScoreEvaluatorDimension &&
          totalScoreSupplier.totalScoreEvaluatorDimension.length > 0 &&
            <div>
              <Title className="title">Evaluación general</Title>
              <Row id="content-general">
                <Col span={16}>
                  <Table>
                    <tbody>
                      <TrTable widthTr={`${totalScoreSupplier.totalScoreOfEvaluator.toFixed(2)}%`} >
                        <td className="name">Total</td>
                        <td>
                          <div className="percent">
                            <div style={{ width: `${totalScoreSupplier.totalScoreOfEvaluator === 0 ? 0.2 : totalScoreSupplier.totalScoreOfEvaluator.toFixed(2)}%` }} />
                          </div>
                        </td>
                      </TrTable>
                      {totalScoreSupplier.totalScoreEvaluatorDimension.map(dimension => (
                        <TrTable key={dimension.idDimension} widthTr={`${dimension.scoreTotal.toFixed(2)}%`} >
                          <td className="name">{dimension.dimension}</td>
                          <td>
                            <div className="percent">
                              <div style={{ width: `${dimension.scoreTotal === 0 ? 0.2 : dimension.scoreTotal.toFixed(2)}%` }} />
                            </div>
                          </td>
                        </TrTable>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col span={5}>
                  <PuntajeBox>
                    <div className="dBox">
                      <span className="sText">PUNTAJE CONSOLIDADO</span>
                      <span className="sPuntaje">{totalScoreSupplier.totalScoreOfEvaluator.toFixed(2)}%</span>
                    </div>
                  </PuntajeBox>
                </Col>
                <div id="data-canvas-general" />
              </Row>
              {totalScoreSupplier.totalScoreEvaluatorDimension.map((dimension, index) => (
                <Row style={{ marginTop: '25px' }} key={`id_${dimension.idDimension}`} id={`dimension_${index}`}>
                  <Col span={24}>
                    <Title className="title">{`${dimension.dimension} (${dimension.scoreTotal.toFixed(2)}%)`}</Title>
                    <Table style={{ width: '75%', margin: '0 auto' }}>
                      <tbody>
                        {totalScoreSupplier.totalScoreEvaluatorCriterion.map(criterio =>
                          criterio.idDimension === dimension.idDimension && (
                            <TrTable key={criterio.idCriterio} widthTr={`${criterio.scoreTotal.toFixed(2)}%`} >
                              <td className="name">{criterio.criterio}</td>
                              <td>
                                <div className="percent" id={`percent-criterio_${criterio.idCriterio}`}>
                                  <div style={{ width: `${criterio.scoreTotal === '' || criterio.scoreTotal === 0 ? 0.2 : criterio.scoreTotal.toFixed(2)}%` }} />
                                  <section id={`data-percent-criterio_${criterio.idCriterio}`} />
                                </div>
                              </td>
                            </TrTable>
                          ))}
                      </tbody>
                    </Table>
                  </Col>
                  <div id={`data-canvas-dimension_${index}`} />
                </Row>
              ))}
            </div> }
        </div> }


        {/* <div id="content-export" style={{ marginTop: 20 }}>
          {totalScoreSupplier && totalScoreSupplier.totalScoreEvaluatorDimension && 
           totalScoreSupplier.totalScoreEvaluatorDimension.length > 0 &&
            <div>
              <Title className="title">Evaluación general</Title>
              <Table>
                <tbody>
                  <tr>
                    <td className="trRow" style={{ width: '50%' }}>
                      <Table>
                        <tbody>
                          {totalScoreSupplier.totalScoreEvaluatorDimension.map(dimension => (
                            <tr key={dimension.idDimension}>
                              <td className="name">{dimension.dimension}</td>
                              <td>
                                <div className="percent">
                                  <div style={{ width: `${dimension.scoreTotal === 0 
                                  ? 1 : dimension.scoreTotal.toFixed(2)}%`, 
                                  opacity: `${dimension.scoreTotal === 0 ? 0.05 : 1}` }}>_</div>
                                </div>
                              </td>
                              <td style={{ width: '10%' }}>
                                <span>{dimension.scoreTotal.toFixed(2)}%</span>
                              </td>
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
                            <td style={{ paddingTop: '18px', textAlign: 'center', 
                              background: '#006159', paddingBottom: '18px', 
                              color: '#fff', borderRadius: '10px' }}>
                              <div className="sText">PUNTAJE CONSOLIDADO</div>
                              <div className="sPuntaje">
                                {totalScoreSupplier.totalScoreOfEvaluator.toFixed(2)}%
                              </div>
                            </td>
                            <td style={{ width: '35%' }} />
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div id="data-canvas-general" />
              {totalScoreSupplier.totalScoreEvaluatorDimension.map((dimension, index) => (
                <Row style={{ marginTop: '25px' }} key={`id_${dimension.idDimension}`}>
                  <Col span={24}>
                    <Title className="title">
                      {`${dimension.dimension} (${dimension.scoreTotal.toFixed(2)}%)`}
                    </Title>
                    <Table>
                      <tbody>
                        <tr>
                          <td style={{ width: '10%' }} />
                          <td>
                            <Table>
                              <tbody>
                                {totalScoreSupplier.totalScoreEvaluatorCriterion.map(criterio => 
                                  criterio.idDimension === dimension.idDimension && (
                                  <tr key={criterio.idCriterio} >
                                    <td className="name">{criterio.criterio}</td>
                                    <td>
                                      <div className="percent">
                                        <div style={{
                                          width: `${criterio.scoreTotal === '' || 
                                          criterio.scoreTotal === 0 ? 1 :
                                          criterio.scoreTotal.toFixed(2)}%`,
                                          opacity: `${criterio.scoreTotal === '' ||
                                          criterio.scoreTotal === 0 ? 0.05 : 1}` }}
                                        />
                                        <span>{criterio.scoreTotal.toFixed(2) || 0}%</span>
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
                                        </div> */}
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.supplierReport.data,
  totalScoreSupplier: state.supplierReport.totalScoreSupplier,
  loading: state.supplierReport.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(SupplierReportContainer);
