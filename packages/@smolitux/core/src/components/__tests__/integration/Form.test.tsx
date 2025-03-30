import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Select } from '../../Select/Select';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Radio, RadioGroup } from '../../Radio/Radio';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Form Integration', () => {
  test('renders a complete form with all form elements', () => {
    render(
      <form data-testid="test-form">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Select 
          label="Country" 
          options={[
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
            { value: 'uk', label: 'United Kingdom' }
          ]} 
        />
        <RadioGroup name="gender" label="Gender">
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
          <Radio value="other" label="Other" />
        </RadioGroup>
        <Checkbox label="I agree to the terms and conditions" />
        <Button type="submit">Submit</Button>
      </form>
    );
    
    expect(screen.getByTestId('test-form')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText('Other')).toBeInTheDocument();
    expect(screen.getByLabelText('I agree to the terms and conditions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('handles form submission with all form elements', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    
    render(
      <form data-testid="test-form" onSubmit={handleSubmit}>
        <Input label="Name" name="name" placeholder="Enter your name" />
        <Input label="Email" name="email" type="email" placeholder="Enter your email" />
        <Select 
          label="Country" 
          name="country"
          options={[
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
            { value: 'uk', label: 'United Kingdom' }
          ]} 
        />
        <RadioGroup name="gender" label="Gender">
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
          <Radio value="other" label="Other" />
        </RadioGroup>
        <Checkbox name="terms" label="I agree to the terms and conditions" />
        <Button type="submit">Submit</Button>
      </form>
    );
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    
    // Select a country
    await userEvent.selectOptions(screen.getByLabelText('Country'), 'fr');
    
    // Select a gender
    await userEvent.click(screen.getByLabelText('Male'));
    
    // Check the terms checkbox
    await userEvent.click(screen.getByLabelText('I agree to the terms and conditions'));
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('validates form inputs and shows error messages', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    
    const TestForm = () => {
      const [errors, setErrors] = React.useState({
        name: '',
        email: '',
        country: '',
        gender: '',
        terms: ''
      });
      
      const validateForm = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newErrors = { ...errors };
        
        if (!formData.get('name')) {
          newErrors.name = 'Name is required';
        }
        
        if (!formData.get('email')) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.get('email') as string)) {
          newErrors.email = 'Email is invalid';
        }
        
        if (!formData.get('country')) {
          newErrors.country = 'Country is required';
        }
        
        if (!formData.get('gender')) {
          newErrors.gender = 'Gender is required';
        }
        
        if (!formData.get('terms')) {
          newErrors.terms = 'You must agree to the terms';
        }
        
        setErrors(newErrors);
        
        if (Object.values(newErrors).every(error => !error)) {
          handleSubmit(e);
        }
      };
      
      return (
        <form data-testid="test-form" onSubmit={validateForm}>
          <Input 
            label="Name" 
            name="name" 
            placeholder="Enter your name" 
            error={errors.name}
          />
          <Input 
            label="Email" 
            name="email" 
            type="email" 
            placeholder="Enter your email" 
            error={errors.email}
          />
          <Select 
            label="Country" 
            name="country"
            options={[
              { value: 'de', label: 'Germany' },
              { value: 'fr', label: 'France' },
              { value: 'uk', label: 'United Kingdom' }
            ]} 
            error={errors.country}
          />
          <RadioGroup name="gender" label="Gender" error={errors.gender}>
            <Radio value="male" label="Male" />
            <Radio value="female" label="Female" />
            <Radio value="other" label="Other" />
          </RadioGroup>
          <Checkbox 
            name="terms" 
            label="I agree to the terms and conditions" 
            error={errors.terms}
          />
          <Button type="submit">Submit</Button>
        </form>
      );
    };
    
    render(<TestForm />);
    
    // Submit the form without filling it out
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    // Check for error messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Country is required')).toBeInTheDocument();
    expect(screen.getByText('Gender is required')).toBeInTheDocument();
    expect(screen.getByText('You must agree to the terms')).toBeInTheDocument();
    
    // The form should not have been submitted
    expect(handleSubmit).not.toHaveBeenCalled();
    
    // Fill out the form with invalid email
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'invalid-email');
    await userEvent.selectOptions(screen.getByLabelText('Country'), 'fr');
    await userEvent.click(screen.getByLabelText('Male'));
    await userEvent.click(screen.getByLabelText('I agree to the terms and conditions'));
    
    // Submit the form again
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    // Check for email error message
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    
    // The form should still not have been submitted
    expect(handleSubmit).not.toHaveBeenCalled();
    
    // Fix the email
    await userEvent.clear(screen.getByLabelText('Email'));
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    
    // Submit the form again
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    // Now the form should have been submitted
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('handles form with dynamic fields', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    
    const DynamicForm = () => {
      const [fields, setFields] = React.useState([{ id: 1, value: '' }]);
      
      const addField = () => {
        setFields([...fields, { id: fields.length + 1, value: '' }]);
      };
      
      const removeField = (id: number) => {
        setFields(fields.filter(field => field.id !== id));
      };
      
      const handleChange = (id: number, value: string) => {
        setFields(fields.map(field => 
          field.id === id ? { ...field, value } : field
        ));
      };
      
      return (
        <form data-testid="dynamic-form" onSubmit={handleSubmit}>
          {fields.map(field => (
            <div key={field.id} className="flex items-center">
              <Input 
                label={`Field ${field.id}`}
                name={`field-${field.id}`}
                value={field.value}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => removeField(field.id)}
                aria-label={`Remove Field ${field.id}`}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addField}>Add Field</Button>
          <Button type="submit">Submit</Button>
        </form>
      );
    };
    
    render(<DynamicForm />);
    
    // Initially there should be one field
    expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
    
    // Add two more fields
    await userEvent.click(screen.getByRole('button', { name: 'Add Field' }));
    await userEvent.click(screen.getByRole('button', { name: 'Add Field' }));
    
    // Now there should be three fields
    expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Field 3')).toBeInTheDocument();
    
    // Fill out the fields
    await userEvent.type(screen.getByLabelText('Field 1'), 'Value 1');
    await userEvent.type(screen.getByLabelText('Field 2'), 'Value 2');
    await userEvent.type(screen.getByLabelText('Field 3'), 'Value 3');
    
    // Remove the second field
    await userEvent.click(screen.getByRole('button', { name: 'Remove Field 2' }));
    
    // Now there should be two fields
    expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
    expect(screen.queryByLabelText('Field 2')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Field 3')).toBeInTheDocument();
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});