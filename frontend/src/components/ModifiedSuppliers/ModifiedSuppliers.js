import React from 'react';
import { Table, Select, Button } from 'antd';

const { Option } = Select;

function ModifiedSuppliers({ data, loading, setCompanySize, unlockSupplier }) {
  const { suppliers, suppliersByCall, masters } = data;

  const isLocked = id => suppliersByCall
    .find(item => item.idSupplier === id)
    .lockedByModification;

  const columns = [{
    title: 'Nombre del proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
  }, {
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: 'Tipo de suministro',
    dataIndex: 'idSupply',
    key: 'idSupply',
    render(text, record) {
      return masters.Supply.find(supply => supply.id === record.idSupply).name;
    },
  }, {
    title: 'Categoría',
    dataIndex: 'idCategory',
    key: 'idCategory',
    render(text, record) {
      return masters.Category.find(category => category.id === record.idCategory).name;
    },
  }, {
    title: 'Tamaño de empresa asignado',
    dataIndex: 'idCompanySize',
    key: 'idCompanySize',
    render(text, record) {
      return masters.CompanySize.find(companySize => companySize.id === record.idCompanySize).name;
    },
  }, {
    title: 'Tamaño de empresa actual',
    dataIndex: 'idCompanySizeSelect',
    key: 'idCompanySizeSelect',
    render(text, record) {
      if (isLocked(record.id)) {
        return (
          <Select
            showSearch
            allowClear
            notFoundContent="No se encontraron resultados"
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
      return null;
    },
  }, {
    title: 'Estado',
    dataIndex: 'state',
    key: 'state',
    render(text, record) {
      return isLocked(record.id) ? 'Bloqueado' : 'Notificado';
    },
  }, {
    title: 'Acción',
    dataIndex: 'action',
    key: 'action',
    render(text, record) {
      if (isLocked(record.id)) {
        return (
          <Button
            shape="circle"
            icon="mail"
            onClick={() => {
              const supplierByCall = suppliersByCall.find(item => item.idSupplier === record.id);
              unlockSupplier(supplierByCall);
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
        dataSource={suppliers}
        columns={columns}
      />
    </div>
  );
}

export default ModifiedSuppliers;
