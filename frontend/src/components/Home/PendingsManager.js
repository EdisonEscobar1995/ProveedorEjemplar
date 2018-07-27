import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Spin } from 'antd';
import * as actions from '../../state/ManagerTeamSurvey/action';
import FormattedMessage from '../shared/FormattedMessage';

const { Column } = Table;

class PendingsManager extends Component {
  componentDidMount() {
    this.props.getManagerTeamSurvey();
  }
  getPendingsColumns = () => {
    const { data } = this.props;
    const { masters } = data;

    const columns = [{
      title: 'Supplier.supplier',
      key: 'businessName',
    }, {
      title: 'Supplier.supplyType',
      key: 'idSupply',
      render(text, record) {
        return masters.Supply.find(supply => supply.id === record.idSupply).name;
      },
    }, {
      title: 'Supplier.idCompanySize',
      key: 'idCompanySize',
      render(text, record) {
        const companySize = masters.CompanySize.find(
          element => element.id === record.idCompanySize);
        return companySize ? companySize.name : '';
      },
    }, {
      title: 'Supplier.action',
      key: 'linkManager',
      render(text, record) {
        return (
          <Link to={`/managerTeamSurvey/${record.id}`}>
            Ver
          </Link>
        );
      },
    }];

    return columns.map(column => (
      <Column
        title={<FormattedMessage id={column.title} />}
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
          dataSource={suppliers && suppliers.filter(x => x.state === 'NOT_STARTED_MANAGER_TEAM')}
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
  data: state.managerTeamSurvey.data,
  loading: state.managerTeamSurvey.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(PendingsManager);
