import React from 'react';
import { Table, Select, Button } from 'antd';
import FormattedMessage from '../shared/FormattedMessage';

const { Option } = Select;

function ModifiedSuppliers({ data, loading, setCompanySize, unlockSupplier }) {
  const { suppliers, suppliersByCall, masters } = data;

  const isLocked = id => suppliersByCall
    .find(item => item.idSupplier === id)
    .lockedByModification;

  const columns = [{
    title: <FormattedMessage id="ModifiedSuppliers.businessName" />,
    dataIndex: 'businessName',
    key: 'businessName',
  }, {
    title: <FormattedMessage id="ModifiedSuppliers.nit" />,
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: <FormattedMessage id="ModifiedSuppliers.sapCode" />,
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: <FormattedMessage id="ModifiedSuppliers.idSupply" />,
    dataIndex: 'idSupply',
    key: 'idSupply',
    render(text, record) {
      return masters.Supply.find(supply => supply.id === record.idSupply).name;
    },
  }, {
    title: <FormattedMessage id="ModifiedSuppliers.idCategory" />,
    dataIndex: 'idCategory',
    key: 'idCategory',
    render(text, record) {
      return masters.Category.find(category => category.id === record.idCategory).name;
    },
  }, {
    title: <FormattedMessage id="ModifiedSuppliers.oldIdCompanySize" />,
    dataIndex: 'oldIdCompanySize',
    key: 'oldIdCompanySize',
    render(text, record) {
      const oldIdCompanySize = suppliersByCall
        .find(item => item.idSupplier === record.id)
        .oldIdCompanySize;

      const companySize = masters.CompanySize.find(item => item.id === oldIdCompanySize);
      return companySize ? companySize.name : '';
    },
  }, {
    title: <FormattedMessage id="ModifiedSuppliers.idCompanySize" />,
    dataIndex: 'idCompanySize',
    key: 'idCompanySize',
    render(text, record) {
      if (isLocked(record.id)) {
        return (
          <Select
            key={record.id}
            defaultValue={record.idCompanySize}
            showSearch
            allowClear={false}
            style={{ width: '100%' }}
            onChange={value => setCompanySize({ id: record.id, idCompanySize: value })}
          >
            {
              masters.CompanySize.map(option => (
                <Option key={option.id} value={option.id}>{option.name}</Option>
              ))
            }
          </Select>
        );
      }
      const companySize = masters.CompanySize.find(item => item.id === record.idCompanySize);
      return companySize ? companySize.name : '';
    },
  }, {
    title: <FormattedMessage id="ModifiedSuppliers.state" />,
    dataIndex: 'state',
    key: 'state',
    render(text, record) {
      return isLocked(record.id) ? 'Bloqueado' : 'Notificado';
    },
  }, {
    title: <FormattedMessage id="Table.action" />,
    dataIndex: 'action',
    key: 'action',
    render(text, record) {
      if (isLocked(record.id)) {
        return (
          <Button
            shape="circle"
            icon="mail"
            onClick={() => {
              const id = suppliersByCall
                .find(item => item.idSupplier === record.id).id;
              const oldIdCompanySize = data.suppliers
                .find(item => item.id === record.id).idCompanySize;
              unlockSupplier({ id, oldIdCompanySize });
            }}
          />
        );
      }
      return null;
    },
  }];

  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loading}
        dataSource={suppliers ? suppliers.filter(item => item.visible) : []}
        columns={columns}
      />
    </div>
  );
}

export default ModifiedSuppliers;
