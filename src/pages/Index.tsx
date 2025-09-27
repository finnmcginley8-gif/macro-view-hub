import { useState } from 'react';
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
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Index = () => {
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>('1M');

  // Compact layout configuration
  const layouts = {
    lg: [
      { i: 'equity', x: 0, y: 0, w: 6, h: 3 },
      { i: 'sectors', x: 6, y: 0, w: 3, h: 3 },
      { i: 'fixedIncome', x: 9, y: 0, w: 3, h: 3 },
      { i: 'centralBanks', x: 0, y: 3, w: 6, h: 2 },
      { i: 'economic', x: 6, y: 3, w: 6, h: 2 },
      { i: 'currency', x: 0, y: 5, w: 4, h: 3 },
      { i: 'commodities', x: 4, y: 5, w: 4, h: 3 },
      { i: 'housing', x: 8, y: 5, w: 4, h: 3 },
      { i: 'news', x: 0, y: 8, w: 12, h: 2 },
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

  return (
    <div className="dashboard-container">
      {/* Compact Header */}
      <header className="bg-card border-b border-border p-2 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Global Market Dashboard</h1>
            <p className="text-xs text-muted-foreground font-mono">Real-time market data</p>
          </div>
          <TimeIntervalSelector 
            selectedInterval={selectedInterval}
            onIntervalChange={setSelectedInterval}
          />
        </div>
      </header>

      {/* Responsive Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
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
        
        <div key="housing">
          <HousingChart timeInterval={selectedInterval} />
        </div>
        
        <div key="news">
          <NewsFeed />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Index;