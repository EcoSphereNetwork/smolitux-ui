import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MediaUploader } from '../MediaUploader';

// Extend Jest matchers with accessibility checks
expect.extend(toHaveNoViolations);

// Mock the Button component from @smolitux/core
jest.mock('@smolitux/core', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  ProgressBar: ({ value, ...props }: { value: number }) => (
    <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} {...props}>
      {value}%
    </div>
  ),
}));

describe('MediaUploader Accessibility', () => {
  const mockOnUpload = jest.fn().mockResolvedValue(undefined);

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <MediaUploader onUpload={mockOnUpload} aria-label="Upload media files" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have appropriate ARIA attributes', () => {
    const { container } = render(
      <MediaUploader onUpload={mockOnUpload} aria-label="Upload media files" />
    );

    const uploader = container.querySelector('[data-testid="media-uploader"]');
    expect(uploader).toHaveAttribute('aria-label', 'Upload media files');
  });

  test('should have accessible file input', () => {
    const { container } = render(<MediaUploader onUpload={mockOnUpload} />);

    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('aria-label', 'File input');
  });

  test('should have accessible buttons', () => {
    const { getByText } = render(<MediaUploader onUpload={mockOnUpload} />);

    const browseButton = getByText('Browse Files');
    expect(browseButton).toBeInTheDocument();
    expect(browseButton).toHaveAttribute('role', 'button');
  });

  test('should have accessible error messages', () => {
    const { container, rerender } = render(<MediaUploader onUpload={mockOnUpload} />);

    // Rerender with error state
    rerender(<MediaUploader onUpload={mockOnUpload} error="Invalid file type" />);

    const errorMessage = container.querySelector('.error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  test('should have accessible progress indicator', async () => {
    const { container, rerender } = render(<MediaUploader onUpload={mockOnUpload} />);

    // Rerender with uploading state
    rerender(<MediaUploader onUpload={mockOnUpload} uploading={true} progress={50} />);

    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  test('should have accessible file list', () => {
    const { container } = render(
      <MediaUploader
        onUpload={mockOnUpload}
        files={[new File(['content'], 'test.mp4', { type: 'video/mp4' })]}
      />
    );

    const fileList = container.querySelector('.file-list');
    expect(fileList).toBeInTheDocument();
    expect(fileList).toHaveAttribute('role', 'list');

    const fileItem = container.querySelector('.file-item');
    expect(fileItem).toBeInTheDocument();
    expect(fileItem).toHaveAttribute('role', 'listitem');
  });

  test('should have accessible drag and drop area', () => {
    const { container } = render(<MediaUploader onUpload={mockOnUpload} />);

    const dropzone = container.querySelector('[data-testid="media-uploader"]');
    expect(dropzone).toBeInTheDocument();
    expect(dropzone).toHaveAttribute('aria-dropeffect', 'copy');
  });
});
