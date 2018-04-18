class LangIntl {
  static intl;
  static setIntl = (intlt) => {
    LangIntl.intl = intlt;
  };
  static getIntl = () => LangIntl.intl;
}

export default LangIntl;
