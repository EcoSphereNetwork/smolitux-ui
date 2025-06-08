import React from 'react';
import { render } from '@testing-library/react';
import { Switch } from '../Switch';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für den FormControl-Context
jest.mock('../../FormControl', () => ({
  useFormControl: () => ({
    disabled: false,
    required: false,
    hasError: false,
    id: undefined,
    label: undefined,
    name: undefined,
    size: 'md',
    readOnly: false,
    isFocused: false,
    isValid: false,
    isInvalid: false,
    isSuccess: false,
    isLoading: false,
  }),
}));

describe('Switch Snapshots', () => {
  it('renders default switch correctly', () => {
    const { asFragment } = render(<Switch />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with label correctly', () => {
    const { asFragment } = render(<Switch label="Toggle me" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with helper text correctly', () => {
    const { asFragment } = render(<Switch helperText="This is a helper text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with error message correctly', () => {
    const { asFragment } = render(<Switch error="This is an error message" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with success message correctly', () => {
    const { asFragment } = render(<Switch successMessage="This is a success message" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders checked switch correctly', () => {
    const { asFragment } = render(<Switch checked />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled switch correctly', () => {
    const { asFragment } = render(<Switch disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with different sizes correctly', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    const fragments = sizes.map((size) => {
      const { asFragment } = render(<Switch size={size} />);
      return { size, fragment: asFragment() };
    });

    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`Switch with size ${size}`);
    });
  });

  it('renders switch with different color schemes correctly', () => {
    const colorSchemes: Array<
      'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'];

    const fragments = colorSchemes.map((colorScheme) => {
      const { asFragment } = render(<Switch colorScheme={colorScheme} checked />);
      return { colorScheme, fragment: asFragment() };
    });

    fragments.forEach(({ colorScheme, fragment }) => {
      expect(fragment).toMatchSnapshot(`Switch with color scheme ${colorScheme}`);
    });
  });

  it('renders switch with different variants correctly', () => {
    const variants: Array<'solid' | 'outline' | 'filled' | 'minimal'> = [
      'solid',
      'outline',
      'filled',
      'minimal',
    ];

    const fragments = variants.map((variant) => {
      const { asFragment } = render(<Switch variant={variant} />);
      return { variant, fragment: asFragment() };
    });

    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Switch with variant ${variant}`);
    });
  });

  it('renders switch with label on the left correctly', () => {
    const { asFragment } = render(<Switch label="Left Label" labelPosition="left" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with label on the right correctly', () => {
    const { asFragment } = render(<Switch label="Right Label" labelPosition="right" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with different label alignments correctly', () => {
    const alignments: Array<'start' | 'center' | 'end'> = ['start', 'center', 'end'];

    const fragments = alignments.map((align) => {
      const { asFragment } = render(
        <Switch label="Aligned Label" labelPosition="left" labelAlign={align} />
      );
      return { align, fragment: asFragment() };
    });

    fragments.forEach(({ align, fragment }) => {
      expect(fragment).toMatchSnapshot(`Switch with label alignment ${align}`);
    });
  });

  it('renders switch with icons correctly', () => {
    const { asFragment } = render(<Switch icons />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with on/off text correctly', () => {
    const { asFragment } = render(<Switch showText />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with custom on/off text correctly', () => {
    const { asFragment } = render(<Switch showText onText="YES" offText="NO" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with iOS style correctly', () => {
    const { asFragment } = render(<Switch isIOS />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with Android style correctly', () => {
    const { asFragment } = render(<Switch isAndroid />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with Material style correctly', () => {
    const { asFragment } = render(<Switch isMaterial />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with loading state correctly', () => {
    const { asFragment } = render(<Switch isLoading />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with custom thumb component correctly', () => {
    const customThumb = <div data-testid="custom-thumb">Custom</div>;
    const { asFragment } = render(<Switch thumbComponent={customThumb} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders switch with custom track component correctly', () => {
    const customTrack = <div data-testid="custom-track">Custom</div>;
    const { asFragment } = render(<Switch trackComponent={customTrack} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
