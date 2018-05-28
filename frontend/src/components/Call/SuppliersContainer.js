import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Row, Col, Tooltip, notification } from 'antd';
import FileReaderInput from 'react-file-reader-input';
import XLSX from 'xlsx';
import Confirm from '../shared/Confirm';
import message from '../../components/shared/message';
import Suppliers from './Suppliers';
import * as actions from '../../state/CalledSuppliers/action';

class SuppliersContainer extends Component {
  state = {
    uploading: false,
    uploadExtensions: [
      '.xlsx',
      '.xls',
    ],
    uploadMaxFilesize: 10,
  }
  openNotification = () => {
    notification.success({
      message: 'Operación exitosa',
      description: 'Documento guardado',
    });
  };
  beforeUpload = (file) => {
    const { uploadExtensions, uploadMaxFilesize } = this.state;
    const nameFile = file.name.split('.');
    const nameExtension = nameFile[nameFile.length - 1];
    const extension = `.${nameExtension}`;
    if (uploadExtensions.indexOf(extension) < 0
      && uploadExtensions.indexOf(extension.toLowerCase()) < 0) {
      message({ text: 'Validation.validExtension', type: 'error' });
      return false;
    }
    const isValidSize = file.size / 1024 / 1024 < uploadMaxFilesize;
    if (!isValidSize) {
      message({
        text: 'Validation.maxFileSize',
        aditionalInfo: `${uploadMaxFilesize} MB`,
        type: 'error',
      });
    }
    return isValidSize;
  }

  uploadFile = (e, results) => {
    const { editData } = this.props;
    this.setState({
      uploading: true,
    }, () => {
      let data;
      results.forEach((result) => {
        const [ev, file] = result;
        if (!this.beforeUpload(file)) return;
        const binaryFile = ev.target.result;
        const workbook = XLSX.read(binaryFile, { type: 'binary' });
        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(firstWorksheet, { header: ['sapCode', 'nit', 'businessName', 'emails', 'nameCompanySizeToLoad', 'nameSupplyToLoad', 'nameCountryToLoad'] });
      });
      data = data
        .filter((x, i) => i !== 0)
        .map((el) => {
          el.emails = el.emails && el.emails.split(/,\s*/g);
          return el;
        });
      this.setState({
        uploading: false,
      });
      this.props.saveSuppliers(
        data, null, false, true, editData.id, this.openNotification);
    });
  };
  render() {
    const { uploading } = this.state;
    const {
      editData,
      calledSuppliers,
      loadingSuppliers,
      // editSuppliers,
      deleteSupplierByCall,
      sendInvitation,
      openModal,
      massiveShipmentCall,
      loading } = this.props;
    const hrefCopy = process.env.REACT_APP_URL;
    const href = hrefCopy.replace(/\/dist/, '');
    const url = `${href}plantilla_proveedores.xlsx`;
    const { suppliers, suppliersByCall, masters } = calledSuppliers;
    const disabledButton = editData.id === null ||
      editData.id === undefined;
    const disabledButtonBySuppliers =
      !suppliers || suppliers.filter(supplier => supplier.visible).length === 0;
    const This = this;
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
      render(text, record) {
        return record.emails.map(email => (<div key={email}>{email}</div>));
      },
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
        const companySize = masters.CompanySize.find(item => item.id === record.idCompanySize);
        return companySize ? companySize.name : '';
      },
    }, {
      title: 'País',
      dataIndex: 'idCountry',
      key: 'idCountry',
      render(text, record) {
        const country = masters.Country.find(item => item.id === record.idCountry);
        return country ? country.name : '';
      },
    }, {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render(text, record) {
        const invitedToCall = suppliersByCall.find(x => x.idSupplier === record.id).invitedToCall;
        return invitedToCall ? 'Enviada' : 'Borrador';
      },
    }, {
      title: 'Acción',
      dataIndex: 'id',
      key: 'action',
      render(id, record) {
        const idSupplierByCall = suppliersByCall.find(x => x.idSupplier === record.id).id;
        return (
          <Fragment>
            <Tooltip title="Editar">
              <Button
                shape="circle"
                icon="edit"
                onClick={() => { openModal(<Suppliers {...This.props} record={record} />); }}
              />
            </Tooltip>
            <Confirm
              title="¿Está seguro de eliminar el proveedor?"
              method={() => deleteSupplierByCall(idSupplierByCall, editData.id)}
            >
              <Tooltip placement="top" title="Eliminar">
                <Button
                  type="danger"
                  shape="circle"
                  icon="delete"
                />
              </Tooltip>
            </Confirm>
            <Tooltip title="Enviar">
              <Button
                shape="circle"
                icon="mail"
                onClick={() => sendInvitation(record)}
              />
            </Tooltip>
          </Fragment>
        );
      },
    }];
    return (
      <Fragment>
        <Table
          rowKey={record => record.id}
          loading={loadingSuppliers}
          dataSource={suppliers ? suppliers.filter(supplier => supplier.visible) : []}
          columns={columns}
        />
        <Row>
          <Col span={2}>
            <Button
              icon="plus"
              type="primary"
              size="small"
              disabled={disabledButton || loading}
              onClick={() => { openModal(<Suppliers {...This.props} />); }}
            >
                Adicionar
            </Button>
          </Col>
          <Col span={2}>
            <FileReaderInput
              as="binary"
              onChange={this.uploadFile}
            >
              <Button
                icon="file"
                type="primary"
                size="small"
                disabled={disabledButton || loading}
                loading={uploading}
              >
                {
                  uploading ? 'Cargando' : 'Importar'
                }
              </Button>
            </FileReaderInput>
          </Col>
          <Col span={2} offset={18}>
            <Button
              icon="download"
              type="secondary"
              size="small"
              disabled={disabledButton || loading}
              href={url}
            >
                Descargar
            </Button>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
          <Col span={2}>
            <Confirm
              title="¿Confirma que desea notificar a todos los proveedores?"
              method={() => massiveShipmentCall(editData)}
            >
              <Button
                type="primary"
                disabled={disabledButton || loading || disabledButtonBySuppliers}
              >
                  Enviar
              </Button>
            </Confirm>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  ...actions,
};

const mapStateToProps = state => ({
  data: state.calledSuppliers.data,
  loading: state.calledSuppliers.loading,
  mastersToList: state.calledSuppliers.mastersToList,
});

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersContainer);
