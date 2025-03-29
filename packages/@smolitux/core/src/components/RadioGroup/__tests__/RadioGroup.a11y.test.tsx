import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import RadioGroup from '../RadioGroup';
import Radio from '../../Radio/Radio';

// Erweitere Jest-Matcher um Barrierefreiheitsprüfungen
expect.extend(toHaveNoViolations);

describe('RadioGroup Accessibility', () => {
  test('should not have accessibility violations with options prop', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ];
    
    const { container } = render(
      <RadioGroup 
        name="test-group" 
        label="Test Group" 
        options={options} 
        defaultValue="option1"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with children', async () => {
    const { container } = render(
      <RadioGroup name="test-group" label="Test Group">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with error state', async () => {
    const { container } = render(
      <RadioGroup 
        name="test-group" 
        label="Test Group" 
        error="Please select an option"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]} 
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with helper text', async () => {
    const { container } = render(
      <RadioGroup 
        name="test-group" 
        label="Test Group" 
        helperText="Please select one of the following options"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]} 
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with disabled options', async () => {
    const { container } = render(
      <RadioGroup 
        name="test-group" 
        label="Test Group" 
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2', disabled: true }
        ]} 
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with horizontal layout', async () => {
    const { container } = render(
      <RadioGroup 
        name="test-group" 
        label="Test Group" 
        layout="horizontal"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]} 
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should not have accessibility violations with different sizes', async () => {
    const { container } = render(
      <RadioGroup 
        name="test-group" 
        label="Test Group" 
        size="lg"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]} 
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});