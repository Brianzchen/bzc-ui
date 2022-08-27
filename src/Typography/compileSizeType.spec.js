// @flow
import { lorem } from '@faker-js/faker';

import compileSizeType from './compileSizeType';

describe('compileSizeType', () => {
  const theme = {
    fonts: {
      withMobile: {
        px: lorem.word(),
        style: lorem.word(),
        leading: lorem.word(),
        mobile: {
          px: lorem.word(),
          style: lorem.word(),
          leading: lorem.word(),
        },
      },
      body: {
        px: lorem.word(),
        style: lorem.word(),
        leading: lorem.word(),
      },
      heading3: {
        px: lorem.word(),
        style: lorem.word(),
        leading: lorem.word(),
      },
      heading1: {
        px: lorem.word(),
        style: lorem.word(),
        leading: lorem.word(),
      },
    },
  };

  it('returns type as large when passed as string', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    // $FlowExpectedError[incompatible-call]
    expect(compileSizeType('body', theme)).toEqual({
      lg: theme.fonts.body,
    });
  });

  it('returns mobile as the sm object if theme supplies it', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    // $FlowExpectedError[incompatible-call]
    expect(compileSizeType('withMobile', theme)).toEqual({
      lg: theme.fonts.withMobile,
      sm: theme.fonts.withMobile.mobile,
    });
  });

  it('accepts object', () => {
    expect(compileSizeType({
      sm: 'body',
      md: 'heading3',
      lg: 'heading1',
    // $FlowExpectedError[prop-missing]
    // $FlowExpectedError[incompatible-call] missing theme props
    }, theme)).toEqual({
      sm: theme.fonts.body,
      md: theme.fonts.heading3,
      lg: theme.fonts.heading1,
    });
  });

  it('returns the mobile values if a type with mobile is passed to sm', () => {
    // $FlowExpectedError[incompatible-call] missing theme props
    expect(compileSizeType({
      sm: 'withMobile',
      lg: 'body',
    // $FlowExpectedError[incompatible-call]
    // $FlowExpectedError[prop-missing] missing theme props
    }, theme)).toEqual({
      sm: theme.fonts.withMobile.mobile,
      lg: theme.fonts.body,
    });
  });

  it('assigns md to lg if lg is missing', () => {
    expect(compileSizeType({
      md: 'heading3',
    // $FlowExpectedError[incompatible-call]
    // $FlowExpectedError[prop-missing] missing theme props
    }, theme)).toEqual({
      lg: theme.fonts.heading3,
      md: theme.fonts.heading3,
    });
  });

  it('assigns sm to lg when lg is missing', () => {
    expect(compileSizeType({
      sm: 'heading3',
    // $FlowExpectedError[incompatible-call]
    // $FlowExpectedError[prop-missing] missing theme props
    }, theme)).toEqual({
      lg: theme.fonts.heading3,
      sm: theme.fonts.heading3,
    });
  });
});
