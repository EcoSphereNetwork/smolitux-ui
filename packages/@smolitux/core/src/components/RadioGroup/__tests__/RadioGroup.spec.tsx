import React from 'react';
import { render } from '@testing-library/react';
import { RadioGroup } from '../RadioGroup';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('RadioGroup Snapshots', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  it('renders default radio group correctly', () => {
    const { asFragment } = render(
      <RadioGroup name="test-group" options={options} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with label correctly', () => {
    const { asFragment } = render(
      <RadioGroup name="test-group" options={options} label="Select an option" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with helper text correctly', () => {
    const { asFragment } = render(
      <RadioGroup name="test-group" options={options} helperText="Please select one option" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with error message correctly', () => {
    const { asFragment } = render(
      <RadioGroup name="test-group" options={options} error="Selection is required" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with selected value correctly', () => {
    const { asFragment } = render(
      <RadioGroup name="test-group" options={options} value="option2" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with different directions correctly', () => {
    const directions = ['horizontal', 'vertical'];
    
    const fragments = directions.map(direction => {
      const { asFragment } = render(
        <RadioGroup name="test-group" options={options} direction={direction as any} />
      );
      return { direction, fragment: asFragment() };
    });
    
    fragments.forEach(({ direction, fragment }) => {
      expect(fragment).toMatchSnapshot(`RadioGroup with direction ${direction}`);
    });
  });

  it('renders radio group with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(
        <RadioGroup name="test-group" options={options} size={size as any} />
      );
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`RadioGroup with size ${size}`);
    });
  });

  it('renders disabled radio group correctly', () => {
    const { asFragment } = render(
      <RadioGroup name="test-group" options={options} disabled />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with disabled options correctly', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ];
    
    const { asFragment } = render(
      <RadioGroup name="test-group" options={optionsWithDisabled} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with custom className correctly', () => {
    const { asFragment } = render(
      <RadioGroup 
        name="test-group" 
        options={options} 
        className="custom-radio-group"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with all features enabled correctly', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ];
    
    const { asFragment } = render(
      <RadioGroup 
        name="test-group" 
        options={optionsWithDisabled}
        label="Select an option"
        helperText="Please select one option"
        value="option1"
        size="lg"
        direction="horizontal"
        className="custom-radio-group"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});