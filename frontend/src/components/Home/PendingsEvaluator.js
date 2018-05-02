import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Spin } from 'antd';
import * as actions from '../../state/Pendings/action';
import FormattedMessage from '../shared/FormattedMessage';

const { Column } = Table;

class PendingsEvaluator extends Component {
  componentDidMount() {
    this.props.getPendings();
  }
  getPendingsColumns = () => {
    const { data } = this.props;
    const { suppliersByCall, masters } = data;

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
        const idSupplierByCall = suppliersByCall
          .find(item => item.idSupplier === record.id)
          .id;
        return (
          <Link to={`/supplier/${record.id}/${idSupplierByCall}`}>
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
    const { suppliers, suppliersByCall, states } = data;
    return (
      <Spin spinning={loading}>
        <Table
          rowKey={record => record.id}
          dataSource={suppliers && suppliers.filter((x) => {
            const idStateSupplier = suppliersByCall
              .find(element => element.idSupplier === x.id).idState;
            const stateName = states.find(state => state.id === idStateSupplier).shortName;
            return stateName !== 'ENDED_EVALUATOR';
          })}
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
  data: state.pendings.data,
  loading: state.pendings.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(PendingsEvaluator);
