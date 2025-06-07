import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../../Modal/Modal';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { FormControl } from '../../FormControl/FormControl';

const ModalWithForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Form"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="test-form">
              Submit
            </Button>
          </>
        }
      >
        <form id="test-form" onSubmit={handleSubmit}>
          <FormControl label="Test Input">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </FormControl>
        </form>
      </Modal>
      {submitted && <div data-testid="success-message">Form submitted!</div>}
    </div>
  );
};

describe('Modal Integration', () => {
  test('submits a form inside the modal', async () => {
    render(<ModalWithForm />);

    await userEvent.click(screen.getByRole('button', { name: 'Open Modal' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Enter value'), 'value');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByTestId('success-message')).toBeInTheDocument();
  });

  test('closes modal without submitting', async () => {
    render(<ModalWithForm />);

    await userEvent.click(screen.getByRole('button', { name: 'Open Modal' }));
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
