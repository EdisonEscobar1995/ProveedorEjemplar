import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Spin } from 'antd';
import * as actions from '../../state/TechnicalTeamSurvey/action';

const { Column } = Table;

class PendingsTechnical extends Component {
  componentDidMount() {
    this.props.getTechnicalTeamSurvey();
  }
  getPendingsColumns = () => {
    const { data } = this.props;
    const { masters } = data;

    const columns = [{
      title: 'Proveedor',
      key: 'businessName',
    }, {
      title: 'Tipo de suministro',
      key: 'idSupply',
      render(text, record) {
        return masters.Supply.find(supply => supply.id === record.idSupply).name;
      },
    }, {
      title: 'Tamaño de empresa',
      key: 'idCompanySize',
      render(text, record) {
        const companySize = masters.CompanySize.find(
          element => element.id === record.idCompanySize);
        return companySize ? companySize.name : '';
      },
    }, {
      title: 'Acción',
      key: 'linkTechnical',
      render(text, record) {
        return (
          <Link to={`/TechnicalTeamSurvey/${record.id}`}>
            Ver
          </Link>
        );
      },
    }];

    return columns.map(column => (
      <Column
        title={column.title}
        key={column.key}
        dataIndex={column.key}
        render={column.render}
      />
    ));
  }
  render() {
    const { data, loading } = this.props;
    const { suppliers } = data;
    return (
      <Spin spinning={loading}>
        <Table
          rowKey={record => record.id}
          dataSource={suppliers && suppliers.filter(x => x.state !== 'ENDED_TECHNICAL_TEAM')}
        >
          {
            this.getPendingsColumns()
          }
        </Table>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.technicalTeamSurvey.data,
  loading: state.technicalTeamSurvey.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(PendingsTechnical);
