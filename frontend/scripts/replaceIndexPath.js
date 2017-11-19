'use strict';

const fs = require('fs');
const paths = require('../config/paths');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
// Ensure environment variables are read.
require('../config/env');

const indexFile = `${paths.appBuild}/index.html`;
const regexIndexFile = /="\//g;

const pathMainJs = `${paths.appBuild}/static/`;
const regexIndexFileMain = /src=.+static\/js/g;


fs.readFile(indexFile, 'utf8', (err, data) => {
  if (err) throw err;
  const newStringFile = data.replace(regexIndexFile, '="');

  fs.writeFile(indexFile, newStringFile, (err) => {
    if (err) throw err;
    console.log('The file was saved!');
  });

  const fileJsName = newStringFile.match(/js.(main\..+\.js)/gm)[0];

  fs.readFile((pathMainJs + fileJsName), 'utf8', (errMain, dataMain) => {
    if (errMain) throw err;
    const newStringFileMain = dataMain.replace(
      regexIndexFileMain,
      'src="static/js',
    );

    fs.writeFile(pathMainJs + fileJsName, newStringFileMain, (errMain2) => {
      if (errMain2) throw errMain2;
      console.log('The file was saved!');
    });
  });
});
