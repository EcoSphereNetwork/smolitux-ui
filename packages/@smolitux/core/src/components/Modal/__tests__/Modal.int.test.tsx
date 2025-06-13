import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../Modal';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { FormControl } from '../../FormControl/FormControl';

// Mock createPortal to keep markup in the DOM tree
jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return { ...original, createPortal: (node: React.ReactNode) => node };
});

describe('Modal Integration', () => {
  const ModalWithForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formValue, setFormValue] = useState('');
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
                value={formValue}
                onChange={(value) => setFormValue(value)}
                placeholder="Enter value"
              />
            </FormControl>
          </form>
        </Modal>
        {submitted && <div data-testid="success-message">Form submitted!</div>}
      </div>
    );
  };

  test('opens modal, submits form and shows success message', async () => {
    render(<ModalWithForm />);
    await userEvent.click(screen.getByRole('button', { name: 'Open Modal' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText('Enter value'), 'hello');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('success-message')).toBeInTheDocument();
  });
});
