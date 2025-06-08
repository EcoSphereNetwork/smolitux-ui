import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../Button';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für setTimeout
jest.useFakeTimers();

describe('Button Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Button>Click me</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Varianten
  test('renders correctly with primary variant', () => {
    const tree = renderer.create(<Button variant="primary">Primary Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with secondary variant', () => {
    const tree = renderer.create(<Button variant="secondary">Secondary Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with success variant', () => {
    const tree = renderer.create(<Button variant="success">Success Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with danger variant', () => {
    const tree = renderer.create(<Button variant="danger">Danger Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with warning variant', () => {
    const tree = renderer.create(<Button variant="warning">Warning Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with info variant', () => {
    const tree = renderer.create(<Button variant="info">Info Button</Button>).toJSON();
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

  test('renders correctly with unstyled variant', () => {
    const tree = renderer.create(<Button variant="unstyled">Unstyled Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Größen
  test('renders correctly with extra small size', () => {
    const tree = renderer.create(<Button size="xs">Extra Small Button</Button>).toJSON();
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

  test('renders correctly with extra large size', () => {
    const tree = renderer.create(<Button size="xl">Extra Large Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Formen
  test('renders correctly with square shape', () => {
    const tree = renderer.create(<Button shape="square">Square Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with rounded shape', () => {
    const tree = renderer.create(<Button shape="rounded">Rounded Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with pill shape', () => {
    const tree = renderer.create(<Button shape="pill">Pill Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Zustände
  test('renders correctly when disabled', () => {
    const tree = renderer.create(<Button disabled>Disabled Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly when loading', () => {
    const tree = renderer.create(<Button loading>Loading Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom loading text', () => {
    const tree = renderer
      .create(
        <Button loading loadingText="Please wait...">
          Loading Button
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom loading spinner', () => {
    const customSpinner = <span data-testid="custom-spinner">⟳</span>;
    const tree = renderer
      .create(
        <Button loading loadingSpinner={customSpinner}>
          Loading Button
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with success state', () => {
    const tree = renderer.create(<Button isSuccess>Success Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error state', () => {
    const tree = renderer.create(<Button isError>Error Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with active state', () => {
    const tree = renderer.create(<Button active>Active Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Icons
  test('renders correctly with left icon', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const tree = renderer
      .create(<Button leftIcon={leftIcon}>Button with Left Icon</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with right icon', () => {
    const rightIcon = <span data-testid="right-icon">→</span>;
    const tree = renderer
      .create(<Button rightIcon={rightIcon}>Button with Right Icon</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with both icons', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const rightIcon = <span data-testid="right-icon">→</span>;
    const tree = renderer
      .create(
        <Button leftIcon={leftIcon} rightIcon={rightIcon}>
          Button with Both Icons
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as icon button', () => {
    const leftIcon = <span data-testid="icon">★</span>;
    const tree = renderer
      .create(<Button isIconButton leftIcon={leftIcon} aria-label="Icon Button" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Eigenschaften
  test('renders correctly with full width', () => {
    const tree = renderer.create(<Button fullWidth>Full Width Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with shadow', () => {
    const tree = renderer.create(<Button shadow>Shadow Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with transparent background', () => {
    const tree = renderer.create(<Button transparent>Transparent Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without hover effect', () => {
    const tree = renderer.create(<Button hoverable={false}>No Hover Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without focus effect', () => {
    const tree = renderer.create(<Button focusable={false}>No Focus Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without transition', () => {
    const tree = renderer.create(<Button transition={false}>No Transition Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without border', () => {
    const tree = renderer
      .create(
        <Button variant="outline" bordered={false}>
          No Border Button
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Button-Typen
  test('renders correctly with type submit', () => {
    const tree = renderer.create(<Button type="submit">Submit Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with type reset', () => {
    const tree = renderer.create(<Button type="reset">Reset Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as submit button', () => {
    const tree = renderer.create(<Button isSubmit>Submit Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as reset button', () => {
    const tree = renderer.create(<Button isReset>Reset Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Link-Buttons
  test('renders correctly as link', () => {
    const tree = renderer
      .create(
        <Button isLink href="https://example.com">
          Link Button
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as external link', () => {
    const tree = renderer
      .create(
        <Button isLink isExternal href="https://example.com">
          External Link Button
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as download link', () => {
    const tree = renderer
      .create(
        <Button isLink download href="https://example.com/file.pdf">
          Download Button
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Spezielle Buttons
  test('renders correctly as dropdown trigger', () => {
    const tree = renderer.create(<Button isDropdownTrigger>Dropdown Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as toggle button', () => {
    const tree = renderer.create(<Button isToggle>Toggle Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as active toggle button', () => {
    const tree = renderer
      .create(
        <Button isToggle isToggleOn>
          Toggle Button On
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Kombinationen
  test('renders correctly with custom class name', () => {
    const tree = renderer
      .create(<Button className="custom-class">Button with Custom Class</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with tooltip', () => {
    const tree = renderer
      .create(<Button tooltip="Tooltip Text">Button with Tooltip</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with multiple props combined', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const tree = renderer
      .create(
        <Button
          variant="success"
          size="lg"
          shape="pill"
          shadow
          leftIcon={leftIcon}
          fullWidth
          tooltip="Success Button"
        >
          Combined Props Button
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
