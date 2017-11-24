import axios from 'axios';

const NODE_ENV = process.env.NODE_ENV;

let baseUrl = process.env.REACT_APP_URL_API;
if (NODE_ENV !== 'development') {
  const deployFolder = process.env.REACT_APP_DEPLOY_FOLDER;
  baseUrl = `${location.pathname.split(deployFolder)[0]}xsp`;
}
const instance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-type': 'application/json' },
});

export {
  instance as default,
};
