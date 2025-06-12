import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FileUpload } from '../FileUpload';

expect.extend(toHaveNoViolations);

describe('FileUpload', () => {
  test('snapshot', () => {
    const tree = renderer
      .create(<FileUpload onChange={() => {}} id="fu" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('selects files', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    render(<FileUpload onChange={handle} id="fu" label="Files" />);
    const input = screen.getByTestId('file-upload-input');
    const file = new File(['a'], 'a.txt', { type: 'text/plain' });
    await user.upload(input, file);
    expect(handle).toHaveBeenCalledWith([file]);
  });

  test('drag and drop', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    render(<FileUpload onChange={handle} id="fu" label="Files" />);
    const drop = screen.getByTestId('file-upload-dropzone');
    const file = new File(['b'], 'b.txt', { type: 'text/plain' });
    const data = {
      files: [file],
      items: [{ kind: 'file', type: file.type, getAsFile: () => file }],
      types: ['Files'],
    } as unknown as DataTransfer;
    fireEvent.drop(drop, { dataTransfer: data });
    expect(handle).toHaveBeenCalled();
  });

  test('file validation', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    render(<FileUpload onChange={handle} accept="image/*" id="fu" label="Files" />);
    const input = screen.getByTestId('file-upload-input');
    const file = new File(['a'], 'a.txt', { type: 'text/plain' });
    await user.upload(input, file);
    expect(handle).not.toHaveBeenCalled();
  });

  test('has no a11y violations', async () => {
    const { container } = render(<FileUpload onChange={() => {}} id="fu" label="Files" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
