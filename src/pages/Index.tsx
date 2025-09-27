import { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { TimeIntervalSelector, TimeInterval } from '@/components/TimeIntervalSelector';
import { EquityChart } from '@/components/charts/EquityChart';
import { SectorsChart } from '@/components/charts/SectorsChart';
import { FixedIncomeChart } from '@/components/charts/FixedIncomeChart';
import { CentralBankRates } from '@/components/data/CentralBankRates';
import { EconomicIndicators } from '@/components/data/EconomicIndicators';
import { HousingChart } from '@/components/charts/HousingChart';
import { FavoriteTickers } from '@/components/portfolio/FavoriteTickers';
import { PerformanceCenter } from '@/components/portfolio/PerformanceCenter';
import { FilteredNewsFeed } from '@/components/news/FilteredNewsFeed';
import { CompactCommodities } from '@/components/charts/CompactCommodities';
import { CompactCurrency } from '@/components/charts/CompactCurrency';
import { ViewTabs } from '@/components/layout/ViewTabs';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Index = () => {
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>('1M');
  
  // Default layout configuration - Long-term investor focused
  const defaultLayouts = {
    lg: [
      { i: 'favorites', x: 0, y: 0, w: 3, h: 3 },
      { i: 'performance', x: 3, y: 0, w: 6, h: 3 },
      { i: 'equity', x: 9, y: 0, w: 3, h: 3 },
      { i: 'sectors', x: 0, y: 3, w: 2, h: 3 },
      { i: 'fixedIncome', x: 2, y: 3, w: 2, h: 3 },
      { i: 'commodities', x: 4, y: 3, w: 2, h: 3 },
      { i: 'currency', x: 6, y: 3, w: 2, h: 3 },
      { i: 'housing', x: 8, y: 3, w: 2, h: 3 },
      { i: 'news', x: 10, y: 3, w: 2, h: 3 },
      { i: 'centralBanks', x: 0, y: 6, w: 6, h: 2 },
      { i: 'economic', x: 6, y: 6, w: 6, h: 2 },
    ],
    md: [
      { i: 'favorites', x: 0, y: 0, w: 6, h: 3 },
      { i: 'performance', x: 6, y: 0, w: 6, h: 3 },
      { i: 'equity', x: 0, y: 3, w: 6, h: 3 },
      { i: 'sectors', x: 6, y: 3, w: 6, h: 3 },
      { i: 'fixedIncome', x: 0, y: 6, w: 4, h: 3 },
      { i: 'commodities', x: 4, y: 6, w: 4, h: 3 },
      { i: 'currency', x: 8, y: 6, w: 4, h: 3 },
      { i: 'housing', x: 0, y: 9, w: 4, h: 3 },
      { i: 'news', x: 4, y: 9, w: 8, h: 3 },
      { i: 'centralBanks', x: 0, y: 12, w: 6, h: 2 },
      { i: 'economic', x: 6, y: 12, w: 6, h: 2 },
    ],
    sm: [
      { i: 'favorites', x: 0, y: 0, w: 6, h: 3 },
      { i: 'performance', x: 0, y: 3, w: 6, h: 3 },
      { i: 'equity', x: 0, y: 6, w: 6, h: 3 },
      { i: 'sectors', x: 0, y: 9, w: 6, h: 3 },
      { i: 'fixedIncome', x: 0, y: 12, w: 6, h: 3 },
      { i: 'commodities', x: 0, y: 15, w: 6, h: 3 },
      { i: 'currency', x: 0, y: 18, w: 6, h: 3 },
      { i: 'housing', x: 0, y: 21, w: 6, h: 3 },
      { i: 'news', x: 0, y: 24, w: 6, h: 3 },
      { i: 'centralBanks', x: 0, y: 27, w: 6, h: 2 },
      { i: 'economic', x: 0, y: 29, w: 6, h: 2 },
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
      {/* Long-Term Investor Header */}
      <header className="bg-card border-b border-border p-2 mb-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-tight">INVESTOR COMMAND CENTER</h1>
            <p className="text-xs text-muted-foreground font-normal">Long-term wealth intelligence</p>
          </div>
          <div className="flex items-center gap-3">
            <ViewTabs />
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
        <div key="favorites">
          <FavoriteTickers />
        </div>
        
        <div key="performance">
          <PerformanceCenter />
        </div>
        
        <div key="equity">
          <EquityChart timeInterval={selectedInterval} />
        </div>
        
        <div key="sectors">
          <SectorsChart timeInterval={selectedInterval} />
        </div>
        
        <div key="fixedIncome">
          <FixedIncomeChart timeInterval={selectedInterval} />
        </div>
        
        <div key="commodities">
          <CompactCommodities />
        </div>
        
        <div key="currency">
          <CompactCurrency />
        </div>
        
        <div key="housing">
          <HousingChart timeInterval={selectedInterval} />
        </div>
        
        <div key="news">
          <FilteredNewsFeed />
        </div>
        
        <div key="centralBanks">
          <CentralBankRates />
        </div>
        
        <div key="economic">
          <EconomicIndicators />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Index;