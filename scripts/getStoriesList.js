// @flow
const fs = require('fs');
const rootPath = require('app-root-path');

const src = `${rootPath.toString()}/src`;

const exists = (o/*: string */) => fs.existsSync(`${rootPath}/src/${o}/index.stories.js`);

fs.readdir(src, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const componentNames = files.filter((o) => (
    o.substring(0, 1) === o.substring(0, 1).toUpperCase()
    && o.indexOf('.') === -1
  )).filter(exists);

  const utilityNames = files.filter((o) => (
    o.substring(0, 1) === o.substring(0, 1).toLowerCase()
    && o.indexOf('.') === -1
    && !['internal', 'theme'].includes(o)
  )).filter(exists);

  const relativeFilePath = 'website/src/App/ComponentApi';

  const fileToWrite = `// @flow
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.${[...componentNames, ...utilityNames].map((o) => `\nexport * as ${o} from '${relativeFilePath.split('/').map((j) => (j === '' ? '' : '..')).join('/')}/src/${o}/index.stories';`).toString().replace(/,/g, '')}
`;
  fs.writeFile(`${rootPath}/${relativeFilePath}/storyCache.js`, fileToWrite, (e) => {
    if (e) {
      console.error(e);
    }
  });
});
