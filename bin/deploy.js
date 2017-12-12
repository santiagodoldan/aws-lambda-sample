const fs = require('fs');
const AdmZip = require('adm-zip');
const AWS = require('aws-sdk');
const zipper = new AdmZip();

console.log('Zipping .webpack/service/ directory...');

zipper.addLocalFolder('.webpack/service', '');

zipper.toBuffer(zipBuffer => {
  console.log('Successfully created zip buffer');

  const lambda = new AWS.Lambda({
    apiVersion: '2015-03-31',
    region: 'us-east-2',
    maxRetries: 3,
    sslEnabled: true,
    logger: console,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
  });

  const params = {
    FunctionName: 'fetchTweets',
    Publish: false,
    ZipFile: zipBuffer,
  };

  lambda.updateFunctionCode(params, err => {
    if (err) {
      console.error(err);
      process.exit(3);
    }
  });
}, errString => {
  console.error(`Failed to create zip buffer: ${errString}`);
  process.exit(2);
}, filename => {
  console.log(`Zipping ${filename}...`);
});
