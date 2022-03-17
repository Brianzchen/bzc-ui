// @flow
const fs = require('fs');
const rootPath = require('app-root-path');

const path = `${rootPath}/website/components.json`;

const fileContents = JSON.parse(fs.readFileSync(path, 'utf-8'));
const newFileContents = Object.keys(fileContents).reduce((acc, cur) => {
  const split = cur.split('/');
  if (split.length !== 3) return acc;

  return {
    ...acc,
    [cur]: fileContents[cur],
  };
}, {});

fs.writeFileSync(path, JSON.stringify(newFileContents));
