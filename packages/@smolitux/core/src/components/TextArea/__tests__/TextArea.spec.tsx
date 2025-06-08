import React from 'react';
import { render } from '@testing-library/react';
import { TextArea } from '../TextArea';

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

describe('TextArea Snapshots', () => {
  it('renders default textarea correctly', () => {
    const { asFragment } = render(<TextArea />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with label correctly', () => {
    const { asFragment } = render(<TextArea label="Description" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with helper text correctly', () => {
    const { asFragment } = render(<TextArea helperText="Enter a description" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with error message correctly', () => {
    const { asFragment } = render(<TextArea error="Description is required" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with placeholder correctly', () => {
    const { asFragment } = render(<TextArea placeholder="Enter description here" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with different sizes correctly', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    const fragments = sizes.map((size) => {
      const { asFragment } = render(<TextArea size={size} />);
      return { size, fragment: asFragment() };
    });

    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`TextArea with size ${size}`);
    });
  });

  it('renders textarea with different variants correctly', () => {
    const variants: Array<'outline' | 'filled' | 'unstyled'> = [
      'outline',
      'filled',
      'unstyled',
    ];

    const fragments = variants.map((variant) => {
      const { asFragment } = render(<TextArea variant={variant} />);
      return { variant, fragment: asFragment() };
    });

    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`TextArea with variant ${variant}`);
    });
  });

  it('renders textarea with fullWidth correctly', () => {
    const { asFragment } = render(<TextArea fullWidth />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with specified number of rows correctly', () => {
    const { asFragment } = render(<TextArea rows={5} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with maxLength correctly', () => {
    const { asFragment } = render(<TextArea maxLength={100} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with character count correctly', () => {
    const { asFragment } = render(<TextArea showCount maxLength={100} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with autoResize correctly', () => {
    const { asFragment } = render(<TextArea autoResize />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with value correctly', () => {
    const { asFragment } = render(<TextArea value="Sample text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled textarea correctly', () => {
    const { asFragment } = render(<TextArea disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders readonly textarea correctly', () => {
    const { asFragment } = render(<TextArea readOnly />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders required textarea correctly', () => {
    const { asFragment } = render(<TextArea required />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with custom className correctly', () => {
    const { asFragment } = render(<TextArea className="custom-textarea" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with custom styles correctly', () => {
    const { asFragment } = render(<TextArea style={{ color: 'red' }} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders textarea with all features enabled correctly', () => {
    const { asFragment } = render(
      <TextArea
        label="Description"
        helperText="Enter a description"
        placeholder="Enter description here"
        size="lg"
        variant="filled"
        fullWidth
        autoResize
        rows={5}
        maxLength={100}
        showCount
        className="custom-textarea"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
