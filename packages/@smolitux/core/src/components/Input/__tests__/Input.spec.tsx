import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from '../Input';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Input Snapshots', () => {
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

  test('renders correctly when disabled', () => {
    const tree = renderer.create(<Input disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly when required', () => {
    const tree = renderer.create(<Input required />).toJSON();
    expect(tree).toMatchSnapshot();
  });

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

  test('renders correctly with outline variant', () => {
    const tree = renderer.create(<Input variant="outline" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with filled variant', () => {
    const tree = renderer.create(<Input variant="filled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with unstyled variant', () => {
    const tree = renderer.create(<Input variant="unstyled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with full width', () => {
    const tree = renderer.create(<Input fullWidth />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom class name', () => {
    const tree = renderer.create(<Input className="custom-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with different input types', () => {
    const types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'];
    
    types.forEach(type => {
      const tree = renderer.create(<Input type={type} />).toJSON();
      expect(tree).toMatchSnapshot(`Input with type ${type}`);
    });
  });

  test('renders correctly with id', () => {
    const tree = renderer.create(<Input id="username-input" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with name', () => {
    const tree = renderer.create(<Input name="username" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});