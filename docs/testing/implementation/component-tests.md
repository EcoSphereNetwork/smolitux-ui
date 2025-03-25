# Komponententests für Smolitux UI

Dieses Dokument beschreibt die implementierten Unit-Tests und Integrationstests für die Smolitux UI-Bibliothek.

## Überblick

Die folgenden Komponenten wurden mit Unit-Tests abgedeckt:

- Button
- Card
- Checkbox
- Input
- Radio
- Select
- TabView

Zusätzlich wurden Integrationstests für folgende Szenarien implementiert:

- Formulare mit verschiedenen Formular-Elementen
- Theme-Integration

## Unit-Tests

### Button-Komponente

Die Button-Komponente wurde umfassend getestet, um sicherzustellen, dass sie korrekt funktioniert und alle Props korrekt verarbeitet.

```tsx
test('renders correctly with default props', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveClass('bg-primary-600'); // Primär-Variante als Default
});
```

### Card-Komponente

Die Card-Komponente wurde getestet, um sicherzustellen, dass sie korrekt gerendert wird und alle Props korrekt verarbeitet.

```tsx
test('renders with different variants', () => {
  const { rerender } = render(<Card variant="elevated">Elevated Card</Card>);
  expect(screen.getByText('Elevated Card').parentElement).toHaveClass('shadow-md');

  rerender(<Card variant="outlined">Outlined Card</Card>);
  expect(screen.getByText('Outlined Card').parentElement).toHaveClass('border');

  rerender(<Card variant="flat">Flat Card</Card>);
  expect(screen.getByText('Flat Card').parentElement).toHaveClass('bg-white');
});
```

### Checkbox-Komponente

Die Checkbox-Komponente wurde getestet, um sicherzustellen, dass sie korrekt gerendert wird und alle Props korrekt verarbeitet.

```tsx
test('handles change events', async () => {
  const handleChange = jest.fn();
  render(<Checkbox onChange={handleChange} />);
  
  const checkbox = screen.getByRole('checkbox');
  await userEvent.click(checkbox);
  
  expect(handleChange).toHaveBeenCalledTimes(1);
});
```

### Input-Komponente

Die Input-Komponente wurde getestet, um sicherzustellen, dass sie korrekt gerendert wird und alle Props korrekt verarbeitet.

```tsx
test('shows error message when provided', () => {
  render(<Input error="Required field" />);
  expect(screen.getByText('Required field')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});
```

### Radio-Komponente

Die Radio-Komponente und RadioGroup wurden getestet, um sicherzustellen, dass sie korrekt gerendert werden und alle Props korrekt verarbeiten.

```tsx
test('sets the correct radio as checked', () => {
  render(
    <RadioGroup name="options" value="option2">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  );
  
  expect(screen.getByLabelText('Option 1')).not.toBeChecked();
  expect(screen.getByLabelText('Option 2')).toBeChecked();
  expect(screen.getByLabelText('Option 3')).not.toBeChecked();
});
```

### Select-Komponente

Die Select-Komponente wurde getestet, um sicherzustellen, dass sie korrekt gerendert wird und alle Props korrekt verarbeitet.

```tsx
test('renders all options correctly', () => {
  render(<Select options={options} />);
  
  const selectElement = screen.getByRole('combobox');
  const optionElements = screen.getAllByRole('option');
  
  expect(optionElements).toHaveLength(3);
  expect(optionElements[0]).toHaveTextContent('Option 1');
  expect(optionElements[1]).toHaveTextContent('Option 2');
  expect(optionElements[2]).toHaveTextContent('Option 3');
});
```

### TabView-Komponente

Die TabView-Komponente wurde getestet, um sicherzustellen, dass sie korrekt gerendert wird und alle Props korrekt verarbeitet.

