const messages = {
  'Call.year': 'Year of call',
  'SupplierByCall.participateInCall': 'Do you want to join the program?',
  'Supplier.businessName': 'Name or Corporate Name',
  'Supplier.idCompanySize': 'Company size',
  'Supplier.idSupply': 'Supplies',
  'Supplier.idCategory': 'Type of Category',
  'Supplier.idSubCategory': 'Type of Sub-category',
  'Supplier.document': 'Official documents: For example, For Colombia, attach RUT + Certificate of Existence and Legal Representation. For Costa Rica, attach Cédula and Legal Constitution. For Peru, attach RUC - Unique Contributor Registration (Registro Único de Contribuyente) (Maximum two documents)',
  'Supplier.nit': 'Tax Identification Number / NIT (Without Verification Digit)',
  'Supplier.sapCode': 'SAP code',
  'Supplier.idCompanyType': 'Type of Company',
  'Supplier.producerLivestok': 'Are you a livestock producer?',
  'Supplier.idSocietyType': 'Type of Company',
  'Supplier.yearOfEstablishment': 'Year of establishment of the company ',
  'Supplier.location': 'Location',
  'Supplier.principalAdress': 'Main address',
  'Supplier.idCountry': 'Country',
  'Supplier.idDepartment': 'Department, State or Province',
  'Supplier.idCity': 'City',
  'Supplier.branchOffice': 'Do you have branch offices, plants or alternate centers? Where are they located?',
  'Supplier.contact': 'Contact',
  'Supplier.telephone': 'Telephone(s)',
  'Supplier.fax': 'Fax',
  'Supplier.emails': 'E-mail',
  'Supplier.codeZip': "Zip Code of your Company's location",
  'Supplier.legalInfo': 'Legal Information',
  'Supplier.nameLegalAgent': 'Legal Representative',
  'Supplier.inforContact': 'Conctact Information',
  'Supplier.fullNameContact': 'Full name of the contact within your company',
  'Supplier.jobPosition': 'Position',
  'Supplier.phoneOfContact': 'Telephone number of the contact within your company',
  'Supplier.emailOfContact': 'E-mail of the contact within your company',
  'Supplier.idSector': 'Sector to which the company belongs',
  'Supplier.otherSector': 'Other, which?',
  'Supplier.webSite': "Company's Webpage",
  'Supplier.packagingProvided': 'If you are a Supplier of Packaging Material:  Does the packaging you provide us come in direct contact with the food?',
  'Supplier.infoFinancial': 'Financial Information',
  'Supplier.typeOfCurrencyValueAssets': 'Currency',
  'Supplier.valueAssets': 'Value in Assets of your company $',
  'Supplier.attachedFinancialReport': 'Attach support through balance sheets or financial reports',
  'Supplier.typeOfCurrencyAnnualSales': 'Currency',
  'Supplier.annualSalesValue': 'Value of sales in the last year $',
  'Supplier.numberOfDirectEmployees': 'Number of direct employees by business line',
  'Supplier.numberOfSubContratedEmployees': 'Number of indirect employees by business line',
  'Supplier.employeesTotal': 'Total Employees',
  'Supplier.participationInSalesWithGroupNutresa': 'What is the percentage share of sales to Grupo Nutresa within your total sales?',
  'Supplier.contactNutresaGroup': 'Grupo Nutresa contact',
  'Supplier.nameContactPersonInGroupNutresa': 'Name the Grupo Nutresa contact (Commercial Contact and/or Negotiator)',
  'Supplier.emailContactPersonInGroupNutresa': 'Email of the Group Nutresa contact',
  'Supplier.phoneContactPersonInGroupNutresa': 'Telephone number of the Grupo Nutresa contact ',
  'Supplier.supplies': 'Supplies',
  'Supplier.geograficDescriptionOfPrincipalMaterials': 'Describe the geographic origin of the main inputs that are used in the products or services that you supply.',
  'Supplier.exports': 'Export',
  'Supplier.currentlyExport': 'Do you currently export?',
  'Supplier.exportDestination': 'Export destination',
  'Supplier.certifications': 'Certifications',
  'Supplier.nameCertification': 'List the sustainability, quality and safety Certifications your company has',
  'Supplier.aditionalInformation': 'Additional Information',
  'Supplier.globalAgreement': 'Is your company a signatory of the Global Compact?',
  'Supplier.globalAgreementHelp': 'The Global Compact is a voluntary initiative, in which companies commit to align their strategies and operations with ten (10) universally accepted principles in four thematic areas:  human rights, labor standards, the environment and anti-corruption."',
  'Supplier.chemicalSubstance': 'Are you a supplier of chemical substances: Are any of the chemical substances you provide us considered hazardous chemical substances?',
  'Supplier.companyInformation': 'Company Information',
  'Supplier.principalCustomers': 'Main customers',
  'Supplier.validateInfo': 'Check the information entered in the field company size in the general information tab',
  'Supplier.reasonForNotParticipation': 'Why do not you want to participate?',
  'Supplier.principalCustomer.name': 'Name',
  'Supplier.principalCustomer.percentageOfParticipationInSales': 'Sales participation by customer (%)',
  'Supplier.nameWhoSayDontParticipate': 'Full name',
  'Supplier.emailWhoSayDontParticipate': 'E-mail',
  'Supplier.surveySuccess': 'Assessment sent successfully',
  'Supplier.savedInfo': 'Information saved',
  'Supplier.yes': 'Yes',
  'Supplier.no': 'No',
  'Button.save': 'Save',
  'Button.add': 'Add',
  'Button.continue': 'Continue',
  'Button.send': 'Send',
  'Button.edit': 'Edit',
  'Button.delete': 'Delete',
  'Button.cancel': 'Cancel',
  'Button.uploadFile': 'Attach file',
  'Survey.title': 'Assessment',
  'Survey.requiredQuestion': 'This question is required',
  'Survey.requiredAttachment': 'Must attach at least one file',
  'Survey.generalInfo': 'General Information',
  'Survey.comercialInfo': 'Commercial Information',
  'Survey.confirm': 'Are you sure to send the assessment?',
  'Survey.required': 'Fields marked with an asterisk (*) are required',
  'Survey.error': 'Error',
  'Table.help': 'Help',
  'Table.question': 'Question',
  'Table.providerAnswer': 'Supplier response',
  'Table.providerComment': 'Comment',
  'Table.support': 'Support',
  'Table.evaluatorAnswer': 'Evaluation team response',
  'Table.evaluatorComment': 'Comment',
  'Table.noFound': "There aren't question for this dimension",
  'Table.action': 'Action',
  'Header.welcome': 'Welcome',
  'Header.logOut': 'Logout',
  'Confirm.title': 'Are you sure?',
  'Message.title': 'Exemplary Supplier',
  'Validation.dateToSend': 'The date exceeds the time to send',
  'Validation.noData': 'No data received',
  'Validation.noOpenCall': 'At this time there are no open calls',
  'Validation.supplier': 'There is no assessment for the type of supply and company size selected',
  'Validation.unauthorized': 'You are not authorized to access this site',
  'Validation.wentWrong': 'Something went wrong',
  'Validation.validExtension': 'Invalid extension',
  'Validation.uploadFail': 'Something went wrong uploading the file',
  'Validation.successUpload': 'File successfully uploaded',
  'Validation.maxFilesNumber': 'The maximum number of files is',
  'Validation.maxFileSize': 'The file must be less than',
  'Validation.verifyDimensions': 'Still have dimensions and unfilled questions, please validate',
  'Validation.requiredField': 'This field is required',
  'Validation.surveyCouldNotComplete': 'The survey could not be completed',
  'Validation.informationNotFound': 'Information not found',
};
export default messages;
