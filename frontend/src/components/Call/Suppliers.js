import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import suppliersData from './suppliersData';
import GenericForm from '../shared/GenericForm';
import * as actions from '../../state/CalledSuppliers/action';


class Suppliers extends Component {
  state = {
    visible: false,
    clientData: {},
    openModal: undefined,
  };
  componentDidMount() {
    this.props.editSupplier();
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    const { saveSuppliers, editData } = this.props;
    const { clientData, openModal } = this.state;
    this.setState({
      visible: false,
    });
    saveSuppliers(clientData, true, true, false, editData.id, openModal);
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      clientData: {},
      openModal: undefined,
    });
  }
  saveSuppliers = (clientData, remoteId, next) => {
    const { data, saveSuppliers, editData } = this.props;
    const { suppliers, suppliersByCall } = data;
    let participateInCall;
    let supplier;
    if (clientData.id !== '') {
      participateInCall =
        suppliersByCall.find(x => x.idSupplier === clientData.id).participateInCall;
      supplier = suppliers.find(sup => sup.id === clientData.id);
    }
    const emails = clientData.emails.split(/\n|,\s*/g);
    clientData.emails = emails;
    if (participateInCall === 'true'
      && (supplier.idSupply !== clientData.nameSupplyToLoad
        || supplier.idCompanySize !== clientData.nameCompanySizeToLoad)) {
      this.setState({
        clientData,
        openModal: next,
      });
      this.showModal();
    } else if (clientData.id !== '') {
      saveSuppliers(clientData, remoteId, true, false, editData.id, next);
    } else {
      saveSuppliers(clientData, remoteId, false, false, editData.id, next);
    }
  }

  render() {
    return (
      <Fragment>
        <Modal
          title="¿Está seguro de continuar?"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Recuerde que la información de la encuesta
          del proveedor se le perderá debido a que el
          tipo de suministro o el tamaño de la empresa cambiaron y
          tiene que volver a realizar la calificación a cada pregunta.</p>
        </Modal>
        <GenericForm
          {...this.props}
          formData={suppliersData}
          submitMethod={this.saveSuppliers}
          validate
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  masters: state.calledSuppliers.masters,
  fetching: state.calledSuppliers.fetching,
  autoCompleteData: state.calledSuppliers.autoCompleteData,
});

export default connect(mapStateToProps, actions)(Suppliers);
