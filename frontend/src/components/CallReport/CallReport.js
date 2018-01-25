import React from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import messages from '../../translation/messagesES';
import exportData from '../../utils/excel';

const participateInCall = (value) => {
  switch (value) {
    case 'true':
      return 'Si';
    case 'false':
      return 'No';
    default:
      return 'Sin respuesta';
  }
};

function CallReport({ data, loading }) {
  const { suppliers, suppliersByCall, masters, years } = data;

  const exportExcel = () => {
    const header = [
      'Año de convocatoria',
      messages['Supplier.businessName'],
      messages['Supplier.idCompanySize'],
      messages['Supplier.idSupply'],
      messages['Supplier.idCategory'],
      messages['Supplier.idSubCategory'],
      messages['Supplier.nit'],
      'Código SAP',
      messages['Supplier.idCompanyType'],
      messages['Supplier.producerLivestok'],
      messages['Supplier.idSocietyType'],
      messages['Supplier.yearOfEstablishment'],
      messages['Supplier.principalAdress'],
      messages['Supplier.idCountry'],
      messages['Supplier.idDepartment'],
      messages['Supplier.idCity'],
      messages['Supplier.branchOffice'],
      messages['Supplier.telephone'],
      messages['Supplier.fax'],
      messages['Supplier.emails'],
      messages['Supplier.codeZip'],
      messages['Supplier.nameLegalAgent'],
      messages['Supplier.jobPosition'],
      messages['Supplier.fullNameContact'],
      messages['Supplier.phoneOfContact'],
      messages['Supplier.emailOfContact'],
      messages['Supplier.idSector'],
      messages['Supplier.otherSector'],
      messages['Supplier.packagingProvided'],
      messages['Supplier.valueAssets'],
      messages['Supplier.typeOfCurrencyValueAssets'],
      messages['Supplier.numberOfDirectEmployees'],
      messages['Supplier.numberOfSubContratedEmployees'],
      messages['Supplier.employeesTotal'],
      messages['Supplier.webSite'],
      messages['Supplier.annualSalesValue'],
      messages['Supplier.typeOfCurrencyAnnualSales'],
      messages['Supplier.participationInSalesWithGroupNutresa'],
      messages['Supplier.nameContactPersonInGroupNutresa'],
      messages['Supplier.emailContactPersonInGroupNutresa'],
      messages['Supplier.phoneContactPersonInGroupNutresa'],
      messages['Supplier.geograficDescriptionOfPrincipalMaterials'],
      messages['Supplier.currentlyExport'],
      messages['Supplier.exportDestination'],
      messages['Supplier.nameCertification'],
      messages['Supplier.globalAgreement'],
      messages['Supplier.chemicalSubstance'],
      messages['Supplier.principalCustomers'],
      messages['SupplierByCall.participateInCall'],
      messages['Supplier.reasonForNotParticipation'],
      messages['Supplier.nameWhoSayDontParticipate'],
      messages['Supplier.emailWhoSayDontParticipate'],
    ];
    const body = suppliers ? suppliers.filter(item => item.visible).map((record) => {
      const enter = /\r\n|\r|\n/g;
      return [
        years[0],
        record.businessName,
        record.idCompanySize ? masters.CompanySize.find(item => item.id === record.idCompanySize).name : '',
        masters.Supply.find(supply => supply.id === record.idSupply).name,
        record.idCategory ? masters.Category.find(item => item.id === record.idCategory).name : '',
        record.idSubCategory ? masters.SubCategory.find(item => item.id === record.idSubCategory).name : '',
        record.nit,
        record.sapCode,
        record.idCompanyType ? masters.CompanyType.find(item => item.id === record.idCompanyType).name : '',
        record.producerLivestok ? 'Si' : 'No',
        record.idSocietyType ? masters.SocietyType.find(item => item.id === record.idSocietyType).name : '',
        record.yearOfEstablishment,
        record.principalAdress,
        record.idCountry ? masters.Country.find(item => item.id === record.idCountry).name : '',
        record.idDepartment ? masters.Department.find(item => item.id === record.idDepartment).name : '',
        record.idCity ? masters.City.find(item => item.id === record.idCity).name : '',
        record.branchOffice.replace(enter, ' '),
        record.telephone,
        record.fax,
        record.emails.join(', '),
        record.codeZip,
        record.nameLegalAgent,
        record.jobPosition,
        record.fullNameContact,
        record.phoneOfContact,
        record.emailOfContact,
        record.idSector ? masters.Sector.find(item => item.id === record.idSector).name : '',
        record.otherSector,
        record.packagingProvided,
        record.valueAssets,
        record.typeOfCurrencyValueAssets,
        record.numberOfDirectEmployees,
        record.numberOfSubContratedEmployees,
        record.numberOfDirectEmployees + record.numberOfSubContratedEmployees,
        record.webSite,
        record.annualSalesValue,
        record.typeOfCurrencyAnnualSales,
        record.participationInSalesWithGroupNutresa,
        record.nameContactPersonInGroupNutresa,
        record.emailContactPersonInGroupNutresa,
        record.phoneContactPersonInGroupNutresa,
        record.geograficDescriptionOfPrincipalMaterials.replace(enter, ' '),
        record.currentlyExport ? 'Si' : 'No',
        record.exportDestination,
        record.nameCertification.replace(enter, ' '),
        record.globalAgreement ? 'Si' : 'No',
        record.chemicalSubstance ? 'Si' : 'No',
        record.principalCustomer
          .map(customer => `${customer.name} ${customer.percentageOfParticipationInSales}`)
          .join(', '),
        participateInCall(suppliersByCall
          .find(item => item.idSupplier === record.id)
          .participateInCall),
        suppliersByCall
          .find(item => item.idSupplier === record.id)
          .reasonForNotParticipation.replace(enter, ' '),
        suppliersByCall.find(item => item.idSupplier === record.id).nameWhoSayDontParticipate,
        suppliersByCall.find(item => item.idSupplier === record.id).emailWhoSayDontParticipate,
      ];
    }) : [[]];
    exportData([{
      data: [header, ...body],
      title: 'Proveedores',
    }], 'ParticipacionConvocatoriaProveedores.xlsx');
  };
  const columns = [{
    title: 'NIT',
    dataIndex: 'nit',
    key: 'nit',
  }, {
    title: 'Código SAP',
    dataIndex: 'sapCode',
    key: 'sapCode',
  }, {
    title: 'Nombre del proveedor',
    dataIndex: 'businessName',
    key: 'businessName',
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
    title: 'Participó',
    dataIndex: 'participated',
    key: 'participated',
    render(text, record) {
      return participateInCall(suppliersByCall
        .find(item => item.idSupplier === record.id)
        .participateInCall);
    },
  }, {
    title: 'Enlace',
    dataIndex: 'link',
    key: 'link',
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

  return (
    <div>
      <div>
        <strong>Total resultados: </strong>
        {suppliers ? suppliers.filter(item => item.visible).length : 0}
      </div>
      {
        suppliers && suppliersByCall ?
          <Button type="primary" onClick={exportExcel}>Exportar a Excel</Button>
          : null
      }
      <Table
        rowKey={record => record.id}
        loading={loading}
        dataSource={suppliers ? suppliers.filter(item => item.visible) : []}
        columns={columns}
      />
    </div>
  );
}

export default CallReport;
