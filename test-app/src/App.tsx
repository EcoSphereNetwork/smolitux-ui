import { useState } from 'react';
import { Button, Card, TabView } from '@smolitux/core';
import { TrendingTopics } from '@smolitux/ai';
import { TokenDisplay } from '@smolitux/blockchain';
import { FeedView } from '@smolitux/resonance';

function App() {
  const [activeTab, setActiveTab] = useState('core');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Smolitux UI Test</h1>
      
      <TabView 
        tabs={[
          { id: 'core', label: 'Core Components' },
          { id: 'ai', label: 'AI Components' },
          { id: 'blockchain', label: 'Blockchain Components' },
          { id: 'resonance', label: 'Resonance Components' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'core' && (
        <Card title="Button Component" style={{ marginTop: '20px' }}>
          <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
        </Card>
      )}

      {activeTab === 'ai' && (
        <Card title="Trending Topics" style={{ marginTop: '20px' }}>
          <TrendingTopics 
            topics={[
              { id: '1', name: 'Smolitux', count: 1250 },
              { id: '2', name: 'React', count: 980 },
              { id: '3', name: 'TypeScript', count: 750 },
              { id: '4', name: 'UI Components', count: 520 },
              { id: '5', name: 'Web Development', count: 320 }
            ]}
          />
        </Card>
      )}

      {activeTab === 'blockchain' && (
        <Card title="Token Display" style={{ marginTop: '20px' }}>
          <TokenDisplay 
            symbol="SMX" 
            name="Smolitux Token" 
            balance="1,250.75" 
            value="$12,507.50"
            change={+5.25}
          />
        </Card>
      )}

      {activeTab === 'resonance' && (
        <Card title="Feed View" style={{ marginTop: '20px' }}>
          <FeedView 
            posts={[
              { 
                id: '1', 
                author: { id: 'user1', name: 'John Doe', avatar: '' },
                content: { text: 'This is a test post' },
                createdAt: new Date().toISOString(),
                stats: { likes: 25, comments: 10, shares: 5, views: 100 },
                isLiked: false,
                isShared: false
              },
              { 
                id: '2', 
                author: { id: 'user2', name: 'Jane Smith', avatar: '' },
                content: { text: 'Another test post' },
                createdAt: new Date().toISOString(),
                stats: { likes: 15, comments: 5, shares: 2, views: 50 },
                isLiked: true,
                isShared: false
              }
            ]}
          />
        </Card>
      )}
    </div>
  );
}

export default App;