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
      const category = masters.Category.find(item => item.id === record.idCategory);
      return category ? category.name : '';
    },
  }, {
    title: 'Tamaño de empresa asignado',
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
    title: 'Tamaño de la empresa',
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
