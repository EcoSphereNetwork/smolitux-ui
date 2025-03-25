import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from '../Input';

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
    isLoading: false
  })
}));

describe('Input Snapshots', () => {
  // Basis-Tests
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with value', () => {
    const tree = renderer.create(<Input value="Test Value" readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with placeholder', () => {
    const tree = renderer.create(<Input placeholder="Enter text here" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Label und Hilfetexte
  test('renders correctly with label', () => {
    const tree = renderer.create(<Input label="Username" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with helper text', () => {
    const tree = renderer.create(<Input helperText="Enter your username" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error message', () => {
    const tree = renderer.create(<Input error="Username is required" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with success message', () => {
    const tree = renderer.create(<Input successMessage="Username is available" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with hidden label', () => {
    const tree = renderer.create(<Input label="Hidden Label" hideLabel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with description for screen readers', () => {
    const tree = renderer.create(<Input description="Description for screen readers" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Zustände
  test('renders correctly when disabled', () => {
    const tree = renderer.create(<Input disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly when required', () => {
    const tree = renderer.create(<Input required />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly when readonly', () => {
    const tree = renderer.create(<Input readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with loading state', () => {
    const tree = renderer.create(<Input isLoading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with valid state', () => {
    const tree = renderer.create(<Input isValid />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with invalid state', () => {
    const tree = renderer.create(<Input isInvalid />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with success state', () => {
    const tree = renderer.create(<Input isSuccess />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Icons
  test('renders correctly with left icon', () => {
    const leftIcon = <span data-testid="left-icon">@</span>;
    const tree = renderer.create(<Input leftIcon={leftIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with right icon', () => {
    const rightIcon = <span data-testid="right-icon">✓</span>;
    const tree = renderer.create(<Input rightIcon={rightIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with both icons', () => {
    const leftIcon = <span data-testid="left-icon">@</span>;
    const rightIcon = <span data-testid="right-icon">✓</span>;
    const tree = renderer.create(<Input leftIcon={leftIcon} rightIcon={rightIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with clickable left icon', () => {
    const leftIcon = <span data-testid="left-icon">@</span>;
    const tree = renderer.create(<Input leftIcon={leftIcon} isLeftIconClickable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with clickable right icon', () => {
    const rightIcon = <span data-testid="right-icon">✓</span>;
    const tree = renderer.create(<Input rightIcon={rightIcon} isRightIconClickable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with prefix', () => {
    const prefix = <span data-testid="prefix">$</span>;
    const tree = renderer.create(<Input prefix={prefix} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with suffix', () => {
    const suffix = <span data-testid="suffix">kg</span>;
    const tree = renderer.create(<Input suffix={suffix} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Größen
  test('renders correctly with extra small size', () => {
    const tree = renderer.create(<Input size="xs" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with small size', () => {
    const tree = renderer.create(<Input size="sm" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with medium size', () => {
    const tree = renderer.create(<Input size="md" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with large size', () => {
    const tree = renderer.create(<Input size="lg" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with extra large size', () => {
    const tree = renderer.create(<Input size="xl" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Varianten
  test('renders correctly with outline variant', () => {
    const tree = renderer.create(<Input variant="outline" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with filled variant', () => {
    const tree = renderer.create(<Input variant="filled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with flushed variant', () => {
    const tree = renderer.create(<Input variant="flushed" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with unstyled variant', () => {
    const tree = renderer.create(<Input variant="unstyled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Eigenschaften
  test('renders correctly with full width', () => {
    const tree = renderer.create(<Input fullWidth />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with shadow', () => {
    const tree = renderer.create(<Input shadow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly without border', () => {
    const tree = renderer.create(<Input bordered={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly without rounded corners', () => {
    const tree = renderer.create(<Input rounded={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with transparent background', () => {
    const tree = renderer.create(<Input transparent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with counter', () => {
    const tree = renderer.create(<Input showCounter maxLength={10} value="Hello" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with progress bar', () => {
    const tree = renderer.create(<Input showProgressBar progressValue={50} progressMax={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with password toggle', () => {
    const tree = renderer.create(<Input type="password" showPasswordToggle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with clearable button', () => {
    const tree = renderer.create(<Input value="Test" isClearable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with datalist', () => {
    const tree = renderer.create(<Input list="options" datalist={['Option 1', 'Option 2', 'Option 3']} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom class name', () => {
    const tree = renderer.create(<Input className="custom-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with custom container class name', () => {
    const tree = renderer.create(<Input containerClassName="container-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with custom input container class name', () => {
    const tree = renderer.create(<Input inputContainerClassName="input-container-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with custom label class name', () => {
    const tree = renderer.create(<Input label="Label" labelClassName="label-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with custom helper text class name', () => {
    const tree = renderer.create(<Input helperText="Helper" helperTextClassName="helper-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with custom error class name', () => {
    const tree = renderer.create(<Input error="Error" errorClassName="error-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with custom success class name', () => {
    const tree = renderer.create(<Input successMessage="Success" successClassName="success-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Input-Typen
  test('renders correctly with different input types', () => {
    const types = [
      'text', 
      'password', 
      'email', 
      'number', 
      'tel', 
      'url', 
      'search', 
      'date', 
      'time', 
      'datetime-local', 
      'month', 
      'week', 
      'color'
    ];
    
    types.forEach(type => {
      const tree = renderer.create(<Input type={type} />).toJSON();
      expect(tree).toMatchSnapshot(`Input with type ${type}`);
    });
  });

  // Attribute
  test('renders correctly with id', () => {
    const tree = renderer.create(<Input id="username-input" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with name', () => {
    const tree = renderer.create(<Input name="username" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with min and max', () => {
    const tree = renderer.create(<Input type="number" min={0} max={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with step', () => {
    const tree = renderer.create(<Input type="number" step={0.5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with pattern', () => {
    const tree = renderer.create(<Input pattern="[A-Za-z]{3}" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with autocomplete', () => {
    const tree = renderer.create(<Input autocomplete="email" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with spellCheck', () => {
    const tree = renderer.create(<Input spellCheck={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with autoCapitalize', () => {
    const tree = renderer.create(<Input autoCapitalize="none" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with autoCorrect', () => {
    const tree = renderer.create(<Input autoCorrect="off" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with inputMode', () => {
    const tree = renderer.create(<Input inputMode="numeric" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  // Kombinationen
  test('renders correctly with multiple props combined', () => {
    const leftIcon = <span data-testid="left-icon">@</span>;
    const tree = renderer.create(
      <Input 
        label="Email"
        type="email"
        placeholder="name@example.com"
        helperText="We'll never share your email"
        required
        leftIcon={leftIcon}
        size="md"
        variant="outline"
        fullWidth
        shadow
        rounded
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  test('renders correctly with validation props combined', () => {
    const tree = renderer.create(
      <Input 
        label="Password"
        type="password"
        showPasswordToggle
        showCounter
        maxLength={20}
        value="password123"
        isValid
        successMessage="Strong password"
        showValidationIndicator
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});