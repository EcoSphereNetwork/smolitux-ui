// Gemeinsame Testdaten für alle Tests

// Button-Testdaten
export const buttonTestData = {
  variants: ['primary', 'secondary', 'outline', 'ghost', 'link'] as const,
  sizes: ['xs', 'sm', 'md', 'lg'] as const,
  testText: 'Test Button',
};

// Input-Testdaten
export const inputTestData = {
  variants: ['outline', 'filled', 'unstyled'] as const,
  sizes: ['sm', 'md', 'lg'] as const,
  testPlaceholder: 'Enter text...',
  testValue: 'Test Input Value',
  testLabel: 'Test Label',
  testHelperText: 'This is a helper text',
  testErrorText: 'This field is required',
};

// Select-Testdaten
export const selectTestData = {
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ],
  sizes: ['sm', 'md', 'lg'] as const,
  testLabel: 'Test Select',
  testHelperText: 'Select an option',
  testErrorText: 'Please select an option',
};

// Card-Testdaten
export const cardTestData = {
  testTitle: 'Test Card Title',
  testContent: 'Test Card Content',
  testFooter: 'Test Card Footer',
};