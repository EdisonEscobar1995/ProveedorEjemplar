import React from 'react';
import { Table, Select, Button } from 'antd';

const { Option } = Select;

function ModifiedSuppliers(props) {
  const { data, loading } = props;
  const { Suppliers, SuppliersByCall, Masters } = data;

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
      return Masters.Supply.find(supply => supply.id === record.idSupply).name;
    },
  }, {
    title: 'Categoría',
    dataIndex: 'idCategory',
    key: 'idCategory',
    render(text, record) {
      return Masters.Category.find(category => category.id === record.idCategory).name;
    },
  }, {
    title: 'Tamaño de empresa asignado',
    dataIndex: 'idCompanySize',
    key: 'idCompanySize',
    render(text, record) {
      return Masters.CompanySize.find(companySize => companySize.id === record.idCompanySize).name;
    },
  }, {
    title: 'Tamaño de empresa actual',
    dataIndex: 'idCompanySizeSelect',
    key: 'idCompanySizeSelect',
    render(text, record) {
      const locked = SuppliersByCall
        .find(item => item.idSupplier === record.id)
        .lockedByModification;
      if (locked) {
        return (
          <Select
            showSearch
            allowClear
            notFoundContent="No se encontraron resultados"
            style={{ width: '100%' }}
            onChange={value => this.setCompanySize({ id: record.id, companySize: value })}
          >
            {
              Masters.CompanySize.map(option => (
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
      return SuppliersByCall.find(item => item.idSupplier === record.id).lockedByModification ? 'Bloqueado' : 'Notificado';
    },
  }, {
    title: 'Acción',
    dataIndex: 'state',
    key: 'state',
    render(text, record) {
      return (
        <Button
          shape="circle"
          icon="mail"
          onClick={() => {
            const supplierByCall = SuppliersByCall.find(item => item.idSupplier === record.id);
            this.unlockSupplier(supplierByCall);
          }}
        />
      );
    },
  }];

  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loading}
        dataSource={Suppliers}
        columns={columns}
      />
    </div>
  );
}

export default ModifiedSuppliers;
