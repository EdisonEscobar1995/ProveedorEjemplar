import axios from 'axios';

const env = process.env.REACT_APP_ENV;
let baseUrl = process.env.REACT_APP_URL_API;
if (env !== 'DEV') {
  const deployFolder = process.env.REACT_APP_DEPLOY_FOLDER;
  baseUrl = `${baseUrl.split(deployFolder)[0]}xsp`;
}
const instance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

export {
  instance as default,
};
