import axios from 'axios';
import { baseUrlService } from '../utils/api';

const instanceService = axios.create({
  baseURL: baseUrlService,
  headers: {
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
    // Authorization: 'Basic dXN1YXJpbzI6dXN1YXJpbzI=', // Usuario2
    // Authorization: 'Basic amNnb256YWxlejpqY2dvbnphbGV6', // Juan Carlos
    // Authorization: 'Basic UDAwMTAwMDE4NDpTQURTQVRNUDRB', // Cristar
    // Authorization: 'Basic UDAwMTAwODY2NDpTQURTQVRNUEpZ', // H.B. FULLER COLOMBIA S.A.S
    // Authorization: 'Basic UDAwMTAwMjA4NDpTQURTQVRNUDVL', // TDM TRANSPORTES S A
    // Authorization: 'Basic OTY5MjA5ODA6MQ==', // WINPACK S.A.
  },
  withCredentials: true,
});

export {
  instanceService as default,
};
