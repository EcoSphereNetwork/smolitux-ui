import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { FormGroup } from '../FormGroup';

describe('FormGroup', () => {
  test('snapshot', () => {
    const tree = renderer
      .create(
        <FormGroup label="Name" id="fg">
          <input id="name" />
        </FormGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders hint and error', () => {
    render(
      <FormGroup label="Email" hint="enter" error="invalid" id="fg">
        <input id="email" />
      </FormGroup>
    );
    expect(screen.getByText('enter')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('invalid');
  });

  test('label focuses input', async () => {
    const user = userEvent.setup();
    render(
      <FormGroup label="Age" labelFor="age" id="fg">
        <input id="age" aria-label="Age" />
      </FormGroup>
    );
    await user.click(screen.getByText('Age'));
    expect(screen.getByLabelText('Age', { selector: 'input' })).toHaveFocus();
  });

  test('has correct aria attributes', () => {
    render(
      <FormGroup label="City" required error="e" hint="h" id="fg" labelFor="city">
        <input id="city" aria-label="City" />
      </FormGroup>
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-required', 'true');
    expect(group).toHaveAttribute('aria-invalid', 'true');
    const described = group.getAttribute('aria-describedby');
    expect(described).toContain('fg-error');
    expect(described).toContain('fg-hint');
  });
});
