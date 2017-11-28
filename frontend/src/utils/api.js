const NODE_ENV = process.env.NODE_ENV;

let resultUrl = process.env.REACT_APP_URL_API;

if (NODE_ENV !== 'development') {
  const deployFolder = process.env.REACT_APP_DEPLOY_FOLDER;
  resultUrl = `${location.pathname.split(deployFolder)[0]}xsp`;
}
const baseUrl = resultUrl;

export default baseUrl;
