import axios from 'axios';

const env = process.NODE_ENV;
let baseUrl = process.env.REACT_APP_URL_API;
if (env !== 'development') {
  const deployFolder = process.env.REACT_APP_DEPLOY_FOLDER;
  baseUrl = `${baseUrl.split(deployFolder)[0]}xsp`;
}
const instance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-type': 'application/json' },
});

export {
  instance as default,
};
