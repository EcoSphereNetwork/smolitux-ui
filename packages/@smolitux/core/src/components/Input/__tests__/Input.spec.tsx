import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Input } from '../Input';

describe('Input', () => {
  test('snapshot', () => {
    const tree = renderer
      .create(<Input value="" onChange={() => {}} placeholder="x" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('calls onChange with new value', async () => {
    const user = userEvent.setup();
    function Wrapper() {
      const [val, setVal] = React.useState('');
      return <Input value={val} onChange={setVal} aria-label="demo" />;
    }
    render(<Wrapper />);
    await user.type(screen.getByLabelText('demo'), 'abc');
    expect(screen.getByLabelText('demo')).toHaveValue('abc');
  });

  test('respects disabled prop', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Input value="a" onChange={handleChange} disabled aria-label="demo" />,
    );
    expect(screen.getByLabelText('demo')).toBeDisabled();
    await user.type(screen.getByLabelText('demo'), 'b');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
