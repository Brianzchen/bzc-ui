// @flow
import fs from 'fs';
import path from 'path';

import * as startown from '.';

describe('startown', () => {
  const exclusions = ['internal', 'theme'];

  it('exports all top level functions and components', () => {
    const dirs = fs.readdirSync(__dirname);

    dirs.forEach((dir) => {
      const stat = fs.lstatSync(path.join(__dirname, dir));
      if (stat.isDirectory() && !exclusions.includes(dir)) {
        if (startown[dir]) {
          expect(startown[dir]).toBeDefined();
        } else {
          throw new Error(`\`${dir}\` is missing a top level export`);
        }
      }
    });
  });

  it('can import types', () => {
    const color: startown.types.StyleObjT = {
      ...null,
    };

    expect(color.display).toBe(undefined);
  });

  Object.keys(startown).forEach((key) => {
    const module = startown[key];

    if (key.charAt(0).toUpperCase() === key.charAt(0)) {
      it(`${key} has a displayName`, () => {
        expect((module: any).displayName).toBeDefined();
      });
    }
  });
});
