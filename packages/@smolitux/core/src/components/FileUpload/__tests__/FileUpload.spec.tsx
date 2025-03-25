import React from 'react';
import { render } from '@testing-library/react';
import { FileUpload } from '../FileUpload';

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

describe('FileUpload Snapshots', () => {
  beforeEach(() => {
    // Mock für URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('renders default file upload correctly', () => {
    const { asFragment } = render(<FileUpload />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with custom dropzone text correctly', () => {
    const { asFragment } = render(<FileUpload dropzoneText="Custom dropzone text" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with label correctly', () => {
    const { asFragment } = render(<FileUpload label="Upload Files" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with helper text correctly', () => {
    const { asFragment } = render(<FileUpload helperText="Max file size: 5MB" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with error message correctly', () => {
    const { asFragment } = render(<FileUpload error="File too large" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled file upload correctly', () => {
    const { asFragment } = render(<FileUpload disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with accept attribute correctly', () => {
    const { asFragment } = render(<FileUpload accept=".jpg,.png" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with multiple attribute correctly', () => {
    const { asFragment } = render(<FileUpload multiple />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with maxFileSize correctly', () => {
    const { asFragment } = render(<FileUpload maxFileSize={5000000} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with maxFiles correctly', () => {
    const { asFragment } = render(<FileUpload multiple maxFiles={3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with showPreviews correctly', () => {
    const { asFragment } = render(<FileUpload showPreviews />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    const fragments = sizes.map(size => {
      const { asFragment } = render(<FileUpload size={size as any} />);
      return { size, fragment: asFragment() };
    });
    
    fragments.forEach(({ size, fragment }) => {
      expect(fragment).toMatchSnapshot(`FileUpload with size ${size}`);
    });
  });

  it('renders file upload with fullWidth correctly', () => {
    const { asFragment } = render(<FileUpload fullWidth />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with custom className correctly', () => {
    const { asFragment } = render(<FileUpload className="custom-file-upload" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file upload with different variants correctly', () => {
    const variants = ['outline', 'filled', 'flushed', 'unstyled'];
    
    const fragments = variants.map(variant => {
      const { asFragment } = render(<FileUpload variant={variant as any} />);
      return { variant, fragment: asFragment() };
    });
    
    fragments.forEach(({ variant, fragment }) => {
      expect(fragment).toMatchSnapshot(`FileUpload with variant ${variant}`);
    });
  });

  it('renders file upload with different color schemes correctly', () => {
    const colorSchemes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    
    const fragments = colorSchemes.map(colorScheme => {
      const { asFragment } = render(<FileUpload colorScheme={colorScheme as any} />);
      return { colorScheme, fragment: asFragment() };
    });
    
    fragments.forEach(({ colorScheme, fragment }) => {
      expect(fragment).toMatchSnapshot(`FileUpload with color scheme ${colorScheme}`);
    });
  });

  it('renders file upload with all features enabled correctly', () => {
    const { asFragment } = render(
      <FileUpload 
        label="Upload Files"
        helperText="Max file size: 5MB"
        dropzoneText="Drop files here"
        accept=".jpg,.png"
        multiple
        maxFileSize={5000000}
        maxFiles={5}
        showPreviews
        size="lg"
        fullWidth
        colorScheme="primary"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});