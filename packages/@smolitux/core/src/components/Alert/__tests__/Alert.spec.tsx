import React from 'react';
import renderer from 'react-test-renderer';
import { Alert } from '../Alert';

describe('Alert Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Alert type="info" message="Test message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with title', () => {
    const tree = renderer.create(<Alert type="info" title="Test Title" message="Test message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with success type', () => {
    const tree = renderer.create(<Alert type="success" message="Success message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error type', () => {
    const tree = renderer.create(<Alert type="error" message="Error message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with warning type', () => {
    const tree = renderer.create(<Alert type="warning" message="Warning message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without icon', () => {
    const tree = renderer.create(<Alert type="info" message="Test message" showIcon={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with close button', () => {
    const tree = renderer.create(<Alert type="info" message="Test message" closable />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with children', () => {
    const tree = renderer.create(
      <Alert type="info" message="Test message">
        <button>Action Button</button>
      </Alert>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom className', () => {
    const tree = renderer.create(<Alert type="info" message="Test message" className="custom-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with ReactNode as message', () => {
    const tree = renderer.create(
      <Alert 
        type="info" 
        message={<span data-testid="custom-message">Custom Message</span>} 
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});