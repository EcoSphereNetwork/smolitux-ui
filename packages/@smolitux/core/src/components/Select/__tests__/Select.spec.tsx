import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@smolitux/core';
import { Select } from '../Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

const mockGroupedOptions = [
  { value: 'option1', label: 'Option 1', group: 'Group 1' },
  { value: 'option2', label: 'Option 2', group: 'Group 1' },
  { value: 'option3', label: 'Option 3', group: 'Group 2' },
];

const mockOptionsWithDescriptions = [
  { value: 'option1', label: 'Option 1', description: 'Description 1' },
  { value: 'option2', label: 'Option 2', description: 'Description 2' },
];

describe('Select Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} label="Test Label" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with helper text', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Select options={mockOptions} helperText="Helper Text" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error message', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} error="Error Message" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with small size', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} size="sm" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with large size', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} size="lg" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with filled variant', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} variant="filled" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with outlined variant', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} variant="outlined" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with unstyled variant', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} variant="unstyled" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with full width', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} fullWidth />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with left icon', () => {
    const leftIcon = <span>★</span>;
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} leftIcon={leftIcon} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with right icon', () => {
    const rightIcon = <span>★</span>;
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} rightIcon={rightIcon} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with placeholder', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Select options={mockOptions} placeholder="Select an option" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with required indicator', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Select options={mockOptions} label="Test Label" required />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in disabled state', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} disabled />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in readonly state', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} readOnly />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with grouped options', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockGroupedOptions} groupOptions />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with option descriptions', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Select options={mockOptionsWithDescriptions} showOptionDescription />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with tooltip', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} tooltip="Tooltip Text" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom class names', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Select
            options={mockOptions}
            className="custom-class"
            containerClassName="container-class"
            labelClassName="label-class"
            helperTextClassName="helper-class"
            errorClassName="error-class"
            label="Label"
            helperText="Helper"
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with shadow', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} shadow />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without rounded corners', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} rounded={false} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without border', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} bordered={false} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with transparent background', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} transparent />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without hover effect', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} hoverable={false} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without focus effect', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} focusable={false} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without transition effect', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Select options={mockOptions} transition={false} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with multiple props combined', () => {
    const leftIcon = <span>★</span>;
    const tree = renderer
      .create(
        <ThemeProvider>
          <Select
            options={mockOptions}
            label="Combined Select"
            helperText="Helper Text"
            size="lg"
            variant="filled"
            fullWidth
            leftIcon={leftIcon}
            placeholder="Select an option"
            required
            shadow
            rounded
            bordered
            hoverable
            focusable
            transition
            tooltip="Tooltip Text"
            className="custom-class"
            containerClassName="container-class"
            labelClassName="label-class"
            helperTextClassName="helper-class"
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
