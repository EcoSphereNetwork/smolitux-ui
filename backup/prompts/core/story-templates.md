# Smolitux UI - Story Templates

This document provides reusable templates for Storybook stories. These templates can be combined and customized for specific component types and packages.

## Basic Component Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Package/Component',
  component: Component,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of the component functionality and usage.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual variant of the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Content to display inside the component',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
      <Component variant="danger">Danger</Component>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Component size="sm">Small</Component>
      <Component size="md">Medium</Component>
      <Component size="lg">Large</Component>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Component',
    disabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled Component',
    className: 'custom-class',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to apply custom CSS classes to the component.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    onClick: () => alert('Component clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to handle click events on the component.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground Component',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to experiment with different props and configurations.',
      },
    },
  },
};
```

## Form Component Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { FormComponent } from './FormComponent';

const meta: Meta<typeof FormComponent> = {
  title: 'Components/Package/FormComponent',
  component: FormComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form component for collecting user input with validation and error handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Input value (controlled)',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default input value (uncontrolled)',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change event handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur event handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Focus event handler',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter value...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Input Label',
    value: 'Controlled value',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Input Label',
    defaultValue: 'Default value',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Input',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    value: 'Invalid value',
    error: 'This value is invalid',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Input with Helper Text',
    helperText: 'This is a helpful description',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <FormComponent label="Default Input" placeholder="Enter value..." />
      <FormComponent label="Required Input" required placeholder="This field is required" />
      <FormComponent label="Disabled Input" disabled value="Cannot edit this" />
      <FormComponent label="With Error" error="This value is invalid" value="Invalid value" />
      <FormComponent label="With Helper Text" helperText="This is a helpful description" />
    </div>
  ),
};

export const Validation: Story = {
  render: function ValidationStory() {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');
    
    const handleChange = (newValue: string) => {
      setValue(newValue);
      
      if (!newValue) {
        setError('This field is required');
      } else if (newValue.length < 3) {
        setError('Value must be at least 3 characters');
      } else {
        setError('');
      }
    };
    
    return (
      <div style={{ width: '300px' }}>
        <FormComponent
          label="Validated Input"
          value={value}
          error={error}
          onChange={handleChange}
          required
          helperText="Enter at least 3 characters"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to implement form validation with the component.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    label: 'Playground Input',
    placeholder: 'Enter value...',
    required: false,
    disabled: false,
    error: '',
    helperText: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to experiment with different props and configurations.',
      },
    },
  },
};
```

## Interactive Component Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { InteractiveComponent } from './InteractiveComponent';

