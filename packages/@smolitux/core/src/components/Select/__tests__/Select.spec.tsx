import React from 'react';
import renderer from 'react-test-renderer';
import { Select } from '../Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true }
];

const mockGroupedOptions = [
  { value: 'option1', label: 'Option 1', group: 'Group 1' },
  { value: 'option2', label: 'Option 2', group: 'Group 1' },
  { value: 'option3', label: 'Option 3', group: 'Group 2' }
];

const mockOptionsWithDescriptions = [
  { value: 'option1', label: 'Option 1', description: 'Description 1' },
  { value: 'option2', label: 'Option 2', description: 'Description 2' }
];

describe('Select Snapshots', () => {
  test('renders correctly with default props', () => {
    const tree = renderer.create(<Select options={mockOptions} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with label', () => {
    const tree = renderer.create(<Select options={mockOptions} label="Test Label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with helper text', () => {
    const tree = renderer.create(<Select options={mockOptions} helperText="Helper Text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error message', () => {
    const tree = renderer.create(<Select options={mockOptions} error="Error Message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with small size', () => {
    const tree = renderer.create(<Select options={mockOptions} size="sm" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with large size', () => {
    const tree = renderer.create(<Select options={mockOptions} size="lg" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with filled variant', () => {
    const tree = renderer.create(<Select options={mockOptions} variant="filled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with outlined variant', () => {
    const tree = renderer.create(<Select options={mockOptions} variant="outlined" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with unstyled variant', () => {
    const tree = renderer.create(<Select options={mockOptions} variant="unstyled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with full width', () => {
    const tree = renderer.create(<Select options={mockOptions} fullWidth />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with left icon', () => {
    const leftIcon = <span>★</span>;
    const tree = renderer.create(<Select options={mockOptions} leftIcon={leftIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with right icon', () => {
    const rightIcon = <span>★</span>;
    const tree = renderer.create(<Select options={mockOptions} rightIcon={rightIcon} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with placeholder', () => {
    const tree = renderer.create(<Select options={mockOptions} placeholder="Select an option" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with required indicator', () => {
    const tree = renderer.create(<Select options={mockOptions} label="Test Label" required />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in disabled state', () => {
    const tree = renderer.create(<Select options={mockOptions} disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in readonly state', () => {
    const tree = renderer.create(<Select options={mockOptions} readOnly />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with grouped options', () => {
    const tree = renderer.create(<Select options={mockGroupedOptions} groupOptions />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with option descriptions', () => {
    const tree = renderer.create(<Select options={mockOptionsWithDescriptions} showOptionDescription />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with tooltip', () => {
    const tree = renderer.create(<Select options={mockOptions} tooltip="Tooltip Text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom class names', () => {
    const tree = renderer.create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with shadow', () => {
    const tree = renderer.create(<Select options={mockOptions} shadow />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without rounded corners', () => {
    const tree = renderer.create(<Select options={mockOptions} rounded={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without border', () => {
    const tree = renderer.create(<Select options={mockOptions} bordered={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with transparent background', () => {
    const tree = renderer.create(<Select options={mockOptions} transparent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without hover effect', () => {
    const tree = renderer.create(<Select options={mockOptions} hoverable={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without focus effect', () => {
    const tree = renderer.create(<Select options={mockOptions} focusable={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without transition effect', () => {
    const tree = renderer.create(<Select options={mockOptions} transition={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with multiple props combined', () => {
    const leftIcon = <span>★</span>;
    const tree = renderer.create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});