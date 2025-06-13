import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Listbox } from '../Listbox';

const options = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' },
];

describe('Listbox', () => {
  test('snapshot', () => {
    const tree = renderer
      .create(
        <Listbox value="1" onChange={() => {}} options={options} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('selects option on click', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    render(<Listbox value="1" onChange={handle} options={options} />);
    await user.click(screen.getByText('Two'));
    expect(handle).toHaveBeenCalledWith('2');
  });

  test('keyboard navigation', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    render(
      <Listbox value="1" onChange={handle} options={options} aria-label="demo" />,
    );
    const list = screen.getByRole('listbox');
    list.focus();
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[Enter]');
    expect(handle).toHaveBeenCalledWith('2');
  });
});
