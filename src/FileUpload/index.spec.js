// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import FileUpload from '.';

describe('<FileUpload >', () => {
  it('renders the child', () => {
    const expectedText = lorem.sentence();
    render(
      <FileUpload>
        {() => (
          <div data-testid="test">
            {expectedText}
          </div>
        )}
      </FileUpload>,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });
});
