import './initLanguage';
import './EN';
import './ES';
import { getLanguage, getNoActiveLanguage } from './functions';

const activeLanguage = getLanguage();
const noActiveLanguage = getNoActiveLanguage(activeLanguage);

export {
  activeLanguage,
  noActiveLanguage,
};
