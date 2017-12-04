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
    dataIndex: 'oldIdCompanySize',
    key: 'oldIdCompanySize',
    render(text, record) {
      const oldIdCompanySize = suppliersByCall
        .find(item => item.idSupplier === record.id)
        .oldIdCompanySize;
      return masters.CompanySize.find(companySize => companySize.id === oldIdCompanySize).name;
    },
  }, {
    title: 'Tamaño de empresa actual',
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
      return masters.CompanySize.find(companySize => companySize.id === record.idCompanySize).name;
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
