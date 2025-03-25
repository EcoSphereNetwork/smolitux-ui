import React from 'react';
import { render } from '@testing-library/react';
import { TimePicker } from '../TimePicker';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für FormControl
jest.mock('../../FormControl/FormControl', () => ({
  useFormControl: () => ({
    id: 'test-id',
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
    isRequired: false,
  }),
}));

describe('TimePicker Snapshots', () => {
  it('renders default time picker correctly', () => {
    const { asFragment } = render(<TimePicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with label correctly', () => {
    const { asFragment } = render(<TimePicker label="Time" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with helper text correctly', () => {
    const { asFragment } = render(<TimePicker helperText="Select a time" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with error message correctly', () => {
    const { asFragment } = render(<TimePicker error="Invalid time" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled time picker correctly', () => {
    const { asFragment } = render(<TimePicker disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders readonly time picker correctly', () => {
    const { asFragment } = render(<TimePicker readOnly />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with 24h format correctly', () => {
    const { asFragment } = render(<TimePicker format="24h" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with 12h format correctly', () => {
    const { asFragment } = render(<TimePicker format="12h" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with seconds correctly', () => {
    const { asFragment } = render(<TimePicker hideSeconds={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker without seconds correctly', () => {
    const { asFragment } = render(<TimePicker hideSeconds />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with value as string correctly', () => {
    const { asFragment } = render(<TimePicker value="14:30" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with value as object correctly', () => {
    const { asFragment } = render(<TimePicker value={{ hours: 14, minutes: 30 }} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with value in 12h format correctly', () => {
    const { asFragment } = render(<TimePicker value="14:30" format="12h" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with value and seconds correctly', () => {
    const { asFragment } = render(<TimePicker value={{ hours: 14, minutes: 30, seconds: 45 }} hideSeconds={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with custom className correctly', () => {
    const { asFragment } = render(<TimePicker className="custom-time-picker" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with custom placeholder correctly', () => {
    const { asFragment } = render(<TimePicker placeholder="Enter time" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with open dropdown correctly', () => {
    const { asFragment } = render(<TimePicker defaultOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders time picker with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(<TimePicker size={size as any} />);
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`TimePicker with size ${size}`);
    });
  });

  it('renders time picker with different variants correctly', () => {
    const variants = ['outline', 'filled', 'flushed', 'unstyled'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(<TimePicker variant={variant as any} />);
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`TimePicker with variant ${variant}`);
    });
  });

  it('renders time picker with different color schemes correctly', () => {
    const colorSchemes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    
    const fragments = colorSchemes.map(colorScheme => {
      const { asFragment } = render(<TimePicker colorScheme={colorScheme as any} />);
      return { colorScheme, fragment: asFragment() };
    });
    
    fragments.forEach(({ colorScheme, fragment }) => {
      expect(fragment).toMatchSnapshot(`TimePicker with color scheme ${colorScheme}`);
    });
  });

  it('renders time picker with all features enabled correctly', () => {
    const { asFragment } = render(
      <TimePicker 
        label="Time"
        helperText="Select a time"
        value={{ hours: 14, minutes: 30, seconds: 45 }}
        format="12h"
        hideSeconds={false}
        size="lg"
        variant="filled"
        colorScheme="primary"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});