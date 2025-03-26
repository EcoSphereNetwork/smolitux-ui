import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { Option } from './Option';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  it('renders correctly with default props', () => {
    render(
      <Select>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    // Options should not be visible initially
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('displays options when clicked', () => {
    render(
      <Select>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    // Options should be visible after click
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    render(
      <Select>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);
    
    // Select should display the selected option
    expect(select).toHaveTextContent('Option 2');
    
    // Options should be hidden after selection
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <Select onChange={handleChange}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const option3 = screen.getByText('Option 3');
    fireEvent.click(option3);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 'option3');
  });

  it('renders with placeholder text', () => {
    render(
      <Select placeholder="Select an option">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('Select an option');
  });

  it('renders with default value', () => {
    render(
      <Select defaultValue="option2">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('Option 2');
  });

  it('renders with controlled value', () => {
    render(
      <Select value="option3">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('Option 3');
  });

  it('renders as disabled', () => {
    render(
      <Select disabled>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    
    // Should not open options when clicked
    fireEvent.click(select);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Select className="custom-select">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const selectContainer = screen.getByTestId('select-container');
    expect(selectContainer).toHaveClass('custom-select');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', width: '300px' };
    render(
      <Select style={customStyle}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const selectContainer = screen.getByTestId('select-container');
    expect(selectContainer).toHaveStyle('background-color: lightblue');
    expect(selectContainer).toHaveStyle('width: 300px');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Select size="sm">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    let selectContainer = screen.getByTestId('select-container');
    expect(selectContainer).toHaveClass('select-sm');
    
    rerender(
      <Select size="md">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    selectContainer = screen.getByTestId('select-container');
    expect(selectContainer).toHaveClass('select-md');
    
    rerender(
      <Select size="lg">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    selectContainer = screen.getByTestId('select-container');
    expect(selectContainer).toHaveClass('select-lg');
  });

  it('renders with label', () => {
    render(
      <Select label="Choose an option">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(
      <Select helperText="Please select one option">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    expect(screen.getByText('Please select one option')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(
      <Select error errorText="Selection is required">
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const selectContainer = screen.getByTestId('select-container');
    expect(selectContainer).toHaveClass('select-error');
    expect(screen.getByText('Selection is required')).toBeInTheDocument();
  });

  it('renders with required attribute', () => {
    render(
      <Select required>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('required');
  });

  it('renders with multiple selection', () => {
    render(
      <Select multiple>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('listbox');
    expect(select).toHaveAttribute('multiple');
    
    // Options should be visible for multiple select
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('allows multiple selections', () => {
    const handleChange = jest.fn();
    render(
      <Select multiple onChange={handleChange}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const option1 = screen.getByText('Option 1');
    const option3 = screen.getByText('Option 3');
    
    fireEvent.click(option1);
    fireEvent.click(option3);
    
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(1, expect.any(Object), ['option1']);
    expect(handleChange).toHaveBeenNthCalledWith(2, expect.any(Object), ['option1', 'option3']);
  });

  it('renders with search functionality', () => {
    render(
      <Select searchable>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
    
    // Search for "Option 2"
    fireEvent.change(searchInput, { target: { value: '2' } });
    
    // Only Option 2 should be visible
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('renders with custom option rendering', () => {
    const renderOption = (option) => (
      <div data-testid={`custom-option-${option.value}`}>
        <span>{option.label}</span>
        <span>({option.value})</span>
      </div>
    );
    
    render(
      <Select renderOption={renderOption}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    expect(screen.getByTestId('custom-option-option1')).toBeInTheDocument();
    expect(screen.getByTestId('custom-option-option2')).toBeInTheDocument();
    expect(screen.getByTestId('custom-option-option3')).toBeInTheDocument();
    
    expect(screen.getByText('(option1)')).toBeInTheDocument();
    expect(screen.getByText('(option2)')).toBeInTheDocument();
    expect(screen.getByText('(option3)')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        <Select>
          {options.map(option => (
            <Option key={option.value} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      </div>
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    // Options should be visible
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Click outside
    const outsideElement = screen.getByTestId('outside-element');
    fireEvent.mouseDown(outsideElement);
    
    // Options should be hidden
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});