const initLanguage = () => {
  if (!Object.prototype.hasOwnProperty.call(window, 'appLocale')) {
    window.appLocale = {};
  }
};

initLanguage();
