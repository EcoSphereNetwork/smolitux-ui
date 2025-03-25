// Gemeinsame Testdaten für die gesamte Testsuite

export const mockButtonProps = {
  variant: 'primary' as const,
  size: 'md' as const,
  fullWidth: false,
  loading: false,
  disabled: false,
  onClick: jest.fn(),
};

export const mockInputProps = {
  label: 'Test Label',
  helperText: 'Helper Text',
  error: '',
  size: 'md' as const,
  variant: 'outline' as const,
  fullWidth: false,
  disabled: false,
  onChange: jest.fn(),
};

export const mockSelectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

export const mockCardProps = {
  title: 'Card Title',
  footer: <div>Footer Content</div>,
  noPadding: false,
  hoverable: true,
  bordered: true,
};