const meta: Meta<typeof InteractiveComponent> = {
  title: 'Components/Package/InteractiveComponent',
  component: InteractiveComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive component with expandable/collapsible functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the component',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the component is expanded (controlled)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the component is expanded by default (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change event handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: 'function' },
      },
    },
    onKeyDown: {
      action: 'keyDown',
      description: 'Key down event handler',
      table: {
        type: { summary: 'function' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click to Toggle',
  },
};

export const Expanded: Story = {
  args: {
    children: 'Click to Toggle (Expanded by Default)',
    defaultExpanded: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Cannot Toggle (Disabled)',
    disabled: true,
  },
};

export const WithCustomContent: Story = {
  render: function CustomContentStory() {
    return (
      <div style={{ width: '300px' }}>
        <InteractiveComponent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Toggle Section</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z" fill="currentColor" />
            </svg>
          </div>
        </InteractiveComponent>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [expanded, setExpanded] = React.useState(false);
    
    return (
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Collapse' : 'Expand'} from Outside
          </button>
        </div>
        
        <InteractiveComponent
          expanded={expanded}
          onChange={setExpanded}
        >
          Controlled Component
        </InteractiveComponent>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to use the component in controlled mode.',
      },
    },
  },
};

export const MultipleItems: Story = {
  render: function MultipleItemsStory() {
    return (
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <InteractiveComponent>Section 1</InteractiveComponent>
        <InteractiveComponent>Section 2</InteractiveComponent>
        <InteractiveComponent>Section 3</InteractiveComponent>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to use multiple interactive components together.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground Component',
    defaultExpanded: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to experiment with different props and configurations.',
      },
    },
  },
};
```

## Data Component Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DataComponent } from './DataComponent';

const meta: Meta<typeof DataComponent> = {
  title: 'Components/Package/DataComponent',
  component: DataComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component for displaying data with loading, error, and empty states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Data to display',
      table: {
        type: { summary: 'array' },
      },
    },
    renderItem: {
      description: 'Function to render each item',
      table: {
        type: { summary: 'function' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the component is loading',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display',
      table: {
        type: { summary: 'string' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when data is empty',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No data available' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-live': {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA live region for accessibility',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'polite' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' },
  { id: 3, name: 'Item 3', description: 'Description for Item 3' },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const WithCustomRender: Story = {
  args: {
    data: sampleData,
    renderItem: (item) => (
      <div key={item.id} style={{ padding: '0.5rem', border: '1px solid #ccc', marginBottom: '0.5rem' }}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
  },
};

export const Error: Story = {
  args: {
    data: [],
    error: 'Failed to load data. Please try again.',
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: 'No items found. Try a different search.',
  },
};

export const AllStates: Story = {
  render: function AllStatesStory() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
        <div>
          <h3>With Data</h3>
          <DataComponent
            data={sampleData}
            renderItem={(item) => (
              <div key={item.id} style={{ padding: '0.5rem', border: '1px solid #ccc', marginBottom: '0.5rem' }}>
                <strong>{item.name}</strong>: {item.description}
              </div>
            )}
          />
        </div>
        
        <div>
          <h3>Loading</h3>
          <DataComponent data={[]} loading />
        </div>
        
        <div>
          <h3>Error</h3>
          <DataComponent data={[]} error="Failed to load data. Please try again." />
        </div>
        
        <div>
          <h3>Empty</h3>
          <DataComponent data={[]} emptyMessage="No items found. Try a different search." />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates all possible states of the component.',
      },
    },
  },
};

export const DataFetching: Story = {
  render: function DataFetchingStory() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    
    const fetchData = () => {
      setLoading(true);
      setError('');
      
      // Simulate API call
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate
        
        if (success) {
          setData(sampleData);
        } else {
          setError('Failed to fetch data. Please try again.');
        }
        
        setLoading(false);
      }, 1500);
    };
    
    const clearData = () => {
      setData([]);
      setError('');
    };
    
    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
          <button onClick={clearData} disabled={loading}>
            Clear
          </button>
        </div>
        
        <DataComponent
          data={data}
          loading={loading}
          error={error}
          renderItem={(item) => (
            <div key={item.id} style={{ padding: '0.5rem', border: '1px solid #ccc', marginBottom: '0.5rem' }}>
              <strong>{item.name}</strong>: {item.description}
            </div>
          )}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to use the component with data fetching.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    data: sampleData,
    loading: false,
    error: '',
    emptyMessage: 'No data available',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to experiment with different props and configurations.',
      },
    },
  },
};
```

## AI Component Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { AIComponent } from './AIComponent';

const meta: Meta<typeof AIComponent> = {
  title: 'Components/Package/AIComponent',
  component: AIComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'AI-powered component for analyzing content and displaying results.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to analyze',
      table: {
        type: { summary: 'string' },
      },
    },
    autoAnalyze: {
      control: 'boolean',
      description: 'Whether to analyze automatically',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    onAnalysisComplete: {
      action: 'analysisComplete',
      description: 'Callback when analysis is complete',
      table: {
        type: { summary: 'function' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a sample text for AI analysis. The weather is nice today and I am feeling happy about it.',
  },
};

export const AutoAnalyze: Story = {
  args: {
    content: 'This is a sample text that will be automatically analyzed. I really enjoyed the movie we watched yesterday.',
    autoAnalyze: true,
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [content, setContent] = React.useState('');
    const [result, setResult] = React.useState(null);
    
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };
    
    const handleAnalysisComplete = (analysisResult) => {
      setResult(analysisResult);
      console.log('Analysis result:', analysisResult);
    };
    
    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3>Enter text to analyze:</h3>
          <textarea
            value={content}
            onChange={handleContentChange}
            style={{ width: '100%', height: '100px', padding: '0.5rem' }}
            placeholder="Enter text here..."
          />
        </div>
        
        <AIComponent
          content={content}
          onAnalysisComplete={handleAnalysisComplete}
        />
        
        {result && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5' }}>
            <h3>Analysis Result (Console):</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to use the component interactively with user input.',
      },
    },
  },
};

