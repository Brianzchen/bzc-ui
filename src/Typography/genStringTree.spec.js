// @flow
import React from 'react';

import Box from '../Box';
import Link from '../Link';

import genStringTree from './genStringTree';

describe('genStringTree', () => {
  const defaultOptions = { underline: false };

  it('returns string normally', () => {
    const text = '* here is some text that should return just the way it is';
    expect(genStringTree(text, defaultOptions)).toBe(text);
  });

  it('bold to be returned', () => {
    const text = '**this** should be **bold** at the first and last **word**';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      '',
      <b key="1">
        this
      </b>,
      ' should be ',
      <b key="3">
        bold
      </b>,
      ' at the first and last ',
      <b key="5">
        word
      </b>,
      '',
    ]));
  });

  it('does not bold when there are extra stars', () => {
    const text = 'This number should be masked 12********43';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'This number should be masked 12',
      '****',
      '',
      '****',
      '43',
    ]));
  });

  it('does not bold when there are odd number of extra stars', () => {
    const text = 'This number should be masked 12*****43';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'This number should be masked 12',
      '****',
      '*43',
    ]));
  });

  it('does not bold when there are not enough stars to form bold syntax', () => {
    const text = 'This number should be masked 12***43';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'This number should be masked 12',
      '***43',
    ]));

    const text2 = 'This number should be masked 12**********43';
    expect(JSON.stringify(genStringTree(text2, defaultOptions))).toBe(JSON.stringify([
      'This number should be masked 12',
      '****',
      '',
      '****',
      '',
      '**43',
    ]));
  });

  it('can return bold when first char does not need bolding', () => {
    const text = 'this should be **bold** at the first and last **word**';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'this should be ',
      <b key="1">
        bold
      </b>,
      ' at the first and last ',
      <b key="3">
        word
      </b>,
      '',
    ]));
  });

  it('generates links correctly', () => {
    const text = 'this should be **bold** and it [links]((/test))';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'this should be ',
      <b key="1">
        bold
      </b>,
      ' and it ',
      <Link key="3" href="/test" newTab={false}>
        links
      </Link>,
      '',
    ]));
  });

  it('generates links with partial params', () => {
    const text = 'this should be **bold** and it [links]((/test|false))';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'this should be ',
      <b key="1">
        bold
      </b>,
      ' and it ',
      <Link key="3" href="/test" newTab={false}>
        links
      </Link>,
      '',
    ]));
  });

  it('generates links with all params passed', () => {
    const text = 'this should be **bold** and it [links]((https://www.google.com/search?q=starfall&rlz=1C5CHFA_enAU919AU919&oq=sta&aqs=chrome.0.69i59j69i64j5j69i60j5i44l4.3622j0j7&sourceid=chrome&ie=UTF-8|true|underline))';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'this should be ',
      <b key="1">
        bold
      </b>,
      ' and it ',
      <Link
        key="3"
        href="https://www.google.com/search?q=starfall&rlz=1C5CHFA_enAU919AU919&oq=sta&aqs=chrome.0.69i59j69i64j5j69i60j5i44l4.3622j0j7&sourceid=chrome&ie=UTF-8"
        newTab
        variant="underline"
      >
        links
      </Link>,
      '',
    ]));
  });

  it('renders link as underline by default if option passed in', () => {
    const text = 'this should be **bold** and it [links]((https://www.google.com/search?q=starfall&rlz=1C5CHFA_enAU919AU919&oq=sta&aqs=chrome.0.69i59j69i64j5j69i60j5i44l4.3622j0j7&sourceid=chrome&ie=UTF-8))';
    expect(JSON.stringify(genStringTree(text, { underline: true }))).toBe(JSON.stringify([
      'this should be ',
      <b key="1">
        bold
      </b>,
      ' and it ',
      <Link
        key="3"
        href="https://www.google.com/search?q=starfall&rlz=1C5CHFA_enAU919AU919&oq=sta&aqs=chrome.0.69i59j69i64j5j69i60j5i44l4.3622j0j7&sourceid=chrome&ie=UTF-8"
        newTab={false}
        variant="underline"
      >
        links
      </Link>,
      '',
    ]));
  });

  it('can render links as regular even if underline has been defaulted', () => {
    const text = 'this should be **bold** and it [links]((https://www.google.com/search?q=starfall&rlz=1C5CHFA_enAU919AU919&oq=sta&aqs=chrome.0.69i59j69i64j5j69i60j5i44l4.3622j0j7&sourceid=chrome&ie=UTF-8|false|regular))';
    expect(JSON.stringify(genStringTree(text, { underline: true }))).toBe(JSON.stringify([
      'this should be ',
      <b key="1">
        bold
      </b>,
      ' and it ',
      <Link
        key="3"
        href="https://www.google.com/search?q=starfall&rlz=1C5CHFA_enAU919AU919&oq=sta&aqs=chrome.0.69i59j69i64j5j69i60j5i44l4.3622j0j7&sourceid=chrome&ie=UTF-8"
        newTab={false}
        variant="regular"
      >
        links
      </Link>,
      '',
    ]));
  });

  it('generates colored text', () => {
    const text = 'I expect :primary:this:: word to be primary';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'I expect ',
      <Box
        key="1"
        color="primary"
        style={{ display: 'inline' }}
      >
        {['this']}
      </Box>,
      ' word to be primary',
    ]));
  });

  it('can wrap bold in color', () => {
    const text = 'I expect :primary:**this**:: word to be primary';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'I expect ',
      <Box
        key="1"
        color="primary"
        style={{ display: 'inline' }}
      >
        {[
          <b key="0">
            this
          </b>,
          '',
        ]}
      </Box>,
      ' word to be primary',
    ]));
  });

  it('can wrap link in color', () => {
    const text = 'I expect :primary:[link]((/test)):: word to be primary';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'I expect ',
      <Box
        key="1"
        color="primary"
        style={{ display: 'inline' }}
      >
        {[
          <Link
            key="0"
            href="/test"
            newTab={false}
          >
            link
          </Link>,
          '',
        ]}
      </Box>,
      ' word to be primary',
    ]));
  });

  it('does not render colors unexpectedly', () => {
    const text = 'Test: this will not change: ok?';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify(
      'Test: this will not change: ok?',
    ));
  });

  it('creates a new line with \n syntax', () => {
    const text = 'I am on\na new line!';
    expect(JSON.stringify(genStringTree(text, defaultOptions))).toBe(JSON.stringify([
      'I am on',
      <br key="1" />,
      'a new line!',
    ]));
  });
});
