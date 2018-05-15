import instance from './instance';

const getDataCompanyTypesApi = () => instance.get('CompanyType?action=getAll');

const saveDataCompanyTypeApi = data => instance.post('CompanyType?action=save', data);

const deleteDataCompanyTypeApi = data => instance.get('CompanyType?action=delete', {
  params: { id: data.id },
});

export {
  getDataCompanyTypesApi,
  saveDataCompanyTypeApi,
  deleteDataCompanyTypeApi,
};
