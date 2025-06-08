import React from 'react';
import { render } from '@testing-library/react';
import { Slider } from '../Slider';

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

describe('Slider Snapshots', () => {
  it('renders default slider correctly', () => {
    const { asFragment } = render(<Slider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with label correctly', () => {
    const { asFragment } = render(<Slider label="Volume" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with custom min, max, and value correctly', () => {
    const { asFragment } = render(<Slider min={10} max={50} value={30} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled slider correctly', () => {
    const { asFragment } = render(<Slider disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with helper text correctly', () => {
    const { asFragment } = render(<Slider helperText="Adjust the volume" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with error state correctly', () => {
    const { asFragment } = render(<Slider error="Invalid value" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with success message correctly', () => {
    const { asFragment } = render(<Slider successMessage="Value saved" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with required state correctly', () => {
    const { asFragment } = render(<Slider required label="Required Field" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with different sizes correctly', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    const fragments = sizes.map((size) => {
      const { asFragment } = render(<Slider size={size} />);
      return { size, fragment: asFragment() };
    });

    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`Slider with size ${size}`);
    });
  });

  it('renders slider with different variants correctly', () => {
    const variants: Array<'solid' | 'outline' | 'filled' | 'minimal'> = [
      'solid',
      'outline',
      'filled',
      'minimal',
    ];

    const fragments = variants.map((variant) => {
      const { asFragment } = render(<Slider variant={variant} />);
      return { variant, fragment: asFragment() };
    });

    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`Slider with variant ${variant}`);
    });
  });

  it('renders slider with different color schemes correctly', () => {
    const colorSchemes: Array<
      'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'];

    const fragments = colorSchemes.map((colorScheme) => {
      const { asFragment } = render(<Slider colorScheme={colorScheme} value={50} />);
      return { colorScheme, fragment: asFragment() };
    });

    fragments.forEach(({ colorScheme, fragment }) => {
      expect(fragment).toMatchSnapshot(`Slider with color scheme ${colorScheme}`);
    });
  });

  it('renders slider with vertical orientation correctly', () => {
    const { asFragment } = render(<Slider orientation="vertical" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with shadow correctly', () => {
    const { asFragment } = render(<Slider shadow />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with transparent background correctly', () => {
    const { asFragment } = render(<Slider transparent />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with marks correctly', () => {
    const { asFragment } = render(
      <Slider
        showMarks
        marks={[
          { value: 0, label: 'Min' },
          { value: 50, label: '50%' },
          { value: 100, label: 'Max' },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with scale correctly', () => {
    const { asFragment } = render(<Slider showScale scaleSteps={2} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with custom value format correctly', () => {
    const { asFragment } = render(
      <Slider showValue value={50} valueFormat={(value) => `${value}%`} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with different thumb shapes correctly', () => {
    const thumbShapes: Array<'circle' | 'square' | 'rectangle' | 'diamond'> = [
      'circle',
      'square',
      'rectangle',
      'diamond',
    ];

    const fragments = thumbShapes.map((thumbShape) => {
      const { asFragment } = render(<Slider thumbShape={thumbShape} />);
      return { thumbShape, fragment: asFragment() };
    });

    fragments.forEach(({ thumbShape, fragment }) => {
      expect(fragment).toMatchSnapshot(`Slider with thumb shape ${thumbShape}`);
    });
  });

  it('renders slider with different track shapes correctly', () => {
    const trackShapes: Array<'rounded' | 'square'> = ['rounded', 'square'];

    const fragments = trackShapes.map((trackShape) => {
      const { asFragment } = render(<Slider trackShape={trackShape} />);
      return { trackShape, fragment: asFragment() };
    });

    fragments.forEach(({ trackShape, fragment }) => {
      expect(fragment).toMatchSnapshot(`Slider with track shape ${trackShape}`);
    });
  });

  it('renders slider with custom thumb icon correctly', () => {
    const thumbIcon = <span data-testid="thumb-icon">●</span>;
    const { asFragment } = render(<Slider thumbIcon={thumbIcon} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders slider with highlight range correctly', () => {
    const { asFragment } = render(
      <Slider highlightRange={[20, 80]} highlightColor="rgba(0, 0, 255, 0.2)" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders range slider correctly', () => {
    const { asFragment } = render(<Slider isRange value={20} value2={80} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
