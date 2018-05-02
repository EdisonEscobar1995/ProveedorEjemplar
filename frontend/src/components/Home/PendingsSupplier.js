import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Spin } from 'antd';
import FormattedMessage from '../shared/FormattedMessage';

const { Column } = Table;

class PendingsSupplier extends Component {
  getPendingsColumns = () => {
    const columns = [{
      title: 'Supplier.supplier',
      key: 'name',
    }, {
      title: 'Supplier.supplyType',
      key: 'supply',
    }, {
      title: 'Supplier.idCompanySize',
      key: 'company_size',
    }, {
      title: 'Supplier.action',
      key: 'linkManager',
      render() {
        return (
          <Link to={'/supplier'}>
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
    const { userInfo } = data;
    return (
      <Spin spinning={loading}>
        <Table
          rowKey={record => record.id}
          dataSource={[userInfo]}
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
  data: state.main.data,
  loading: state.main.loading,
});

export default connect(
  mapStateToProps,
)(PendingsSupplier);
