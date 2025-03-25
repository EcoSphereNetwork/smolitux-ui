import React from 'react';
import { render } from '@testing-library/react';
import { RadioGroup } from '../RadioGroup';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('RadioGroup Snapshots', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  it('renders default radio group correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with selected value correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} value="option2" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with label correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} label="Test Label" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with helper text correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} helperText="Helper Text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with error message correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} error="Error Message" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} size={size as any} />);
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`RadioGroup with size ${size}`);
    });
  });

  it('renders radio group with horizontal direction correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} direction="horizontal" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with vertical direction correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} direction="vertical" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled radio group correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with individual disabled options correctly', () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ];
    
    const { asFragment } = render(<RadioGroup name="test-group" options={optionsWithDisabled} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders required radio group correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} required />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with custom className correctly', () => {
    const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} className="custom-radio-group" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders radio group with different color schemes correctly', () => {
    const colorSchemes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    
    const fragments = colorSchemes.map(colorScheme => {
      const { asFragment } = render(<RadioGroup name="test-group" options={defaultOptions} colorScheme={colorScheme as any} />);
      return { colorScheme, fragment: asFragment() };
    });
    
    fragments.forEach(({ colorScheme, fragment }) => {
      expect(fragment).toMatchSnapshot(`RadioGroup with color scheme ${colorScheme}`);
    });
  });

  it('renders radio group with all features enabled correctly', () => {
    const { asFragment } = render(
      <RadioGroup 
        name="test-group" 
        options={defaultOptions} 
        value="option1"
        label="Complete Radio Group"
        helperText="This is a helper text"
        size="lg"
        direction="horizontal"
        colorScheme="primary"
        required
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});