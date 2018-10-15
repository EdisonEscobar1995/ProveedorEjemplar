const NODE_ENV = process.env.NODE_ENV;
const deployFolder = process.env.REACT_APP_DEPLOY_FOLDER;

let href = process.env.REACT_APP_URL;
let pathname = process.env.REACT_APP_PATH;
let path = href;

if (NODE_ENV !== 'development') {
  href = location.href.split(deployFolder)[0];
  pathname = location.pathname.split(deployFolder)[0];
  path = pathname;
}

const baseUrl = `${path}xsp`;
const loginUrl = `${href}?logout&redirectto=${pathname}`;

export {
  baseUrl,
  loginUrl,
};