export const SentimentExamples: Story = {
  render: function SentimentExamplesStory() {
    return (
      <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Positive Sentiment</h3>
          <AIComponent
            content="I absolutely love this product! It's amazing and has improved my life significantly. The quality is outstanding and I would highly recommend it to everyone."
            autoAnalyze
          />
        </div>
        
        <div>
          <h3>Neutral Sentiment</h3>
          <AIComponent
            content="The product arrived on time. It has several features including a power button and a USB port. It comes in different colors and sizes."
            autoAnalyze
          />
        </div>
        
        <div>
          <h3>Negative Sentiment</h3>
          <AIComponent
            content="I'm very disappointed with this purchase. The quality is poor and it stopped working after just a few days. Customer service was unhelpful and I regret buying it."
            autoAnalyze
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the component analyzing text with different sentiments.',
      },
    },
  },
};

export const ErrorHandling: Story = {
  render: function ErrorHandlingStory() {
    // Mock an error for demonstration
    const originalAnalyzeContent = window.analyzeContent;
    React.useEffect(() => {
      window.analyzeContent = () => Promise.reject(new Error('Analysis service unavailable'));
      
      return () => {
        window.analyzeContent = originalAnalyzeContent;
      };
    }, []);
    
    return (
      <div style={{ width: '500px' }}>
        <AIComponent
          content="This text will trigger an error when analyzed."
          autoAnalyze
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the component handles errors during analysis.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    content: 'This is a sample text for AI analysis. Modify this text to see different results.',
    autoAnalyze: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to experiment with different props and configurations.',
      },
    },
  },
};
```

## Blockchain Component Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { BlockchainComponent } from './BlockchainComponent';

const meta: Meta<typeof BlockchainComponent> = {
  title: 'Components/Package/BlockchainComponent',
  component: BlockchainComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Blockchain component for connecting to wallets and displaying wallet information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    autoConnect: {
      control: 'boolean',
      description: 'Whether to connect automatically',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    onConnectionChange: {
      action: 'connectionChanged',
      description: 'Callback when connection status changes',
      table: {
        type: { summary: 'function' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const AutoConnect: Story = {
  args: {
    autoConnect: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-blockchain-component',
  },
};

export const ConnectionStates: Story = {
  render: function ConnectionStatesStory() {
    const [connected, setConnected] = React.useState(false);
    
    const handleConnectionChange = (isConnected) => {
      setConnected(isConnected);
      console.log('Connection status:', isConnected);
    };
    
    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: connected ? '#e6ffe6' : '#ffe6e6' }}>
          <strong>Status:</strong> {connected ? 'Connected' : 'Disconnected'}
        </div>
        
        <BlockchainComponent
          onConnectionChange={handleConnectionChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to track connection states.',
      },
    },
  },
};

export const ErrorHandling: Story = {
  render: function ErrorHandlingStory() {
    // Mock an error for demonstration
    const originalConnectWallet = window.connectWallet;
    React.useEffect(() => {
      window.connectWallet = () => Promise.reject(new Error('Wallet connection failed'));
      
      return () => {
        window.connectWallet = originalConnectWallet;
      };
    }, []);
    
    return (
      <div style={{ width: '400px' }}>
        <BlockchainComponent />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the component handles connection errors.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: function MultipleInstancesStory() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
        <div>
          <h3>Manual Connection</h3>
          <BlockchainComponent />
        </div>
        
        <div>
          <h3>Auto Connection</h3>
          <BlockchainComponent autoConnect />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates using multiple blockchain components on the same page.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: function CustomStylingStory() {
    const customStyles = {
      container: {
        border: '1px solid #6b7280',
        borderRadius: '0.5rem',
        padding: '1rem',
        backgroundColor: '#f9fafb',
      },
      button: {
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer',
      },
      walletInfo: {
        backgroundColor: '#e0e7ff',
        padding: '1rem',
        borderRadius: '0.25rem',
        marginTop: '1rem',
      },
    };
    
    return (
      <div style={customStyles.container}>
        <h3>Custom Styled Wallet</h3>
        <BlockchainComponent />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to apply custom styling to the component.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    autoConnect: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to experiment with different props and configurations.',
      },
    },
  },
};
```

These templates provide a solid foundation for documenting various component types in the Smolitux UI library. They can be customized and extended as needed for specific requirements.