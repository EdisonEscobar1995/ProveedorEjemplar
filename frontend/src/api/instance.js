import axios from 'axios';
import { baseUrl } from '../utils/api';

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
    // Authorization: 'Basic amNnb256YWxlejpqY2dvbnphbGV6', // Juan Carlos
    // Authorization: 'Basic UDAwMTAwMDE4NDpTQURTQVRNUDRB', // Cristar
    // Authorization: 'Basic UDAwMTAwODY2NDpTQURTQVRNUEpZ', // H.B. FULLER COLOMBIA S.A.S
  },
  withCredentials: true,
});

export {
  instance as default,
};
