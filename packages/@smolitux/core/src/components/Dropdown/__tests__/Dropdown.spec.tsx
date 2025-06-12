import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Dropdown, DropdownOption } from '../Dropdown';

expect.extend(toHaveNoViolations);

const options: DropdownOption[] = [
  { value: 'one', label: 'One', group: 'first' },
  { value: 'two', label: 'Two', group: 'first' },
  { value: 'three', label: 'Three', group: 'second' },
];

describe('Dropdown', () => {
  test('snapshot closed', () => {
    const tree = renderer
      .create(
        <Dropdown id="dropdown-test" value="one" onChange={() => {}} options={options} />

      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('opens and selects via keyboard', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Dropdown
        id="dropdown-test"
        value="one"
        onChange={handleChange}
        options={options}
        grouped
        searchable
      />
    );

    const button = screen.getByTestId('dropdown-button');
    await user.click(button);
    expect(screen.getByTestId('dropdown-list')).toBeInTheDocument();

    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(handleChange).toHaveBeenCalledWith('two');
    expect(screen.queryByTestId('dropdown-list')).not.toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    const { container } = render(
      <Dropdown value="one" onChange={() => {}} options={options} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
