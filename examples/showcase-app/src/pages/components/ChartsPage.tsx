import React, { useState } from 'react';
import { 
  Card, 
  useTranslation,
  Breadcrumb,
  Alert,
  Button,
  Select,
  Input,
  Switch
} from '@smolitux/core';
import {
  LineChart,
  BarChart,
  PieChart,
  ScatterPlot,
  AreaChart
} from '@smolitux/charts';

const ChartsPage: React.FC = () => {
  const t = useTranslation();
  
  // Beispieldaten für die Charts
  const [lineData, setLineData] = useState([
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 25 },
    { x: 'Mar', y: 15 },
    { x: 'Apr', y: 30 },
    { x: 'May', y: 22 },
    { x: 'Jun', y: 40 }
  ]);

  const [barData, setBarData] = useState([
    { x: 'A', y: 10 },
    { x: 'B', y: 25 },
    { x: 'C', y: 15 },
    { x: 'D', y: 30 },
    { x: 'E', y: 22 }
  ]);

  const [pieData, setPieData] = useState([
    { label: 'A', value: 30 },
    { label: 'B', value: 15 },
    { label: 'C', value: 25 },
    { label: 'D', value: 20 },
    { label: 'E', value: 10 }
  ]);

  const [scatterData, setScatterData] = useState([
    { x: 10, y: 20, size: 5 },
    { x: 15, y: 15, size: 8 },
    { x: 20, y: 25, size: 12 },
    { x: 25, y: 10, size: 6 },
    { x: 30, y: 30, size: 10 },
    { x: 35, y: 15, size: 14 },
    { x: 40, y: 20, size: 7 }
  ]);

  const [areaData, setAreaData] = useState([
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 25 },
    { x: 'Mar', y: 15 },
    { x: 'Apr', y: 30 },
    { x: 'May', y: 22 },
    { x: 'Jun', y: 40 }
  ]);

  // Chart-Konfigurationen
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [chartTheme, setChartTheme] = useState('default');
  const [chartAnimation, setChartAnimation] = useState(true);

  const themeOptions = [
    { value: 'default', label: t('chartsPage.defaultTheme') },
    { value: 'dark', label: t('chartsPage.darkTheme') },
    { value: 'pastel', label: t('chartsPage.pastelTheme') },
    { value: 'neon', label: t('chartsPage.neonTheme') }
  ];

  // Funktion zum Aktualisieren der Daten
  const randomizeData = () => {
    // Line und Area Chart
    const newLineData = lineData.map(item => ({
      x: item.x,
      y: Math.floor(Math.random() * 50) + 5
    }));
    setLineData(newLineData);
    setAreaData(newLineData);

    // Bar Chart
    setBarData(barData.map(item => ({
      x: item.x,
      y: Math.floor(Math.random() * 50) + 5
    })));

    // Pie Chart
    setPieData(pieData.map(item => ({
      label: item.label,
      value: Math.floor(Math.random() * 50) + 5
    })));

    // Scatter Plot
    setScatterData(scatterData.map(item => ({
      x: Math.floor(Math.random() * 50) + 5,
      y: Math.floor(Math.random() * 50) + 5,
      size: Math.floor(Math.random() * 15) + 3
    })));
  };

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: t('navigation.home'), href: '/' },
          { label: t('navigation.components'), href: '#' },
          { label: t('components.charts'), href: '/components/charts' }
        ]}
        className="mb-2"
      />

      <h1 className="section-title">{t('components.charts')}</h1>
      
      <Alert type="info" className="mb-2">
        {t('chartsPage.description')}
      </Alert>

      <div className="section">
        <h2 className="section-title">{t('chartsPage.chartControls')}</h2>
        <Card className="p-2">
          <div className="flex-row flex-wrap gap-2 mb-2">
            <div style={{ flex: '1 1 200px' }}>
              <label className="form-label">{t('chartsPage.theme')}</label>
              <Select 
                options={themeOptions} 
                value={chartTheme}
                onChange={(value) => setChartTheme(value as string)}
              />
            </div>
            
            <div style={{ flex: '1 1 200px' }}>
              <label className="form-label">{t('chartsPage.showGrid')}</label>
              <Switch 
                checked={showGrid}
                onChange={() => setShowGrid(!showGrid)}
              />
            </div>
            
            <div style={{ flex: '1 1 200px' }}>
              <label className="form-label">{t('chartsPage.showLegend')}</label>
              <Switch 
                checked={showLegend}
                onChange={() => setShowLegend(!showLegend)}
              />
            </div>
            
            <div style={{ flex: '1 1 200px' }}>
              <label className="form-label">{t('chartsPage.animation')}</label>
              <Switch 
                checked={chartAnimation}
                onChange={() => setChartAnimation(!chartAnimation)}
              />
            </div>
          </div>
          
          <Button 
            variant="primary" 
            onClick={randomizeData}
          >
            {t('chartsPage.randomizeData')}
          </Button>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('chartsPage.lineChart')}</h2>
        <Card className="p-2">
          <div style={{ height: '300px' }}>
            <LineChart 
              data={lineData}
              xAxisLabel={t('chartsPage.month')}
              yAxisLabel={t('chartsPage.value')}
              title={t('chartsPage.monthlySales')}
              showGrid={showGrid}
              showLegend={showLegend}
              theme={chartTheme}
              animate={chartAnimation}
            />
          </div>
          
          <div className="code-block mt-2">
            {`<LineChart 
  data={[
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 25 },
    { x: 'Mar', y: 15 },
    { x: 'Apr', y: 30 },
    { x: 'May', y: 22 },
    { x: 'Jun', y: 40 }
  ]}
  xAxisLabel="Month"
  yAxisLabel="Value"
  title="Monthly Sales"
  showGrid={true}
  showLegend={true}
  theme="default"
  animate={true}
/>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('chartsPage.barChart')}</h2>
        <Card className="p-2">
          <div style={{ height: '300px' }}>
            <BarChart 
              data={barData}
              xAxisLabel={t('chartsPage.category')}
              yAxisLabel={t('chartsPage.value')}
              title={t('chartsPage.categorySales')}
              showGrid={showGrid}
              showLegend={showLegend}
              theme={chartTheme}
              animate={chartAnimation}
            />
          </div>
          
          <div className="code-block mt-2">
            {`<BarChart 
  data={[
    { x: 'A', y: 10 },
    { x: 'B', y: 25 },
    { x: 'C', y: 15 },
    { x: 'D', y: 30 },
    { x: 'E', y: 22 }
  ]}
  xAxisLabel="Category"
  yAxisLabel="Value"
  title="Category Sales"
  showGrid={true}
  showLegend={true}
  theme="default"
  animate={true}
/>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('chartsPage.pieChart')}</h2>
        <Card className="p-2">
          <div style={{ height: '300px' }}>
            <PieChart 
              data={pieData}
              title={t('chartsPage.marketShare')}
              showLegend={showLegend}
              theme={chartTheme}
              animate={chartAnimation}
            />
          </div>
          
          <div className="code-block mt-2">
            {`<PieChart 
  data={[
    { label: 'A', value: 30 },
    { label: 'B', value: 15 },
    { label: 'C', value: 25 },
    { label: 'D', value: 20 },
    { label: 'E', value: 10 }
  ]}
  title="Market Share"
  showLegend={true}
  theme="default"
  animate={true}
/>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('chartsPage.scatterPlot')}</h2>
        <Card className="p-2">
          <div style={{ height: '300px' }}>
            <ScatterPlot 
              data={scatterData}
              xAxisLabel={t('chartsPage.xAxis')}
              yAxisLabel={t('chartsPage.yAxis')}
              title={t('chartsPage.dataDistribution')}
              showGrid={showGrid}
              showLegend={showLegend}
              theme={chartTheme}
              animate={chartAnimation}
            />
          </div>
          
          <div className="code-block mt-2">
            {`<ScatterPlot 
  data={[
    { x: 10, y: 20, size: 5 },
    { x: 15, y: 15, size: 8 },
    { x: 20, y: 25, size: 12 },
    { x: 25, y: 10, size: 6 },
    { x: 30, y: 30, size: 10 },
    { x: 35, y: 15, size: 14 },
    { x: 40, y: 20, size: 7 }
  ]}
  xAxisLabel="X Axis"
  yAxisLabel="Y Axis"
  title="Data Distribution"
  showGrid={true}
  showLegend={true}
  theme="default"
  animate={true}
/>`}
          </div>
        </Card>
      </div>

      <div className="section">
        <h2 className="section-title">{t('chartsPage.areaChart')}</h2>
        <Card className="p-2">
          <div style={{ height: '300px' }}>
            <AreaChart 
              data={areaData}
              xAxisLabel={t('chartsPage.month')}
              yAxisLabel={t('chartsPage.value')}
              title={t('chartsPage.monthlyTrend')}
              showGrid={showGrid}
              showLegend={showLegend}
              theme={chartTheme}
              animate={chartAnimation}
            />
          </div>
          
          <div className="code-block mt-2">
            {`<AreaChart 
  data={[
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 25 },
    { x: 'Mar', y: 15 },
    { x: 'Apr', y: 30 },
    { x: 'May', y: 22 },
    { x: 'Jun', y: 40 }
  ]}
  xAxisLabel="Month"
  yAxisLabel="Value"
  title="Monthly Trend"
  showGrid={true}
  showLegend={true}
  theme="default"
  animate={true}
/>`}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChartsPage;