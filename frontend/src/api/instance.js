import axios from 'axios';
import { baseUrl } from '../utils/api';
import { cookieName, languageLocalName } from '../utils/variables';

const Cookie = `${cookieName}=${localStorage.getItem(languageLocalName)};`;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
    Cookie,
  },
});

export {
  instance as default,
};
