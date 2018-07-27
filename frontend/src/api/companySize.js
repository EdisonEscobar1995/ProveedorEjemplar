import intance from './instance';

const getDataCompanySizeApi = () => intance.get('CompanySize?action=getAll');

const saveDataCompanySizeApi = data => intance.post('CompanySize?action=save', data);

const deleteDataCompanyTypeApi = data => intance.get('CompanySize?action=delete', {
  params: { id: data.id },
});

export {
  getDataCompanySizeApi,
  saveDataCompanySizeApi,
  deleteDataCompanyTypeApi,
};
