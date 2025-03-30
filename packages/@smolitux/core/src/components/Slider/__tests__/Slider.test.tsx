import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from '../Slider';

// Mock für ThemeProvider
jest.mock('@smolitux/theme', () => ({
  useTheme: jest.fn(() => ({ themeMode: 'light' })),
}));

// Mock für den FormControl-Context
jest.mock('../../FormControl', () => ({
  useFormControl: () => ({
    disabled: false,
    required: false,
    hasError: false,
    id: undefined,
    label: undefined,
    name: undefined,
    size: 'md',
    readOnly: false,
    isFocused: false,
    isValid: false,
    isInvalid: false,
    isSuccess: false,
    isLoading: false
  })
}));

// Mock für getBoundingClientRect
const mockGetBoundingClientRect = () => {
  return {
    width: 100,
    height: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: () => {}
  };
};

Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(mockGetBoundingClientRect);

describe('Slider', () => {
  // Basis-Tests
  test('renders correctly with default props', () => {
    render(<Slider />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders.length).toBeGreaterThan(0);
    expect(sliders[0]).toHaveAttribute('aria-valuemin', '0');
    expect(sliders[0]).toHaveAttribute('aria-valuemax', '100');
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '0');
  });

  test('renders with label', () => {
    render(<Slider label="Volume" />);
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  test('renders with custom min, max, and value', () => {
    render(<Slider min={10} max={50} value={30} />);
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuemin', '10');
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuemax', '50');
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuenow', '30');
  });

  test('handles change events', async () => {
    const handleChange = jest.fn();
    render(<Slider onChange={handleChange} min={0} max={100} />);
    
    // Simuliere einen Klick auf den Track
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    if (track) {
      fireEvent.click(track, { clientX: 50, clientY: 5 });
      expect(handleChange).toHaveBeenCalledWith(50);
    }
  });

  // Zustände
  test('renders disabled state correctly', () => {
    render(<Slider disabled />);
    expect(screen.getAllByRole('slider')[0]).toBeDisabled();
    expect(screen.getAllByRole('slider')[0].parentElement).toHaveClass('opacity-50');
  });

  test('renders disabled state correctly with isDisabled prop', () => {
    render(<Slider isDisabled />);
    expect(screen.getAllByRole('slider')[0]).toBeDisabled();
    expect(screen.getAllByRole('slider')[0].parentElement).toHaveClass('opacity-50');
  });

  test('does not trigger onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<Slider onChange={handleChange} disabled />);
    
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    if (track) {
      fireEvent.click(track, { clientX: 50, clientY: 5 });
      expect(handleChange).not.toHaveBeenCalled();
    }
  });

  test('renders with helper text', () => {
    render(<Slider helperText="Adjust the volume" />);
    expect(screen.getByText('Adjust the volume')).toBeInTheDocument();
  });

  test('renders with error state', () => {
    render(<Slider error="Invalid value" />);
    expect(screen.getByText('Invalid value')).toBeInTheDocument();
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-invalid', 'true');
  });
  
  test('renders with success message', () => {
    render(<Slider successMessage="Value saved" />);
    expect(screen.getByText('Value saved')).toBeInTheDocument();
  });
  
  test('renders with required state', () => {
    render(<Slider required label="Required Field" />);
    expect(screen.getAllByRole('slider')[0]).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
  
  test('renders with required state using isRequired prop', () => {
    render(<Slider isRequired label="Required Field" />);
    expect(screen.getAllByRole('slider')[0]).toBeRequired();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // Größen
  test('renders with custom size', () => {
    const { rerender } = render(<Slider size="xs" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('h-1');
    
    rerender(<Slider size="sm" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('h-1.5');
    
    rerender(<Slider size="md" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('h-2');
    
    rerender(<Slider size="lg" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('h-2.5');
    
    rerender(<Slider size="xl" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('h-3');
  });

  // Varianten
  test('renders with different variants', () => {
    const { rerender } = render(<Slider variant="solid" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('bg-gray-300');
    
    rerender(<Slider variant="outline" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('bg-transparent');
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('border-2');
    
    rerender(<Slider variant="filled" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('bg-gray-200');
    
    rerender(<Slider variant="minimal" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('bg-gray-200');
  });
  
  // Farben
  test('renders with different color schemes', () => {
    const { rerender } = render(<Slider colorScheme="primary" value={50} />);
    const filledTrack = screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div');
    expect(filledTrack).toHaveClass('bg-primary-600');
    
    rerender(<Slider colorScheme="secondary" value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-secondary-600');
    
    rerender(<Slider colorScheme="success" value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-green-600');
    
    rerender(<Slider colorScheme="danger" value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-red-600');
    
    rerender(<Slider colorScheme="warning" value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-yellow-600');
    
    rerender(<Slider colorScheme="info" value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-blue-600');
    
    rerender(<Slider colorScheme="neutral" value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-gray-600');
  });
  
  // Stile
  test('renders with iOS style', () => {
    render(<Slider isIOS value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-blue-500');
  });
  
  test('renders with Android style', () => {
    render(<Slider isAndroid value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-blue-500');
  });
  
  test('renders with Material style', () => {
    render(<Slider isMaterial value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('bg-primary-500');
  });
  
  // Ausrichtung
  test('renders with vertical orientation', () => {
    render(<Slider orientation="vertical" />);
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getAllByRole('slider')[0].parentElement).toHaveClass('h-48');
  });
  
  test('renders with vertical orientation using isVertical prop', () => {
    render(<Slider isVertical />);
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getAllByRole('slider')[0].parentElement).toHaveClass('h-48');
  });
  
  // Effekte
  test('renders with shadow', () => {
    render(<Slider shadow />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('shadow-inner');
  });
  
  test('renders with transparent background', () => {
    render(<Slider transparent />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('bg-opacity-50');
  });
  
  // Barrierefreiheit
  test('renders with hidden label', () => {
    render(<Slider label="Hidden Label" hideLabel />);
    expect(screen.getByText('Hidden Label').parentElement).toHaveClass('sr-only');
  });
  
  test('renders with hidden helper text', () => {
    render(<Slider helperText="Hidden Helper" hideHelperText />);
    expect(screen.queryByText('Hidden Helper')).not.toBeInTheDocument();
  });
  
  test('renders with hidden error', () => {
    render(<Slider error="Hidden Error" hideError />);
    expect(screen.queryByText('Hidden Error')).not.toBeInTheDocument();
  });
  
  test('renders with hidden success message', () => {
    render(<Slider successMessage="Hidden Success" hideSuccessMessage />);
    expect(screen.queryByText('Hidden Success')).not.toBeInTheDocument();
  });
  
  test('renders with description for screen readers', () => {
    render(<Slider description="Description for screen readers" />);
    expect(screen.getByText('Description for screen readers')).toHaveClass('sr-only');
  });
  
  // Event-Handler
  test('handles keyboard events', () => {
    const handleChange = jest.fn();
    render(<Slider onChange={handleChange} value={50} min={0} max={100} step={10} />);
    
    const slider = screen.getAllByRole('slider')[0];
    
    // ArrowRight sollte den Wert um 10 erhöhen
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith(60);
    
    // ArrowLeft sollte den Wert um 10 verringern
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(handleChange).toHaveBeenCalledWith(40);
    
    // Home sollte den Wert auf das Minimum setzen
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(handleChange).toHaveBeenCalledWith(0);
    
    // End sollte den Wert auf das Maximum setzen
    fireEvent.keyDown(slider, { key: 'End' });
    expect(handleChange).toHaveBeenCalledWith(100);
  });
  
  // Range-Slider
  test('renders as range slider', () => {
    render(<Slider isRange value={20} value2={80} />);
    
    // Es sollten zwei Thumbs vorhanden sein
    const thumbs = screen.getAllByRole('slider');
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute('aria-valuenow', '20');
    expect(thumbs[1]).toHaveAttribute('aria-valuenow', '80');
  });
  
  test('handles change events for range slider', () => {
    const handleChange1 = jest.fn();
    const handleChange2 = jest.fn();
    render(
      <Slider 
        isRange 
        value={20} 
        value2={80} 
        onChange={handleChange1} 
        onChange2={handleChange2} 
      />
    );
    
    // Simuliere einen Klick näher am ersten Thumb
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    if (track) {
      fireEvent.click(track, { clientX: 10, clientY: 5 });
      expect(handleChange1).toHaveBeenCalledWith(10);
      
      // Simuliere einen Klick näher am zweiten Thumb
      fireEvent.click(track, { clientX: 90, clientY: 5 });
      expect(handleChange2).toHaveBeenCalledWith(90);
    }
  });
  
  // Markierungen und Skala
  test('renders with marks', () => {
    render(
      <Slider 
        showMarks 
        marks={[
          { value: 0, label: 'Min' },
          { value: 50, label: '50%' },
          { value: 100, label: 'Max' }
        ]}
      />
    );
    
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
  });
  
  test('renders with scale', () => {
    render(<Slider showScale scaleSteps={2} />);
    
    // Bei 2 Schritten sollten 3 Werte angezeigt werden: 0, 50, 100
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  
  test('renders with custom value format', () => {
    render(
      <Slider 
        showValue 
        value={50} 
        valueFormat={(value) => `${value}%`} 
      />
    );
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
  
  // Refs und IDs
  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Slider ref={ref} data-testid="slider-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('slider-with-ref'));
  });
  
  test('applies custom className correctly', () => {
    render(<Slider className="custom-class" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.parentElement).toHaveClass('custom-class');
  });
  
  test('applies custom containerClassName correctly', () => {
    render(<Slider containerClassName="container-class" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.parentElement).toHaveClass('container-class');
  });
  
  test('applies custom sliderContainerClassName correctly', () => {
    render(<Slider sliderContainerClassName="slider-container-class" />);
    expect(screen.getAllByRole('slider')[0].parentElement).toHaveClass('slider-container-class');
  });
  
  test('applies custom trackClassName correctly', () => {
    render(<Slider trackClassName="track-class" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('track-class');
  });
  
  test('applies custom filledTrackClassName correctly', () => {
    render(<Slider filledTrackClassName="filled-track-class" value={50} />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div > div')).toHaveClass('filled-track-class');
  });
  
  test('applies custom thumbClassName correctly', () => {
    render(<Slider thumbClassName="thumb-class" />);
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    const thumb = track?.querySelector('div');
    expect(thumb).toHaveClass('thumb-class');
  });
  
  test('applies custom labelClassName correctly', () => {
    render(<Slider label="Custom Label" labelClassName="label-class" />);
    expect(screen.getByText('Custom Label')).toHaveClass('label-class');
  });
  
  test('applies custom helperTextClassName correctly', () => {
    render(<Slider helperText="Custom Helper" helperTextClassName="helper-class" />);
    expect(screen.getByText('Custom Helper')).toHaveClass('helper-class');
  });
  
  test('applies custom errorClassName correctly', () => {
    render(<Slider error="Custom Error" errorClassName="error-class" />);
    expect(screen.getByText('Custom Error')).toHaveClass('error-class');
  });
  
  test('applies custom successClassName correctly', () => {
    render(<Slider successMessage="Custom Success" successClassName="success-class" />);
    expect(screen.getByText('Custom Success')).toHaveClass('success-class');
  });
  
  // Attribute
  test('generates unique id if not provided', () => {
    render(<Slider label="Auto ID" />);
    
    const label = screen.getByText('Auto ID');
    const slider = screen.getAllByRole('slider')[0];
    
    expect(label).toHaveAttribute('for', slider.id);
    expect(slider.id).toMatch(/^slider-/);
  });
  
  // Auto-Focus
  test('auto-focuses when autoFocus is true', () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    render(<Slider autoFocus />);
    
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
  
  // Thumb-Form
  test('renders with different thumb shapes', () => {
    const { rerender } = render(<Slider thumbShape="circle" />);
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    const thumb = track?.querySelector('div');
    expect(thumb).toHaveClass('rounded-full');
    
    rerender(<Slider thumbShape="square" />);
    expect(track?.querySelector('div')).toHaveClass('rounded-none');
    
    rerender(<Slider thumbShape="rectangle" />);
    expect(track?.querySelector('div')).toHaveClass('rounded-none');
    
    rerender(<Slider thumbShape="diamond" />);
    expect(track?.querySelector('div')).toHaveClass('rotate-45');
  });
  
  // Track-Form
  test('renders with different track shapes', () => {
    const { rerender } = render(<Slider trackShape="rounded" />);
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    expect(track).toHaveClass('rounded-full');
    
    rerender(<Slider trackShape="square" />);
    expect(screen.getAllByRole('slider')[0].parentElement?.querySelector('div')).toHaveClass('rounded-none');
  });
  
  // Thumb-Icon
  test('renders with custom thumb icon', () => {
    const thumbIcon = <span data-testid="thumb-icon">●</span>;
    render(<Slider thumbIcon={thumbIcon} />);
    
    expect(screen.getByTestId('thumb-icon')).toBeInTheDocument();
  });
  
  // Hervorgehobene Bereiche
  test('renders with highlight range', () => {
    render(<Slider highlightRange={[20, 80]} highlightColor="rgba(0, 0, 255, 0.2)" />);
    
    // Der hervorgehobene Bereich sollte vorhanden sein
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    const highlightedRange = track?.querySelector('div[style*="backgroundColor"]');
    expect(highlightedRange).toBeInTheDocument();
  });
  
  // Controlled vs Uncontrolled
  test('works as controlled component', () => {
    const { rerender } = render(<Slider value={30} />);
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuenow', '30');
    
    rerender(<Slider value={70} />);
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuenow', '70');
  });
  
  test('works as uncontrolled component', () => {
    render(<Slider defaultValue={50} />);
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuenow', '50');
    
    // Simuliere einen Klick auf den Track
    const track = screen.getAllByRole('slider')[0].parentElement?.querySelector('div');
    if (track) {
      fireEvent.click(track, { clientX: 75, clientY: 5 });
      expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuenow', '75');
    }
  });
});