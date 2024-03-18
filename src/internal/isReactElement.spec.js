// @flow
import * as React from 'react';

import isReactElement from './isReactElement';

describe('isReactElement', () => {
  it('validates string', () => {
    expect(isReactElement('123')).toBe(false);
    expect(isReactElement('123')).toBe(React.isValidElement('123'));
  });

  it('validates number', () => {
    expect(isReactElement(123)).toBe(false);
    expect(isReactElement(123)).toBe(React.isValidElement(123));
  });

  it('validates boolean', () => {
    expect(isReactElement(true)).toBe(false);
    expect(isReactElement(true)).toBe(React.isValidElement(true));
  });

  it('validates array of components', () => {
    const Comp = () => <div />;

    const comps = [1, 2, 3].map((o) => (
      <Comp key={o} />
    ));

    expect(isReactElement(comps)).toBe(false);
    expect(isReactElement(comps)).toBe(React.isValidElement(comps));
  });

  it('validates a primitive component', () => {
    expect(isReactElement(<div />)).toBe(true);
    expect(isReactElement(<div />)).toBe(React.isValidElement(<div />));
  });

  it('validates the wrong component', () => {
    const Comp = () => <div />;

    expect(isReactElement(<Comp />, 'Icon')).toBe(false);
    // $FlowExpectedError[prop-missing] displayName has not been assigned
    expect(isReactElement(<Comp />, 'Icon')).toBe(React.isValidElement(<Comp />) && <Comp />.type.displayName === 'Icon');
  });

  it('validates an exact component', () => {
    const Comp = () => <div />;
    Comp.displayName = 'Icon';

    expect(isReactElement(<Comp />, 'Icon')).toBe(true);
    // $FlowFixMe[prop-missing] cannot get property type of React.Node
    expect(isReactElement(<Comp />, 'Icon')).toBe(React.isValidElement(<Comp />) && <Comp />.type.displayName === 'Icon');
  });

  it('validates a general component check', () => {
    const Comp = () => <div />;

    expect(isReactElement(<Comp />)).toBe(true);
    expect(isReactElement(<Comp />)).toBe(React.isValidElement(<Comp />));
  });
});
