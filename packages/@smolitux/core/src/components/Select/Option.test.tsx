import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Option } from './Option';

expect.extend(toHaveNoViolations);

describe('Option', () => {
  it('renders value and label', () => {
    render(
      <select>
        <Option value="1">Label</Option>
      </select>
    );
    const option = screen.getByTestId('option');
    expect(option).toHaveValue('1');
    expect(option).toHaveTextContent('Label');
  });

  it('sets disabled attribute', () => {
    render(
      <select>
        <Option value="1" disabled>
          Disabled
        </Option>
      </select>
    );
    const option = screen.getByTestId('option');
    expect(option).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLOptionElement>();
    render(
      <select>
        <Option ref={ref} value="1">
          Option
        </Option>
      </select>
    );
    expect(ref.current).toBeInstanceOf(HTMLOptionElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <select>
        <Option value="1">Label</Option>
      </select>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
