import React from 'react';
import renderer from 'react-test-renderer';
import { Badge } from '../Badge';

describe('Badge Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Badge>Default</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with primary variant', () => {
    const tree = renderer.create(<Badge variant="primary">Primary</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with success variant', () => {
    const tree = renderer.create(<Badge variant="success">Success</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with warning variant', () => {
    const tree = renderer.create(<Badge variant="warning">Warning</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error variant', () => {
    const tree = renderer.create(<Badge variant="error">Error</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with info variant', () => {
    const tree = renderer.create(<Badge variant="info">Info</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with xs size', () => {
    const tree = renderer.create(<Badge size="xs">XS</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with sm size', () => {
    const tree = renderer.create(<Badge size="sm">SM</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with md size', () => {
    const tree = renderer.create(<Badge size="md">MD</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with lg size', () => {
    const tree = renderer.create(<Badge size="lg">LG</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with rounded style', () => {
    const tree = renderer.create(<Badge rounded>Rounded</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom className', () => {
    const tree = renderer.create(<Badge className="custom-class">Custom</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with icon', () => {
    const icon = <span>★</span>;
    const tree = renderer.create(<Badge icon={icon}>With Icon</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as counter with maxCount', () => {
    const tree = renderer
      .create(
        <Badge isCounter maxCount={99}>
          100
        </Badge>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly as dot without text', () => {
    const tree = renderer.create(<Badge isDot variant="warning" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with outline style', () => {
    const tree = renderer.create(<Badge outline>Outline</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom ID', () => {
    const tree = renderer.create(<Badge id="test-badge-id">Custom ID</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with multiple props combined', () => {
    const icon = <span>★</span>;
    const tree = renderer
      .create(
        <Badge
          variant="primary"
          size="lg"
          rounded
          icon={icon}
          outline
          className="custom-class"
          id="test-badge"
        >
          Combined
        </Badge>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
