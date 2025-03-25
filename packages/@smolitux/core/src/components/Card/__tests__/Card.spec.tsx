import React from 'react';
import renderer from 'react-test-renderer';
import { Card } from '../Card';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

describe('Card Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Card>Card Content</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom className', () => {
    const tree = renderer.create(<Card className="custom-class">Card Content</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with elevated variant', () => {
    const tree = renderer.create(<Card variant="elevated">Elevated Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with outlined variant', () => {
    const tree = renderer.create(<Card variant="outlined">Outlined Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with flat variant', () => {
    const tree = renderer.create(<Card variant="flat">Flat Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with no padding', () => {
    const tree = renderer.create(<Card padding="none">No Padding Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with small padding', () => {
    const tree = renderer.create(<Card padding="small">Small Padding Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with medium padding', () => {
    const tree = renderer.create(<Card padding="medium">Medium Padding Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with large padding', () => {
    const tree = renderer.create(<Card padding="large">Large Padding Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with no border radius', () => {
    const tree = renderer.create(<Card borderRadius="none">No Border Radius Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with small border radius', () => {
    const tree = renderer.create(<Card borderRadius="small">Small Border Radius Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with medium border radius', () => {
    const tree = renderer.create(<Card borderRadius="medium">Medium Border Radius Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with large border radius', () => {
    const tree = renderer.create(<Card borderRadius="large">Large Border Radius Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with full border radius', () => {
    const tree = renderer.create(<Card borderRadius="full">Full Border Radius Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with hover effect', () => {
    const tree = renderer.create(<Card hoverable>Hoverable Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom width and height', () => {
    const tree = renderer.create(<Card width="300px" height="200px">Custom Size Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom background color', () => {
    const tree = renderer.create(<Card backgroundColor="bg-blue-100">Blue Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom border color', () => {
    const tree = renderer.create(<Card borderColor="border-red-500">Red Border Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with header and footer', () => {
    const tree = renderer.create(
      <Card
        header={<div data-testid="card-header">Card Header</div>}
        footer={<div data-testid="card-footer">Card Footer</div>}
      >
        Card Body
      </Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with onClick handler', () => {
    const tree = renderer.create(<Card onClick={() => {}}>Clickable Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});