import axios from 'axios';
import { baseUrl } from '../utils/api';

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

export {
  instance as default,
};