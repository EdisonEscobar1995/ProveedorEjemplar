import intance from './instance';
import { languageLocalName } from '../utils/variables';

const setLanguageApi = () => {
  let languageActive = localStorage.getItem(languageLocalName);
  if (!languageActive) {
    languageActive = 'es';
  }

  return intance.get(`Translation?action=setLanguage&language=${languageActive}`);
};

export default setLanguageApi;
