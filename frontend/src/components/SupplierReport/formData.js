/* eslint-disable max-len */
// import messages from '../../translation/messagesES';
// import exportData from '../../utils/excel';

// import html2canvas from 'html2canvas';

const formData = ({
  data,
  getParticipantsByYear,
  filterSupplierReport,
  form,
}) => {
  /* const {
    years,
    suppliers,
    suppliersByCall,
    masters,
  } = data; */

  const {
    years,
    suppliers,
  } = data;

  const handleReset = () => {
    form.resetFields();
    getParticipantsByYear();
  };

  const exportWord = () => {
    const styles = '<style>.title{font-family: Arial; font-size: 22px; font-weight: bold; color: #006159; text-align: center;}</style>';
    const header = `${"<!DOCTYPE html><html xmlns:o='urn:schemas-microsoft-com:office:office' " +
           "xmlns:w='urn:schemas-microsoft-com:office:word' " +
           "xmlns='http://www.w3.org/TR/REC-html40'>"}
           <head>
           <title>Export HTML to Word Document</title>
           <meta charset='utf-8'>
           ${styles}
           </head><body>`;
    const footer = '</body></html>';
    const sourceHTML = header + document.getElementById('content-export').innerHTML + footer;
    const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(sourceHTML)}`;
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);

    /* html2canvas(document.getElementById('content-export')).then((canvas) => {
      // document.getElementById('data-canvas-general').appendChild(canvas);
      const dataURL = canvas.toDataURL();
      console.log('dataURL = ', dataURL);
      // const image = "<div id='export'><img class='hide' src='" + dataURL +"'/></div>";
      const image = document.createElement('img');
      image.src = dataURL;
      document.getElementById('data-canvas-general').appendChild(image);
      const styles = {
        title: 'font-size: 22px;' +
        'font-weight: bold;' +
        'color: #006159;' +
        'text-align: center',
      };
      const header = `${"<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
           "xmlns:w='urn:schemas-microsoft-com:office:word' " +
           "xmlns='http://www.w3.org/TR/REC-html40'>"}
           <head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>`;
      const body = `<h2 style=${styles.title}>Evaluación general</h2>`;
      const footer = '</body></html>';
      const sourceHTML = header + body + document.getElementById('data-canvas-general').innerHTML + footer;
      const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(sourceHTML)}`;
      const fileDownload = document.createElement('a');
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = 'document.doc';
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }); */
  };
  /* const exportExcel = () => {
  const header = [
    messages['Call.year'],
    messages['Supplier.businessName'],
    messages['Supplier.idCompanySize'],
    messages['Supplier.idSupply'],
    messages['Supplier.idCountry'],
    messages['Supplier.idCategory'],
    messages['Supplier.idSubCategory'],
    messages['Supplier.nit'],
    messages['Supplier.sapCode'],
    messages['Supplier.idCompanyType'],
    messages['Supplier.producerLivestok'],
    messages['Supplier.idSocietyType'],
    messages['Supplier.yearOfEstablishment'],
    messages['Supplier.principalAdress'],
    messages['Supplier.idOriginCountry'],
    messages['Supplier.idDepartment'],
    messages['Supplier.idCity'],
    messages['Supplier.branchOffice'],
    messages['Supplier.telephone'],
    messages['Supplier.fax'],
    messages['Supplier.emails'],
    messages['Supplier.codeZip'],
    messages['Supplier.nameLegalAgent'],
    messages['Supplier.idLegalAgent'],
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
    messages['Supplier.geograficDescriptionOfPrincipalMaterials'],
    messages['Supplier.currentlyExport'],
    messages['Supplier.exportDestination'],
    messages['Supplier.nameCertification'],
    messages['Supplier.globalAgreement'],
    messages['Supplier.chemicalSubstance'],
    messages['Supplier.principalCustomers'],
    messages['Supplier.contactNutresaGroup'],
    messages['SupplierByCall.participateInCall'],
    messages['Supplier.reasonForNotParticipation'],
    messages['Supplier.nameWhoSayDontParticipate'],
    messages['Supplier.emailWhoSayDontParticipate'],
  ];
  if (masters.Dimension) {
    masters.Dimension.forEach((dimension) => {
      header.push(`Dimensión ${dimension.name}`);
    });
  }
  const body = suppliers ? suppliers.filter(item => item.visible).map((record) => {
    const enter = /\r\n|\r|\n|\t/g;
    const row = [
      years[0],
      record.businessName,
      record.idCompanySize ? 
      masters.CompanySize.find(item => item.id === record.idCompanySize).name : '',
      masters.Supply.find(supply => supply.id === record.idSupply).name,
      record.idCountry ? masters.Country.find(item => item.id === record.idCountry).name : '',
      record.idCategory ? masters.Category.find(item => item.id === record.idCategory).name : '',
      record.idSubCategory ? 
      masters.SubCategory.find(item => item.id === record.idSubCategory).name : '',
      record.nit,
      record.sapCode,
      record.idCompanyType ? 
      masters.CompanyType.find(item => item.id === record.idCompanyType).name : '',
      record.producerLivestok ? 'Si' : 'No',
      record.idSocietyType ? 
      masters.SocietyType.find(item => item.id === record.idSocietyType).name : '',
      record.yearOfEstablishment,
      record.principalAdress,
      record.idOriginCountry ? 
      masters.OriginCountry.find(item => item.id === record.idOriginCountry).name : '',
      record.idDepartment ? 
      masters.Department.find(item => item.id === record.idDepartment).name : '',
      record.idCity ? masters.City.find(item => item.id === record.idCity).name : '',
      record.branchOffice.replace(enter, ' '),
      record.telephone,
      record.fax,
      record.emails.join(', '),
      record.codeZip,
      record.nameLegalAgent,
      record.idLegalAgent,
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
      record.geograficDescriptionOfPrincipalMaterials.replace(enter, ' '),
      record.currentlyExport ? 'Si' : 'No',
      record.exportDestination,
      record.nameCertification.replace(enter, ' '),
      record.globalAgreement ? 'Si' : 'No',
      record.chemicalSubstance ? 'Si' : 'No',
      record.principalCustomer
        .map(customer => `${customer.name} ${customer.percentageOfParticipationInSales}`)
        .join(', '),
      record.contactNutresaGroup
        .map(contact => `${contact.name} ${contact.email} ${contact.phone}`)
        .join(', '),
      masters.Participated
        .find(option => option.id === (suppliersByCall
          .find(item => item.idSupplier === record.id)
          .participateInCall || 'empty'))
        .name,
      suppliersByCall
        .find(item => item.idSupplier === record.id)
        .reasonForNotParticipation.replace(enter, ' '),
      suppliersByCall.find(item => item.idSupplier === record.id).nameWhoSayDontParticipate,
      suppliersByCall.find(item => item.idSupplier === record.id).emailWhoSayDontParticipate,
    ];
    masters.Dimension.forEach((dimension) => {
      const idsDimension =
        suppliersByCall.find(item => item.idSupplier === record.id).idsDimension || [];
      const percentsDimension =
        suppliersByCall.find(item => item.idSupplier === record.id).percentsDimension || [];
      const index = idsDimension.indexOf(dimension.id);
      row.push(index > -1 ? `${percentsDimension[index]}%` : 0);
    });
    return row;
  }) : [[]];
  exportData([{
    data: [header, ...body],
    title: 'Proveedores',
  }], 'ParticipacionConvocatoriaProveedores.xlsx');
}; */

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'year',
          required: true,
          value: years && years.length > 0 ? years[0] : '',
          options: years ? years.map(item => ({ id: item, name: item })) : [],
          handleChange: getParticipantsByYear,
          allowClear: false,
          valuesToClean: {
            supply: { value: '' },
            companySize: { value: '' },
            participated: { value: '' },
            supplier: { value: '' },
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          required: true,
          options: suppliers ? suppliers.map((item) => {
            item.name = item.businessName;
            return item;
          }) : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterSupplierReport(values);
          },
        },
      ],
    },
    {
      key: 1.2,
      justify: 'center',
      value: [
        {
          span: 2,
          type: 'button',
          label: 'Limpiar',
          key: 'clear',
          buttonType: 'primary',
          handleclick: handleReset,
        }, {
          span: 2,
          type: 'button',
          label: 'Consultar',
          key: 'search',
          buttonType: 'primary',
          htmlType: 'submit',
        }, {
          span: 2,
          type: 'button',
          label: 'Exportar a word',
          key: 'export',
          buttonType: 'primary',
          handleclick: exportWord,
        },
      ],
    },
  ];
};

export default formData;
