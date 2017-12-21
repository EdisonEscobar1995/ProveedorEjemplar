const languageVariable = 'exemplary_provider_language';
const cookieName = 'language';
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
  let cookie = document.cookie;
  let languageChange;
  if (cookie.indexOf(cookieName) < 0) {
    cookie = `${cookieName};${cookie}`;
  }
  if (actualLanguage === spanish) {
    languageChange = english;
    localStorage.setItem(languageVariable, english);
  } else {
    languageChange = spanish;
    localStorage.setItem(languageVariable, spanish);
  }
  cookie = cookie.replace(new RegExp(cookieName, 'g'), `${cookieName}=${languageChange}`);
  document.cookie = cookie;
  location.reload();
};

export {
  getLanguage,
  changeLanguage,
};
