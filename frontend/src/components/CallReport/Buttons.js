import React from 'react';
import { Row, Col, Button } from 'antd';
import messages from '../../translation/messagesES';
import exportData from '../../utils/excel';

function Buttons(props) {
  const { data, participateInCall } = props;
  const { suppliers, suppliersByCall, masters, years } = data;

  const handleReset = () => {
    props.form.resetFields();
    props.getParticipantsByYear();
  };

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
      const enter = /\r\n|\r|\n|\t/g;
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
        record.typeOfCurrencyValueAssets.toString(),
        record.numberOfDirectEmployees,
        record.numberOfSubContratedEmployees,
        record.numberOfDirectEmployees + record.numberOfSubContratedEmployees,
        record.webSite,
        record.annualSalesValue.toString(),
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

  return (
    <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
      <Col span={2}>
        <Button type="primary" onClick={handleReset}>Limpiar</Button>
      </Col>
      <Col span={2}>
        <Button type="primary" onClick={exportExcel}>Exportar a Excel</Button>
      </Col>
    </Row>
  );
}

export default Buttons;
