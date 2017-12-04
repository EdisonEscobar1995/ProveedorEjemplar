import React from 'react';
import { Table, Button, Row, Col } from 'antd';
import Confirm from '../shared/Confirm';

function Suppliers({
  editData,
  calledSuppliers,
  loadingSuppliers,
  sendInvitation,
  massiveShipmentCall }) {
  const { suppliers, suppliersByCall, masters } = calledSuppliers;
  const columns = [{
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
  }, {
    title: 'Correo electrónico',
    dataIndex: 'emails',
    key: 'emails',
  }, {
    title: 'Tipo de suministro',
    dataIndex: 'idSupply',
    key: 'idSupply',
    render(text, record) {
      return masters.Supply.find(supply => supply.id === record.idSupply).name;
    },
  }, {
    title: 'Tamaño de empresa',
    dataIndex: 'idCompanySize',
    key: 'idCompanySize',
    render(text, record) {
      return masters.CompanySize.find(companySize => companySize.id === record.idCompanySize).name;
    },
  }, {
    title: 'Estado',
    dataIndex: 'state',
    key: 'state',
    render(text, record) {
      return suppliersByCall.find(supplierByCall => supplierByCall.idSupplier === record.id).state;
    },
  }, {
    title: 'Acción',
    dataIndex: 'action',
    key: 'action',
    render(text, record) {
      return (
        <Button
          shape="circle"
          icon="mail"
          onClick={() => sendInvitation(record)}
        />
      );
    },
  }];

  return (
    <div>
      <Table
        rowKey={record => record.id}
        loading={loadingSuppliers}
        dataSource={suppliers ? suppliers.filter(supplier => supplier.visible) : []}
        columns={columns}
      />
      <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
        <Col span={2}>
          <Confirm
            title="¿Confirma que desea notificar a todos los proveedores?"
            method={() => massiveShipmentCall(editData)}
          >
            <Button
              type="primary"
            >
              Enviar
            </Button>
          </Confirm>
        </Col>
      </Row>
    </div>
  );
}

export default Suppliers;
