import { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { TimeIntervalSelector, TimeInterval } from '@/components/TimeIntervalSelector';
import { EquityChart } from '@/components/charts/EquityChart';
import { SectorsChart } from '@/components/charts/SectorsChart';
import { FixedIncomeChart } from '@/components/charts/FixedIncomeChart';
import { CentralBankRates } from '@/components/data/CentralBankRates';
import { EconomicIndicators } from '@/components/data/EconomicIndicators';
import { CurrencyChart } from '@/components/charts/CurrencyChart';
import { CommoditiesChart } from '@/components/charts/CommoditiesChart';
import { HousingChart } from '@/components/charts/HousingChart';
import { NewsFeed } from '@/components/news/NewsFeed';
import { BlankChart } from '@/components/charts/BlankChart';
import { InflationRatesChart } from '@/components/charts/InflationRatesChart';
import { ConsumerSentimentChart } from '@/components/charts/ConsumerSentimentChart';
import { MarketBreadthChart } from '@/components/charts/MarketBreadthChart';
import { EmergingMarketsHeatmap } from '@/components/charts/EmergingMarketsHeatmap';
import { ThematicETFChart } from '@/components/charts/ThematicETFChart';
import { VolatilityDashboard } from '@/components/charts/VolatilityDashboard';
import { YieldCurveChart } from '@/components/charts/YieldCurveChart';
import { MarketIndicators } from '@/components/data/MarketIndicators';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Index = () => {
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>('1M');
  
  // Default layout configuration
  const defaultLayouts = {
    lg: [
      { i: 'equity', x: 0, y: 0, w: 3, h: 3 },
      { i: 'sectors', x: 3, y: 0, w: 2, h: 3 },
      { i: 'fixedIncome', x: 5, y: 0, w: 2, h: 3 },
      { i: 'currency', x: 7, y: 0, w: 2, h: 3 },
      { i: 'commodities', x: 9, y: 0, w: 3, h: 3 },
      
      { i: 'inflation', x: 0, y: 3, w: 3, h: 3 },
      { i: 'sentiment', x: 3, y: 3, w: 2, h: 3 },
      { i: 'breadth', x: 5, y: 3, w: 2, h: 3 },
      { i: 'volatility', x: 7, y: 3, w: 2, h: 3 },
      { i: 'yieldCurve', x: 9, y: 3, w: 3, h: 3 },
      
      { i: 'centralBanks', x: 0, y: 6, w: 4, h: 2 },
      { i: 'economic', x: 4, y: 6, w: 4, h: 2 },
      { i: 'indicators', x: 8, y: 6, w: 4, h: 2 },
      
      { i: 'emerging', x: 0, y: 8, w: 3, h: 3 },
      { i: 'thematic', x: 3, y: 8, w: 3, h: 3 },
      { i: 'housing', x: 6, y: 8, w: 3, h: 3 },
      { i: 'blank', x: 9, y: 8, w: 3, h: 3 },
      
      { i: 'news', x: 0, y: 11, w: 12, h: 2 },
    ],
    md: [
      { i: 'equity', x: 0, y: 0, w: 6, h: 3 },
      { i: 'sectors', x: 6, y: 0, w: 6, h: 3 },
      { i: 'fixedIncome', x: 0, y: 3, w: 6, h: 3 },
      { i: 'centralBanks', x: 6, y: 3, w: 6, h: 3 },
      { i: 'economic', x: 0, y: 6, w: 12, h: 2 },
      { i: 'currency', x: 0, y: 8, w: 4, h: 3 },
      { i: 'commodities', x: 4, y: 8, w: 4, h: 3 },
      { i: 'housing', x: 8, y: 8, w: 4, h: 3 },
      { i: 'news', x: 0, y: 11, w: 12, h: 2 },
    ],
    sm: [
      { i: 'equity', x: 0, y: 0, w: 6, h: 3 },
      { i: 'sectors', x: 0, y: 3, w: 6, h: 3 },
      { i: 'fixedIncome', x: 0, y: 6, w: 6, h: 3 },
      { i: 'centralBanks', x: 0, y: 9, w: 6, h: 2 },
      { i: 'economic', x: 0, y: 11, w: 6, h: 2 },
      { i: 'currency', x: 0, y: 13, w: 6, h: 3 },
      { i: 'commodities', x: 0, y: 16, w: 6, h: 3 },
      { i: 'housing', x: 0, y: 19, w: 6, h: 3 },
      { i: 'news', x: 0, y: 22, w: 6, h: 2 },
    ],
  };

  // Load saved layouts from localStorage or use defaults
  const [layouts, setLayouts] = useState(() => {
    const savedLayouts = localStorage.getItem('dashboard-layouts');
    return savedLayouts ? JSON.parse(savedLayouts) : defaultLayouts;
  });

  // Save layout changes to localStorage
  const handleLayoutChange = (layout: Layout[], allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem('dashboard-layouts', JSON.stringify(allLayouts));
  };

  // Reset to default layout
  const resetToDefault = () => {
    setLayouts(defaultLayouts);
    localStorage.setItem('dashboard-layouts', JSON.stringify(defaultLayouts));
  };

  return (
    <div className="dashboard-container">
      {/* Enterprise Header */}
      <header className="bg-card border-b border-border p-2 mb-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-foreground tracking-tight">GLOBAL MARKET DASHBOARD</h1>
            <p className="text-xs text-muted-foreground font-medium">Real-time market intelligence</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={resetToDefault}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              title="Reset layout to default"
            >
              Reset Layout
            </button>
            <TimeIntervalSelector 
              selectedInterval={selectedInterval}
              onIntervalChange={setSelectedInterval}
            />
          </div>
        </div>
      </header>

      {/* Responsive Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 12, sm: 6 }}
        rowHeight={60}
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
        useCSSTransforms={true}
      >
        <div key="equity">
          <EquityChart timeInterval={selectedInterval} />
        </div>
        
        <div key="sectors">
          <SectorsChart timeInterval={selectedInterval} />
        </div>
        
        <div key="fixedIncome">
          <FixedIncomeChart timeInterval={selectedInterval} />
        </div>
        
        <div key="centralBanks">
          <CentralBankRates />
        </div>
        
        <div key="economic">
          <EconomicIndicators />
        </div>
        
        <div key="currency">
          <CurrencyChart timeInterval={selectedInterval} />
        </div>
        
        <div key="commodities">
          <CommoditiesChart timeInterval={selectedInterval} />
        </div>
        
        <div key="inflation">
          <InflationRatesChart timeInterval={selectedInterval} />
        </div>
        
        <div key="sentiment">
          <ConsumerSentimentChart timeInterval={selectedInterval} />
        </div>
        
        <div key="breadth">
          <MarketBreadthChart timeInterval={selectedInterval} />
        </div>
        
        <div key="volatility">
          <VolatilityDashboard timeInterval={selectedInterval} />
        </div>
        
        <div key="yieldCurve">
          <YieldCurveChart timeInterval={selectedInterval} />
        </div>
        
        <div key="emerging">
          <EmergingMarketsHeatmap timeInterval={selectedInterval} />
        </div>
        
        <div key="thematic">
          <ThematicETFChart timeInterval={selectedInterval} />
        </div>
        
        <div key="indicators">
          <MarketIndicators />
        </div>
        
        <div key="housing">
          <HousingChart timeInterval={selectedInterval} />
        </div>
        
        <div key="blank">
          <BlankChart />
        </div>
        
        <div key="news">
          <NewsFeed />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Index;