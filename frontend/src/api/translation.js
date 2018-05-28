import instance from './instance';

const getAllTranslationApi = () => instance.get('Translation?action=getAll');

const getMastersWithFieldsToTranslateApi = () => instance.get('Translation?action=getMastersWithFieldsToTranslate');

const saveTranslationApi = data => instance.post('Translation?action=save', data);

export {
  getAllTranslationApi,
  getMastersWithFieldsToTranslateApi,
  saveTranslationApi,
};
