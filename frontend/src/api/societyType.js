import instance from './instance';

const getDataSocietyTypesApi = () => instance.get('SocietyType?action=getAll');

const saveDataSocietyTypeApi = data => instance.post('SocietyType?action=save', data);

const deleteDataSocietyTypeApi = data => instance.get('SocietyType?action=delete', {
  params: { id: data.id },
});

export {
  getDataSocietyTypesApi,
  saveDataSocietyTypeApi,
  deleteDataSocietyTypeApi,
};
