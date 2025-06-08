import React from 'react';
import { render } from '@testing-library/react';
import { DatePicker } from '../DatePicker';

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

describe('DatePicker Snapshots', () => {
  beforeEach(() => {
    // Mock für Date
    const mockDate = new Date(2023, 0, 15); // 15. Januar 2023
    jest.spyOn(global, 'Date').mockImplementation((args) => {
      if (args) {
        return new Date(args);
      }
      return mockDate;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders default date picker correctly', () => {
    const { asFragment } = render(<DatePicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with custom placeholder correctly', () => {
    const { asFragment } = render(<DatePicker placeholder="Select date" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with label correctly', () => {
    const { asFragment } = render(<DatePicker label="Date" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with helper text correctly', () => {
    const { asFragment } = render(<DatePicker helperText="Select a date" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with error message correctly', () => {
    const { asFragment } = render(<DatePicker error="Invalid date" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled date picker correctly', () => {
    const { asFragment } = render(<DatePicker disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders readonly date picker correctly', () => {
    const { asFragment } = render(<DatePicker readOnly />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with open calendar correctly', () => {
    const { asFragment } = render(<DatePicker defaultOpen />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with selected date correctly', () => {
    const { asFragment } = render(<DatePicker value={new Date(2023, 0, 20)} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with different date formats correctly', () => {
    const formats = ['yyyy-MM-dd', 'dd.MM.yyyy', 'MM/dd/yyyy'];

    const fragments = formats.map((format) => {
      const { asFragment } = render(<DatePicker value={new Date(2023, 0, 20)} format={format} />);
      return { format, fragment: asFragment() };
    });

    fragments.forEach(({ format, fragment }) => {
      expect(fragment).toMatchSnapshot(`DatePicker with format ${format}`);
    });
  });

  it('renders date picker with min date correctly', () => {
    const { asFragment } = render(<DatePicker minDate={new Date(2023, 0, 10)} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with max date correctly', () => {
    const { asFragment } = render(<DatePicker maxDate={new Date(2023, 0, 20)} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];

    const fragments = sizes.map((size) => {
      const { asFragment } = render(<DatePicker size={size as any} />);
      return { size, fragment: asFragment() };
    });

    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`DatePicker with size ${size}`);
    });
  });

  it('renders date picker with fullWidth correctly', () => {
    const { asFragment } = render(<DatePicker fullWidth />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with custom className correctly', () => {
    const { asFragment } = render(<DatePicker className="custom-date-picker" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders date picker with different variants correctly', () => {
    const variants = ['outline', 'filled', 'unstyled'];

    const fragments = variants.map((variant) => {
      const { asFragment } = render(<DatePicker variant={variant as any} />);
      return { variant, fragment: asFragment() };
    });

    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`DatePicker with variant ${variant}`);
    });
  });

  it('renders date picker with different color schemes correctly', () => {
    const colorSchemes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

    const fragments = colorSchemes.map((colorScheme) => {
      const { asFragment } = render(<DatePicker colorScheme={colorScheme as any} />);
      return { colorScheme, fragment: asFragment() };
    });

    fragments.forEach(({ colorScheme, fragment }) => {
      expect(fragment).toMatchSnapshot(`DatePicker with color scheme ${colorScheme}`);
    });
  });

  it('renders date picker with different calendar positions correctly', () => {
    const positions = ['bottom', 'top', 'left', 'right'];

    const fragments = positions.map((position) => {
      const { asFragment } = render(<DatePicker calendarPosition={position as any} />);
      return { position, fragment: asFragment() };
    });

    fragments.forEach(({ position, fragment }) => {
      expect(fragment).toMatchSnapshot(`DatePicker with calendar position ${position}`);
    });
  });

  it('renders date picker with all features enabled correctly', () => {
    const { asFragment } = render(
      <DatePicker
        label="Date"
        helperText="Select a date"
        placeholder="Select date"
        value={new Date(2023, 0, 20)}
        format="dd.MM.yyyy"
        minDate={new Date(2023, 0, 1)}
        maxDate={new Date(2023, 1, 28)}
        size="lg"
        variant="filled"
        colorScheme="primary"
        fullWidth
        calendarPosition="bottom"
        className="custom-date-picker"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
