import { languageLocalName } from '../utils/variables';

const languageVariable = languageLocalName;
const spanish = 'es';
const english = 'en';
const supportedLanguages = [spanish, english];

const getLanguage = () => {
  let language = spanish;
  const userLanguage = localStorage.getItem(languageVariable);
  if (userLanguage) {
    language = userLanguage;
  } else if (navigator) {
    const navigatorLanguage = navigator.language;
    if (supportedLanguages.indexOf(navigatorLanguage) > -1) {
      language = navigatorLanguage;
    }
  }
  localStorage.setItem(languageVariable, language);
  return language;
};
const getNoActiveLanguage = (actualLanguage) => {
  let languageChange;
  if (actualLanguage === spanish) {
    languageChange = english;
  } else {
    languageChange = spanish;
  }
  return languageChange;
};

const changeLanguage = () => {
  const actualLanguage = localStorage.getItem(languageVariable);
  localStorage.setItem(languageVariable, getNoActiveLanguage(actualLanguage));
  location.reload();
};

export {
  getLanguage,
  changeLanguage,
  getNoActiveLanguage,
};
