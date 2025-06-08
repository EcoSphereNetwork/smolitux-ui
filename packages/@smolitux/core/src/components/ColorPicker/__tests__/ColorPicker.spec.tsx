import React from 'react';
import { render } from '@testing-library/react';
import { ColorPicker } from '../ColorPicker';

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

describe('ColorPicker Snapshots', () => {
  it('renders default color picker correctly', () => {
    const { asFragment } = render(<ColorPicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with label correctly', () => {
    const { asFragment } = render(<ColorPicker label="Color" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with helper text correctly', () => {
    const { asFragment } = render(<ColorPicker helperText="Choose a color" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with error message correctly', () => {
    const { asFragment } = render(<ColorPicker error="Invalid color" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled color picker correctly', () => {
    const { asFragment } = render(<ColorPicker disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders readonly color picker correctly', () => {
    const { asFragment } = render(<ColorPicker readOnly />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with value correctly', () => {
    const { asFragment } = render(<ColorPicker value="#ff0000" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with preset colors correctly', () => {
    const presetColors = ['#ff0000', '#00ff00', '#0000ff'];
    const { asFragment } = render(<ColorPicker presetColors={presetColors} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with different formats correctly', () => {
    const formats = ['hex', 'rgb', 'hsl'];

    const fragments = formats.map((format) => {
      const { asFragment } = render(<ColorPicker value="#ff0000" format={format as any} />);
      return { format, fragment: asFragment() };
    });

    fragments.forEach(({ format, fragment }) => {
      expect(fragment).toMatchSnapshot(`ColorPicker with format ${format}`);
    });
  });

  it('renders color picker with alpha channel correctly', () => {
    const { asFragment } = render(<ColorPicker allowAlpha />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];

    const fragments = sizes.map((size) => {
      const { asFragment } = render(<ColorPicker size={size as any} />);
      return { size, fragment: asFragment() };
    });

    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`ColorPicker with size ${size}`);
    });
  });

  it('renders color picker with fullWidth correctly', () => {
    const { asFragment } = render(<ColorPicker fullWidth />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with custom className correctly', () => {
    const { asFragment } = render(<ColorPicker className="custom-color-picker" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with open popup correctly', () => {
    const { asFragment } = render(<ColorPicker defaultOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders color picker with different popup positions correctly', () => {
    const positions = ['bottom', 'top', 'left', 'right'];

    const fragments = positions.map((position) => {
      const { asFragment } = render(<ColorPicker popupPosition={position as any} />);
      return { position, fragment: asFragment() };
    });

    fragments.forEach(({ position, fragment }) => {
      expect(fragment).toMatchSnapshot(`ColorPicker with popup position ${position}`);
    });
  });

  it('renders color picker with all features enabled correctly', () => {
    const { asFragment } = render(
      <ColorPicker
        label="Color"
        helperText="Choose a color"
        value="#ff0000"
        presetColors={['#ff0000', '#00ff00', '#0000ff']}
        allowAlpha
        size="lg"
        fullWidth
        format="rgb"
        popupPosition="bottom"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
