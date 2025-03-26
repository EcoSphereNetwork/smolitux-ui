import React from 'react';
import { render } from 'react-dom';

// Import primitives
import { Box, Flex, Grid, Text } from './packages/@smolitux/utils/src/components/primitives';

// Import patterns
import { 
  Card, 
  Button, 
  ProgressBar, 
  TabView, 
  Tooltip 
} from './packages/@smolitux/utils/src/components/patterns';

// Import AI components
import { 
  TrendingTopics, 
  EngagementScore 
} from './packages/@smolitux/ai/src/components';

// Test component
const TestComponent: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Component Test</h1>
      
      <h2>Primitives</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Box</h3>
        <Box 
          style={{ 
            padding: '10px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        >
          This is a Box
        </Box>
        
        <h3>Flex</h3>
        <Flex 
          style={{ 
            padding: '10px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
          direction="row"
          justify="space-between"
          align="center"
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Flex>
        
        <h3>Grid</h3>
        <Grid 
          style={{ 
            padding: '10px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
          columns={3}
          gap={10}
        >
          <div style={{ padding: '10px', backgroundColor: '#ddd' }}>Item 1</div>
          <div style={{ padding: '10px', backgroundColor: '#ddd' }}>Item 2</div>
          <div style={{ padding: '10px', backgroundColor: '#ddd' }}>Item 3</div>
          <div style={{ padding: '10px', backgroundColor: '#ddd' }}>Item 4</div>
          <div style={{ padding: '10px', backgroundColor: '#ddd' }}>Item 5</div>
          <div style={{ padding: '10px', backgroundColor: '#ddd' }}>Item 6</div>
        </Grid>
        
        <h3>Text</h3>
        <Text 
          size="lg" 
          weight="bold" 
          color="#333"
        >
          This is a Text component
        </Text>
      </div>
      
      <h2>Patterns</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Card</h3>
        <Card style={{ marginBottom: '10px' }}>
          <div style={{ padding: '10px' }}>
            <h4>Card Title</h4>
            <p>This is a card component</p>
          </div>
        </Card>
        
        <h3>Button</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
        
        <h3>ProgressBar</h3>
        <div style={{ marginBottom: '10px' }}>
          <ProgressBar value={50} max={100} showValue />
        </div>
        
        <h3>TabView</h3>
        <div style={{ marginBottom: '10px' }}>
          <TabView
            tabs={[
              { id: 'tab1', label: 'Tab 1', content: <div>Content of Tab 1</div> },
              { id: 'tab2', label: 'Tab 2', content: <div>Content of Tab 2</div> },
              { id: 'tab3', label: 'Tab 3', content: <div>Content of Tab 3</div> },
            ]}
            activeTab="tab1"
            onChange={(tabId) => console.log(`Tab changed to ${tabId}`)}
          />
        </div>
        
        <h3>Tooltip</h3>
        <div style={{ marginBottom: '10px' }}>
          <Tooltip content="This is a tooltip">
            <Button>Hover me</Button>
          </Tooltip>
        </div>
      </div>
      
      <h2>AI Components</h2>
      <div>
        <h3>TrendingTopics</h3>
        <div style={{ marginBottom: '20px' }}>
          <TrendingTopics
            title="Trending Topics"
            topics={[
              {
                id: '1',
                name: 'React',
                description: 'A JavaScript library for building user interfaces',
                category: 'Frontend',
                mentionCount: 1200,
                change: 5.2,
                isNew: false,
              },
              {
                id: '2',
                name: 'TypeScript',
                description: 'A typed superset of JavaScript',
                category: 'Language',
                mentionCount: 980,
                change: 8.7,
                isNew: false,
              },
              {
                id: '3',
                name: 'Next.js',
                description: 'The React Framework for Production',
                category: 'Framework',
                mentionCount: 850,
                change: 12.3,
                isNew: true,
              },
            ]}
          />
        </div>
        
        <h3>EngagementScore</h3>
        <div style={{ marginBottom: '20px' }}>
          <EngagementScore
            title="Engagement Score"
            score={78}
            metrics={[
              {
                name: 'Views',
                value: 12500,
                weight: 0.2,
                description: 'Number of views',
                benchmark: 8000,
                higherIsBetter: true,
              },
              {
                name: 'Average Time',
                value: 245,
                weight: 0.25,
                description: 'Average time spent in seconds',
                benchmark: 180,
                higherIsBetter: true,
              },
              {
                name: 'Interaction Rate',
                value: 8.7,
                weight: 0.3,
                description: 'Percentage of users who interact',
                benchmark: 5.2,
                higherIsBetter: true,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

// Render the test component
const rootElement = document.getElementById('root');
if (rootElement) {
  render(<TestComponent />, rootElement);
}