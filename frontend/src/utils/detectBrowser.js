import { detect } from 'detect-browser';

const browser = detect();
let supported;

switch ((browser && browser.name) || browser.os) {
  case 'chrome':
  case 'firefox':
  case 'edge':
  case 'ios':
  case 'iOS':
  case 'safari':
  case 'opera':
  case 'Mac OS':
  case 'android':
    supported = true;
    break;
  default:
    supported = false;
}

const supportedBrowser = supported;

export default supportedBrowser;
