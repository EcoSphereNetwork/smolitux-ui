import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../Button';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Button Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Button>Click me</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with primary variant', () => {
    const tree = renderer.create(<Button variant="primary">Primary Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with secondary variant', () => {
    const tree = renderer.create(<Button variant="secondary">Secondary Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with outline variant', () => {
    const tree = renderer.create(<Button variant="outline">Outline Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with ghost variant', () => {
    const tree = renderer.create(<Button variant="ghost">Ghost Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with link variant', () => {
    const tree = renderer.create(<Button variant="link">Link Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with small size', () => {
    const tree = renderer.create(<Button size="sm">Small Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with medium size', () => {
    const tree = renderer.create(<Button size="md">Medium Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with large size', () => {
    const tree = renderer.create(<Button size="lg">Large Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with extra small size', () => {
    const tree = renderer.create(<Button size="xs">Extra Small Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly when disabled', () => {
    const tree = renderer.create(<Button disabled>Disabled Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly when loading', () => {
    const tree = renderer.create(<Button loading>Loading Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with left icon', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const tree = renderer.create(<Button leftIcon={leftIcon}>Button with Left Icon</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with right icon', () => {
    const rightIcon = <span data-testid="right-icon">→</span>;
    const tree = renderer.create(<Button rightIcon={rightIcon}>Button with Right Icon</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with both icons', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const rightIcon = <span data-testid="right-icon">→</span>;
    const tree = renderer.create(
      <Button leftIcon={leftIcon} rightIcon={rightIcon}>
        Button with Both Icons
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with full width', () => {
    const tree = renderer.create(<Button fullWidth>Full Width Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom class name', () => {
    const tree = renderer.create(<Button className="custom-class">Button with Custom Class</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with type submit', () => {
    const tree = renderer.create(<Button type="submit">Submit Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with type reset', () => {
    const tree = renderer.create(<Button type="reset">Reset Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});