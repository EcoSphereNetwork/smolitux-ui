import React, { useState } from 'react';
import { Card, Button, TabView, ProgressBar } from '@smolitux/utils/components/patterns';
import { TrendingTopics, EngagementScore } from '@smolitux/ai/components';
import { mockTrendingTopics, mockEngagementData } from './mockData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smolitux UI Demo</h1>
        <p>Eine Beispielanwendung, die die Smolitux UI-Komponenten demonstriert</p>
      </header>

      <div className="app-tabs">
        <TabView
          tabs={[
            { id: 'components', label: 'Basis-Komponenten' },
            { id: 'ai', label: 'KI-Komponenten' },
          ]}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId)}
        />
      </div>

      <main className="app-content">
        {activeTab === 'components' && (
          <div className="components-demo">
            <h2>Basis-Komponenten</h2>
            
            <section className="component-section">
              <h3>Cards</h3>
              <div className="component-grid">
                <Card>
                  <div className="card-content">
                    <h4>Standard Card</h4>
                    <p>Eine einfache Card-Komponente mit Standardstyling.</p>
                  </div>
                </Card>
                
                <Card shadowed>
                  <div className="card-content">
                    <h4>Shadowed Card</h4>
                    <p>Eine Card-Komponente mit Schatten.</p>
                  </div>
                </Card>
                
                <Card hoverable>
                  <div className="card-content">
                    <h4>Hoverable Card</h4>
                    <p>Eine Card-Komponente mit Hover-Effekt.</p>
                  </div>
                </Card>
                
                <Card bordered={false} style={{ backgroundColor: '#f0f9ff' }}>
                  <div className="card-content">
                    <h4>Custom Card</h4>
                    <p>Eine Card-Komponente mit benutzerdefiniertem Styling.</p>
                  </div>
                </Card>
              </div>
            </section>
            
            <section className="component-section">
              <h3>Buttons</h3>
              <div className="button-demo">
                <div className="button-row">
                  <Button>Standard</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                
                <div className="button-row">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
                
                <div className="button-row">
                  <Button colorScheme="primary">Primary</Button>
                  <Button colorScheme="secondary">Secondary</Button>
                  <Button colorScheme="success">Success</Button>
                  <Button colorScheme="danger">Danger</Button>
                  <Button colorScheme="warning">Warning</Button>
                  <Button colorScheme="info">Info</Button>
                </div>
                
                <div className="button-row">
                  <Button disabled>Disabled</Button>
                  <Button loading>Loading</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </section>
            
            <section className="component-section">
              <h3>Progress Bars</h3>
              <div className="progress-demo">
                <ProgressBar value={25} max={100} />
                <ProgressBar value={50} max={100} showValue />
                <ProgressBar value={75} max={100} colorScheme="success" showValue />
                <ProgressBar value={100} max={100} colorScheme="primary" showValue />
                <ProgressBar value={60} max={100} size="lg" colorScheme="warning" showValue />
                <ProgressBar value={30} max={100} indeterminate />
              </div>
            </section>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="ai-components-demo">
            <h2>KI-Komponenten</h2>
            
            <section className="component-section">
              <h3>Trending Topics</h3>
              <TrendingTopics 
                title="Trending-Themen"
                description="Die beliebtesten Themen in der Community"
                topics={mockTrendingTopics}
                onRefresh={handleRefresh}
                loading={loading}
                timeRanges={['24h', '7d', '30d', '90d']}
                currentTimeRange="24h"
                categories={['Technologie', 'Wissenschaft', 'Kultur', 'Politik', 'Wirtschaft']}
                analysisTimestamp={new Date()}
              />
            </section>
            
            <section className="component-section">
              <h3>Engagement Score</h3>
              <EngagementScore 
                title="Engagement-Analyse"
                description="Analyse des Engagements für Ihren Inhalt"
                score={78}
                metrics={mockEngagementData.metrics}
                onRefresh={handleRefresh}
                loading={loading}
                contentTitle="Beispiel-Inhalt"
                contentType="article"
                benchmarkScore={65}
                benchmarkText="Durchschnitt"
                recommendations={mockEngagementData.recommendations}
                analysisTimestamp={new Date()}
              />
            </section>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2023 Smolitux UI - Eine moderne Komponenten-Bibliothek</p>
      </footer>
    </div>
  );
};

export default App;