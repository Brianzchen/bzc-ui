// @flow
import fs from 'fs';
import path from 'path';

import * as bzcUi from '.';
import * as types from './types';

describe('bzc-ui', () => {
  const exclusions = ['internal', 'theme'];

  it('exports all top level functions and components', () => {
    const dirs = fs.readdirSync(__dirname);

    dirs.forEach((dir) => {
      const stat = fs.lstatSync(path.join(__dirname, dir));
      if (stat.isDirectory() && !exclusions.includes(dir)) {
        if (bzcUi[dir]) {
          expect(bzcUi[dir]).toBeDefined();
        } else {
          throw new Error(`\`${dir}\` is missing a top level export`);
        }
      }
    });
  });

  it('can import types', () => {
    const color: types.StyleObjT = {
      ...null,
    };

    expect(color.display).toBe(undefined);
  });

  Object.keys(bzcUi).forEach((key) => {
    const module = bzcUi[key];

    if (key.charAt(0).toUpperCase() === key.charAt(0)) {
      it(`${key} has a displayName`, () => {
        expect((module: any).displayName).toBeDefined();
      });
    }
  });
});
