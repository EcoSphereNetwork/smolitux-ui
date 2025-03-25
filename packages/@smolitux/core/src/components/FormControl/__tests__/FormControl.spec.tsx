import React from 'react';
import renderer from 'react-test-renderer';
import { FormControl } from '../FormControl';

describe('FormControl Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(
      <FormControl>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label', () => {
    const tree = renderer.create(
      <FormControl label="Test Label">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with helper text', () => {
    const tree = renderer.create(
      <FormControl helperText="Helper Text">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error message', () => {
    const tree = renderer.create(
      <FormControl error="Error Message">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with success message', () => {
    const tree = renderer.create(
      <FormControl successMessage="Success Message">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with required indicator', () => {
    const tree = renderer.create(
      <FormControl label="Test Label" required>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label position top', () => {
    const tree = renderer.create(
      <FormControl label="Test Label" labelPosition="top">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label position left', () => {
    const tree = renderer.create(
      <FormControl label="Test Label" labelPosition="left">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label position right', () => {
    const tree = renderer.create(
      <FormControl label="Test Label" labelPosition="right">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label position bottom', () => {
    const tree = renderer.create(
      <FormControl label="Test Label" labelPosition="bottom">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label position floating', () => {
    const tree = renderer.create(
      <FormControl label="Test Label" labelPosition="floating">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with full width', () => {
    const tree = renderer.create(
      <FormControl fullWidth>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with counter', () => {
    const tree = renderer.create(
      <FormControl showCounter counterValue={5} counterMax={10}>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with progress bar', () => {
    const tree = renderer.create(
      <FormControl showProgressBar progressValue={50} progressMax={100}>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with loading indicator', () => {
    const tree = renderer.create(
      <FormControl isLoading showLoadingIndicator>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error indicator', () => {
    const tree = renderer.create(
      <FormControl error="Error" showErrorIndicator>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with success indicator', () => {
    const tree = renderer.create(
      <FormControl isSuccess showSuccessIndicator>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with validation indicator', () => {
    const tree = renderer.create(
      <FormControl isValid showValidationIndicator>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with hidden label', () => {
    const tree = renderer.create(
      <FormControl label="Hidden Label" hideLabel>
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with description for screen readers', () => {
    const tree = renderer.create(
      <FormControl description="Description for screen readers">
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom class names', () => {
    const tree = renderer.create(
      <FormControl 
        className="custom-class"
        containerClassName="container-class"
        labelClassName="label-class"
        helperTextClassName="helper-class"
        errorClassName="error-class"
        successClassName="success-class"
        fieldContainerClassName="field-container-class"
        label="Label"
        helperText="Helper"
      >
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with tooltip', () => {
    const tree = renderer.create(
      <FormControl 
        tooltip="Tooltip Text"
        labelTooltip="Label Tooltip"
      >
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with multiple props combined', () => {
    const tree = renderer.create(
      <FormControl 
        label="Combined Label"
        helperText="Helper Text"
        required
        labelPosition="floating"
        fullWidth
        size="lg"
        variant="filled"
        showCounter
        counterValue={5}
        counterMax={10}
        showProgressBar
        progressValue={50}
        progressMax={100}
        isLoading
        showLoadingIndicator
        tooltip="Tooltip Text"
      >
        <input />
      </FormControl>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});