import messages from '../../translation/messagesES';
import exportData from '../../utils/excel';

const formData = ({
  data,
  getParticipantsByYear,
  filterCallReport,
  form,
}) => {
  const {
    years,
    suppliers,
    suppliersByCall,
    masters,
  } = data;

  const handleReset = () => {
    form.resetFields();
    getParticipantsByYear();
  };

  const exportExcel = () => {
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
        record.idCountry ? masters.Country.find(item => item.id === record.idCountry).name : '',
        record.idCategory ? masters.Category.find(item => item.id === record.idCategory).name : '',
        record.idSubCategory ? masters.SubCategory.find(item => item.id === record.idSubCategory).name : '',
        record.nit,
        record.sapCode,
        record.idCompanyType ? masters.CompanyType.find(item => item.id === record.idCompanyType).name : '',
        record.producerLivestok ? 'Si' : 'No',
        record.idSocietyType ? masters.SocietyType.find(item => item.id === record.idSocietyType).name : '',
        record.yearOfEstablishment,
        record.principalAdress,
        record.idOriginCountry ? masters.OriginCountry.find(item => item.id === record.idOriginCountry).name : '',
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
    }) : [[]];
    exportData([{
      data: [header, ...body],
      title: 'Proveedores',
    }], 'ParticipacionConvocatoriaProveedores.xlsx');
  };

  return [
    {
      key: 1.1,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Año',
          key: 'year',
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
          label: 'Tipo de suministro',
          key: 'supply',
          value: '',
          options: masters ? masters.Supply : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supply: value };
            filterCallReport(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Tamaño',
          key: 'companySize',
          value: '',
          options: masters ? masters.CompanySize : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), companySize: value };
            filterCallReport(values);
          },
        },
      ],
    },
    {
      key: 1.2,
      value: [
        {
          span: 8,
          type: 'select',
          label: 'Participó',
          key: 'participated',
          value: '',
          options: masters ? masters.Participated : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), participated: value };
            filterCallReport(values);
          },
        },
        {
          span: 8,
          type: 'select',
          label: 'Proveedor',
          key: 'supplier',
          value: '',
          options: suppliers ? suppliers.map((item) => {
            item.name = item.businessName;
            return item;
          }) : [],
          handleChange: (value) => {
            const values = { ...form.getFieldsValue(), supplier: value };
            filterCallReport(values);
          },
        },
      ],
    },
    {
      key: 1.3,
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
          label: 'Exportar a Excel',
          key: 'export',
          buttonType: 'primary',
          handleclick: exportExcel,
        },
      ],
    },
  ];
};

export default formData;
