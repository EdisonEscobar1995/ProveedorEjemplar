import instance from './instance';

const getAllTranslationApi = () => instance.get('Translation?action=getAll');

const getMastersWithFieldsToTranslateApi = () => instance.get('Translation?action=getMastersWithFieldsToTranslate');

const saveTranslationApi = data => instance.post('Translation?action=save', data);

const getAllValuesByFieldApi = master => instance.get(`${master}?action=getAll`);

export {
  getAllTranslationApi,
  getAllValuesByFieldApi,
  getMastersWithFieldsToTranslateApi,
  saveTranslationApi,
};