```tsx
test('changes active tab when clicked', async () => {
  render(
    <TabView>
      <Tab label="Tab 1">
        <TabPanel>Content 1</TabPanel>
      </Tab>
      <Tab label="Tab 2">
        <TabPanel>Content 2</TabPanel>
      </Tab>
      <Tab label="Tab 3">
        <TabPanel>Content 3</TabPanel>
      </Tab>
    </TabView>
  );
  
  // Initially, the first tab is active
  expect(screen.getByText('Content 1')).toBeInTheDocument();
  
  // Click on the second tab
  await userEvent.click(screen.getByText('Tab 2'));
  
  // Now the second tab should be active
  expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  expect(screen.getByText('Content 2')).toBeInTheDocument();
  expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
});
```

## Integrationstests

### Formular-Integration

Der Formular-Integrationstest stellt sicher, dass alle Formular-Elemente korrekt zusammenarbeiten.

```tsx
test('handles form submission with all form elements', async () => {
  const handleSubmit = jest.fn(e => e.preventDefault());
  
  render(
    <form data-testid="test-form" onSubmit={handleSubmit}>
      <Input label="Name" name="name" placeholder="Enter your name" />
      <Input label="Email" name="email" type="email" placeholder="Enter your email" />
      <Select 
        label="Country" 
        name="country"
        options={[
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'uk', label: 'United Kingdom' }
        ]} 
      />
      <RadioGroup name="gender" label="Gender">
        <Radio value="male" label="Male" />
        <Radio value="female" label="Female" />
        <Radio value="other" label="Other" />
      </RadioGroup>
      <Checkbox name="terms" label="I agree to the terms and conditions" />
      <Button type="submit">Submit</Button>
    </form>
  );
  
  // Fill out the form
  await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
  await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
  
  // Select a country
  await userEvent.selectOptions(screen.getByLabelText('Country'), 'fr');
  
  // Select a gender
  await userEvent.click(screen.getByLabelText('Male'));
  
  // Check the terms checkbox
  await userEvent.click(screen.getByLabelText('I agree to the terms and conditions'));
  
  // Submit the form
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### Theme-Integration

Der Theme-Integrationstest stellt sicher, dass alle Komponenten korrekt auf Themeänderungen reagieren.

```tsx
test('components render correctly with light theme', () => {
  render(
    <ThemeProvider initialTheme="light">
      <Card>
        <h2>Theme Test</h2>
        <Input label="Test Input" />
        <Button>Test Button</Button>
      </Card>
    </ThemeProvider>
  );
  
  // In light theme, the card should have a white background
  expect(screen.getByText('Theme Test').closest('.bg-white')).toBeInTheDocument();
  
  // The button should have primary color classes
  expect(screen.getByRole('button')).toHaveClass('bg-primary-600');
});
```

## Testabdeckung

Die implementierten Tests decken die folgenden Aspekte der Komponenten ab:

- **Rendering**: Korrekte Darstellung der Komponenten
- **Props**: Korrekte Verarbeitung aller Props
- **Interaktionen**: Korrekte Reaktion auf Benutzerinteraktionen
- **Zustände**: Korrekte Darstellung verschiedener Zustände
- **Accessibility**: Korrekte Implementierung von Accessibility-Attributen
- **Integration**: Korrekte Zusammenarbeit der Komponenten

## Nächste Schritte

Die folgenden Schritte sind als Nächstes geplant:

1. **Implementierung von Unit-Tests für weitere Komponenten**: Alert, Badge, Modal, etc.
2. **Implementierung von weiteren Integrationstests**: Tests für komplexere UI-Patterns
3. **Implementierung von Snapshot-Tests**: Für visuelle Regressionstests
4. **Erhöhung der Testabdeckung**: Für komplexere Komponenten und Edge-Cases

## Fazit

Die implementierten Unit-Tests und Integrationstests bieten eine solide Grundlage für die Qualitätssicherung der Smolitux UI-Bibliothek. Die Tests stellen sicher, dass die Komponenten korrekt funktionieren und alle Props korrekt verarbeiten. Die Integrationstests stellen sicher, dass die Komponenten korrekt zusammenarbeiten.