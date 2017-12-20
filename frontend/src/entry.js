import antdEn from 'antd/lib/locale-provider/en_US';
import appLocaleData from 'react-intl/locale-data/en';

const enMessages = {
  'SupplierByCall.participateInCall': '¿Participa del programa?',
  'Supplier.businessName': 'Nombre o Razón social',
  'Supplier.idCompanySize': 'Tamaño de la empresa',
  'Supplier.idSupply': 'Suministros',
  'Supplier.idCategory': 'Categoría',
  'Supplier.idSubCategory': 'Tipo de subcategoría',
  'Supplier.document': 'Documentos oficiales: Por ejemplo, para Colombia adjuntar RUT y Cámara de Comercio o Para Costa Rica adjuntar Cédula y Personaría Jurídica. (Máximo dos documentos)',
  'Supplier.nit': 'Número Identificación Tributaria/NIT( Sin dígito Verificación)',
  'Supplier.idCompanyType': 'Tipo de compañía',
  'Supplier.producerLivestok': '¿Es productor pecuario?',
  'Supplier.idSocietyType': 'Tipo de sociedad',
  'Supplier.yearOfEstablishment': 'Año de establecimiento',
  'Supplier.location': 'Ubicación',
  'Supplier.principalAdress': 'Dirección principal',
  'Supplier.idCountry': 'País',
  'Supplier.idDepartment': 'Departamento',
  'Supplier.idCity': 'Ciudad',
  'Supplier.branchOffice': 'Sucursales, Plantas o Centros Alternos (Ubicación)',
  'Supplier.contact': 'Contacto',
  'Supplier.telephone': 'Teléfono(s)',
  'Supplier.fax': 'Fax',
  'Supplier.emails': 'E-mail',
  'Supplier.codeZip': 'ZIP Code',
  'Supplier.legalInfo': 'Información Legal',
  'Supplier.nameLegalAgent': 'Representante Legal',
  'Supplier.inforContact': 'Información persona a contactar',
  'Supplier.fullNameContact': 'Nombre completo',
  'Supplier.jobPosition': 'Cargo',
  'Supplier.phoneOfContact': 'Teléfono',
  'Supplier.emailOfContact': 'E-mail',
  'Supplier.idSector': 'Sector al que pertenece la empresa',
  'Supplier.otherSector': '¿Otro cuál?',
  'Supplier.webSite': 'Pagina web',
  'Supplier.packagingProvided': 'Si es un Proveedor de Empaque ¿El empaque que nos suministra tiene contacto directo con el alimento?',
  'Supplier.infoFinancial': 'Información financiera',
  'Supplier.typeOfCurrencyValueAssets': 'Moneda',
  'Supplier.valueAssets': 'Valor en activos $',
  'Supplier.attachedFinancialReport': 'Soporte de balances o informes financieros del valor en activos',
  'Supplier.typeOfCurrencyAnnualSales': 'Moneda',
  'Supplier.annualSalesValue': 'Valor en ventas anual $',
  'Supplier.numberOfDirectEmployees': 'Número de empleados directos',
  'Supplier.numberOfSubContratedEmployees': 'Número de empleados subcontratados',
  'Supplier.employeesTotal': 'Total empleados (Directos + Subcontratados)',
  'Supplier.participationInSalesWithGroupNutresa': 'Participación ventas con el Grupo Nutresa (%)',
  'Supplier.contactNutresaGroup': 'Contacto con el grupo nutresa',
  'Supplier.nameContactPersonInGroupNutresa': 'Contacto en Grupo Nutresa (Contacto Comercial y/o Negociador)',
  'Supplier.emailContactPersonInGroupNutresa': 'E-mail de la persona contacto en Grupo Nutresa',
  'Supplier.phoneContactPersonInGroupNutresa': 'Teléfono de la persona contacto en Grupo Nutresa',
  'Supplier.supplies': 'Insumos',
  'Supplier.geograficDescriptionOfPrincipalMaterials': 'Describa el origen geográfico de los principales insumos que son utilizadas en los productos que nos provee',
  'Supplier.exports': 'Exportación',
  'Supplier.currentlyExport': '¿Actualmente exporta?',
  'Supplier.exportDestination': 'Destinos de exportación',
  'Supplier.certifications': 'Certificaciones',
  'Supplier.nameCertification': 'Nombre las Certificaciones en Sostenibilidad, Calidad e Inocuidad certificadas en su compañía',
  'Supplier.aditionalInformation': 'Información adicional',
  'Supplier.globalAgreement': 'Su empresa es signataria del Pacto Global?',
  'Supplier.globalAgreementHelp': 'El Pacto Global es una iniciativa voluntaria, en la cual las empresas se comprometen a alinear sus estrategias y operaciones con diez principios universalmente aceptados en cuatro áreas temáticas: Derechos humanos, Estándares laborales, Medio ambiente y anti-corrupción".',
  'Supplier.chemicalSubstance': 'Si es un Proveedor de sustancias químicas ¿La sustancias químicas que nos provee es considerada una sustancia química peligrosa?',
  'Supplier.companyInformation': 'Información de la empresa',
  'Supplier.principalCustomers': 'Principales clientes',
  'Supplier.validateInfo': 'Verifique la información ingresada en el campo tamaño de la empresa',
  'Supplier.reasonForNotParticipation': '¿Por qué no desea participar? ',
  'Button.save': 'Guardar',
  'Button.continue': 'Continuar',
  'Button.send': 'Enviar',
  'Button.edit': 'Editar',
  'Button.delete': 'Eliminar',
  'Button.cancel': 'Cancelar',
  'Button.uploadFile': 'Adjuntar archivo',
  'Survey.title': 'Encuesta',
  'Survey.requiredQuestion': 'Esta pregunta es obligatoria',
  'Survey.requiredAttachment': 'Debe anexar un archivo',
  'Survey.generalInfo': 'Información General',
  'Survey.comercialInfo': 'Información Comercial',
  'Survey.confirm': '¿Está seguro de enviar la encuesta?',
  'Survey.required': 'Los campos marcados con asterisco(*) son requeridos',
  'Survey.error': 'Error',
  'Table.help': 'Ayuda',
  'Table.question': 'Pregunta',
  'Table.providerAnswer': 'Respuesta del proveedor',
  'Table.comment': 'Comentario',
  'Table.support': 'Soporte',
  'Table.noFound': 'No hay preguntas para esta dimension',
  'Table.action': 'Acción',
  'Header.welcome': 'Bienvenido',
  'Header.logOut': 'Cerrar sesión',
  'Confirm.title': '¿Está seguro?',
  'ModifiedSuppliers.businessName': 'Nombre del proveedor',
  'ModifiedSuppliers.nit': 'NIT',
  'ModifiedSuppliers.sapCode': 'Código SAP',
  'ModifiedSuppliers.idSupply': 'Tipo de suministro',
  'ModifiedSuppliers.idCategory': 'Categoría',
  'ModifiedSuppliers.oldIdCompanySize': 'Tamaño de empresa asignado',
  'ModifiedSuppliers.idCompanySize': 'Tamaño de empresa actual',
  'ModifiedSuppliers.state': 'Estado',
  'ModifiedSuppliers.supply': 'Tipo de suministro',
  'ModifiedSuppliers.year': 'Año',
  'ModifiedSuppliers.category': 'Categoría',
  'ModifiedSuppliers.country': 'País',
  'ModifiedSuppliers.supplier': 'Proveedor',
};

window.appLocale = {
  messages: {
    ...enMessages,
  },
  antd: antdEn,
  locale: 'en-US',
  data: appLocaleData,
};
