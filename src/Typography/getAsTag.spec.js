// @flow
import mobileWidth from '../theme/mobileWidth';
import tabletWidth from '../theme/tabletWidth';

import getAsTag from './getAsTag';

describe('getAsTag', () => {
  const theme = {
    mobileWidth,
    tabletWidth,
  };

  it('returns h1', () => {
    // $FlowExpectedError[prop-missing] theme not fully implemented
    expect(getAsTag('displayTitle1', 'span', theme)).toBe('h1');
    // $FlowExpectedError[prop-missing] theme not fully implemented
    expect(getAsTag('heading1', 'span', theme)).toBe('h1');
  });

  it('returns h2', () => {
    // $FlowExpectedError[prop-missing] theme not fully implemented
    expect(getAsTag('displayTitle2', 'span', theme)).toBe('h2');
    // $FlowExpectedError[prop-missing] theme not fully implemented
    expect(getAsTag('heading2', 'span', theme)).toBe('h2');
  });

  it('returns h3', () => {
    // $FlowExpectedError[prop-missing] theme not fully implemented
    expect(getAsTag('heading3', 'span', theme)).toBe('h3');
  });

  it('returns default', () => {
    // $FlowExpectedError[prop-missing] theme not fully implemented
    expect(getAsTag('body', 'span', theme)).toBe('span');
  });

  describe('with object param', () => {
    it('returns sm when window is small', () => {
      window.innerWidth = 500;
      expect(getAsTag(
        {
          sm: 'heading1',
          md: 'heading2',
          lg: 'body',
        },
        'span',
        // $FlowExpectedError[prop-missing] theme not fully implemented
        theme,
      )).toBe('h1');
    });

    it('returns md when window is medium', () => {
      window.innerWidth = 700;
      expect(getAsTag(
        {
          sm: 'heading1',
          md: 'heading2',
          lg: 'body',
        },
        'span',
        // $FlowExpectedError[prop-missing] theme not fully implemented
        theme,
      )).toBe('h2');
    });

    it('returns lg when window is large', () => {
      window.innerWidth = 1000;
      expect(getAsTag(
        {
          sm: 'heading1',
          md: 'heading2',
          lg: 'heading3',
        },
        'span',
        // $FlowExpectedError[prop-missing] theme not fully implemented
        theme,
      )).toBe('h3');
    });

    it('returns md when small and sm is missing', () => {
      window.innerWidth = 500;
      expect(getAsTag(
        {
          md: 'heading2',
          lg: 'heading3',
        },
        'span',
        // $FlowExpectedError[prop-missing] theme not fully implemented
        theme,
      )).toBe('h2');
    });

    it('returns lg when medium and md is missing', () => {
      window.innerWidth = 700;
      expect(getAsTag(
        {
          sm: 'heading2',
          lg: 'heading3',
        },
        'span',
        // $FlowExpectedError[prop-missing] theme not fully implemented
        theme,
      )).toBe('h3');
    });
  });
});
