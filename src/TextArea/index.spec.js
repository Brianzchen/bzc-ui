// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import TextArea from '.';

describe('<TextArea />', () => {
  it('passes other random props into the textarea element', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<TextArea data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('renders title if passed in', () => {
    const title = lorem.sentence();

    render(<TextArea title={title} />);

    expect(screen.getByTestId('bzc-text-area-title').textContent).toBe(title);
  });

  it('can get ref of underlying textarea', (done) => {
    const Comp = () => {
      const ref = React.useRef();

      React.useEffect(() => {
        expect(ref.current instanceof HTMLTextAreaElement).toBe(true);
        done();
      }, []);

      return (
        <TextArea textAreaRef={ref} />
      );
    };

    render(<Comp />);
  });
});
