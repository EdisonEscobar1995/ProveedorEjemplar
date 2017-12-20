const languageVariable = 'exemplary_provider_language';
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
const changeLanguage = () => {
  const actualLanguage = localStorage.getItem(languageVariable);
  if (actualLanguage === spanish) {
    localStorage.setItem(languageVariable, english);
  } else {
    localStorage.setItem(languageVariable, spanish);
  }
  location.reload();
};

export {
  getLanguage,
  changeLanguage,
};
