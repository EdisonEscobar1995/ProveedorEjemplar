import axios from 'axios';
import baseUrl from '../utils/api';

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic dXN1YXJpbzM6dXN1YXJpbzM=',
  },
});

export {
  instance as default,
};
