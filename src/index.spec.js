// @flow
import fs from 'fs';
import path from 'path';

import * as starfall from '.';

describe('starfall', () => {
  const exclusions = ['internal', 'theme'];

  it('exports all top level functions and components', () => {
    const dirs = fs.readdirSync(__dirname);

    dirs.forEach((dir) => {
      const stat = fs.lstatSync(path.join(__dirname, dir));
      if (stat.isDirectory() && !exclusions.includes(dir)) {
        if (starfall[dir]) {
          expect(starfall[dir]).toBeDefined();
        } else {
          throw new Error(`\`${dir}\` is missing a top level export`);
        }
      }
    });
  });

  it('can import types', () => {
    const color: starfall.types.StyleObjT = {
      ...null,
    };

    expect(color.display).toBe(undefined);
  });
});
