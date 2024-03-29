const messages = {
  'Call.year': 'Year of call',
  'SupplierByCall.participateInCall': 'Do you want to join the program?',
  'SupplierByCall.dataPolicy': 'Data management and confidentiality policies',
  'Supplier.supplier': 'Supplier',
  'Supplier.action': 'Action',
  'Supplier.businessName': 'Name or Corporate Name',
  'Supplier.idCompanySize': 'Company size',
  'Supplier.idSupply': 'Supplies',
  'Supplier.supplyType': 'Type of supply',
  'Supplier.idCountry': 'Country to which it supplies',
  'Supplier.idCategory': 'Type of Category',
  'Supplier.idSubCategory': 'Type of Sub-category',
  'Supplier.document': 'Official documents: For example, For Colombia, attach RUT + Certificate of Existence and Legal Representation. For Costa Rica, attach Cédula and Legal Constitution. For Peru, attach RUC - Unique Contributor Registration (Registro Único de Contribuyente) (Maximum two documents)',
  'Supplier.nit': 'Tax Identification Number / NIT (Without Verification Digit)',
  'Supplier.sapCode': 'SAP code',
  'Supplier.idCompanyType': 'Type of Company',
  'Supplier.companyLogo': 'Company logo: Only PNG, JPG, JPEG formats.',
  'Supplier.producerLivestok': 'Are you a livestock producer?',
  'Supplier.idSocietyType': 'Type of Company',
  'Supplier.yearOfEstablishment': 'Year of establishment of the company ',
  'Supplier.location': 'Location',
  'Supplier.principalAdress': 'Main address',
  'Supplier.idOriginCountry': 'Country',
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
  'Supplier.idLegalAgent': 'Identity number',
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
  'Supplier.principalCustomer.name': 'Name',
  'Supplier.principalCustomer.percentageOfParticipationInSales': 'Sales participation by customer (%)',
  'Supplier.contactNutresaGroup': 'Grupo Nutresa contact',
  'Supplier.contactNutresaGroup.name': 'Name the Grupo Nutresa contact (Commercial Contact and/or Negotiator)',
  'Supplier.contactNutresaGroup.email': 'Email of the Group Nutresa contact',
  'Supplier.contactNutresaGroup.phone': 'Telephone number of the Grupo Nutresa contact ',
  'Supplier.validateInfo': 'Check the information entered in the field company size in the general information tab',
  'Supplier.reasonForNotParticipation': 'Why do not you want to participate?',
  'Supplier.nameWhoSayDontParticipate': 'Full name',
  'Supplier.emailWhoSayDontParticipate': 'E-mail',
  'Supplier.surveySuccess': 'Assessment sent successfully',
  'Supplier.savedInfo': 'Information saved',
  'Supplier.yes': 'Yes',
  'Supplier.no': 'No',
  'Button.save': 'Save',
  'Button.add': 'Add',
  'Button.addQuetion': 'Add question',
  'Button.continue': 'Continue',
  'Button.send': 'Send',
  'Button.edit': 'Edit',
  'Button.delete': 'Delete',
  'Button.cancel': 'Cancel',
  'Button.uploadFile': 'Attach file',
  'Button.agree': 'I agree',
  'Button.refuse': 'I don\'t agree',
  'Survey.title': 'Assessment',
  'Survey.deadline': 'The deadline to send the survey is: ',
  'Survey.requiredQuestion': 'This question is required',
  'Survey.requiredAttachment': 'Must attach at least one file',
  'Survey.generalInfo': 'General Information',
  'Survey.comercialInfo': 'Commercial Information',
  'Survey.confirm': 'Are you sure to send the assessment?',
  'Survey.required': 'Fields marked with an asterisk (*) are required',
  'Survey.error': 'Error',
  'Table.help': 'Help',
  'Table.question': 'Question',
  'Table.previousAnswer': 'Previous survey\'s answer',
  'Table.providerAnswer': 'Supplier response',
  'Table.providerComment': 'Comment',
  'Table.support': 'Support </br><b style="color: #df2a2a;">(You must enter attachments where the attachment icon is displayed.)</b>',
  'Table.evaluatorAnswer': 'Evaluation team response',
  'Table.evaluatorComment': 'Comment',
  'Table.noFound': "There aren't question for this dimension",
  'Table.action': 'Action',
  'Table.criteriaScore': 'Score',
  'Header.welcome': 'Welcome',
  'Header.logOut': 'Logout',
  'Confirm.title': 'Are you sure?',
  'Message.title': 'Exemplary Supplier',
  'Validation.dateToSend': 'The date to make the survey has expired',
  'Validation.dateToEvaluate': 'The date exceeds the time to evaluate',
  'Validation.alreadyBeingEvaluated': 'The survey is already being evaluated by',
  'Validation.alreadyBeingQualified': 'The supplier is already being evaluated by',
  'Validation.noData': 'No data received',
  'Validation.noOpenCall': 'At this time there are no open calls',
  'Validation.supplier': 'There is no assessment for the type of supply and company size selected',
  'Validation.unauthorized': 'You are not authorized to access this site',
  'Validation.wentWrong': 'Something went wrong',
  'Validation.validExtension': 'Invalid extension',
  'Validation.validNameFile': 'The file name cannot contain special characters (Accent Mark, &,%,$)',
  'Validation.uploadFail': 'Something went wrong uploading the file',
  'Validation.successUpload': 'File successfully uploaded',
  'Validation.maxFilesNumber': 'The maximum number of files is',
  'Validation.maxFileSize': 'The file must be less than',
  'Validation.verifyDimensions': 'Still have dimensions and unfilled questions, please validate',
  'Validation.requiredField': 'This field is required',
  'Validation.surveyCouldNotComplete': 'The survey could not be completed',
  'Validation.informationNotFound': 'Information not found',
  'Validation.documentExists': 'There is another document with the same data',
  'Validation.pattern': 'Enter a year',
  'Validation.callExists': 'Existing call',
  'Validation.dateWithoutFixing': 'The closing date of the survey is not configured',
  'Validation.dontExistInDirectory': 'Supplier don´t exist in directory',
  'Validation.documentMultiConect': 'Data is referenced, cannot be edited or deleted',
  'Validation.undefinedSupplier': 'At least one provider must be entered',
  'Validation.callExistsActive': 'Existing active call',
  'Validation.noDataReport': 'You must first perform a search',
  'Title.imageGallery': 'Image Gallery',
  'Title.percentageAdvance': 'Percentage of Advance',
  'Title.pendings': 'My pendings',
  'Title.informationMessage': 'Below are the suppliers that are pending to evaluate.',
  'Title.companySize': 'By company size',
  'Title.supplyType': 'By supply type',
  'Title.country': 'By country',
};
export default messages;
