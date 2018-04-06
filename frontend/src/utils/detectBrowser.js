import { detect } from 'detect-browser';

const browser = detect();
let supported;
switch (browser && browser.name) {
  case 'chrome':
  case 'firefox':
  case 'edge':
  case 'ios':
  case 'safari':
    supported = true;
    break;
  default:
    supported = false;
}

const supportedBrowser = supported;

export default supportedBrowser;
