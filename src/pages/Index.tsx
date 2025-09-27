import { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { TimeIntervalSelector, TimeInterval } from '@/components/TimeIntervalSelector';
import { EnhancedEquityChart } from '@/components/charts/EnhancedEquityChart';
import { EnhancedSectorsChart } from '@/components/charts/EnhancedSectorsChart';
import { EnhancedFixedIncomeChart } from '@/components/charts/EnhancedFixedIncomeChart';
import { CentralBankRates } from '@/components/data/CentralBankRates';
import { EconomicIndicators } from '@/components/data/EconomicIndicators';
import { HousingChart } from '@/components/charts/HousingChart';
import { CapitalIQFavorites } from '@/components/portfolio/CapitalIQFavorites';
import { CapitalIQChart } from '@/components/charts/CapitalIQChart';
import { FilteredNewsFeed } from '@/components/news/FilteredNewsFeed';
import { CompactCommodities } from '@/components/charts/CompactCommodities';
import { CompactCurrency } from '@/components/charts/CompactCurrency';
import { ViewTabs } from '@/components/layout/ViewTabs';
import { ChartProvider } from '@/contexts/ChartContext';
import { DemographicsProductivity } from '@/components/structural/DemographicsProductivity';
import { DebtSustainability } from '@/components/structural/DebtSustainability';
import { ClimateEnergyTransition } from '@/components/structural/ClimateEnergyTransition';
import { PolicyGeopolitics } from '@/components/structural/PolicyGeopolitics';
import { MarketStructureFlows } from '@/components/structural/MarketStructureFlows';
import { AlternativeAssets } from '@/components/structural/AlternativeAssets';
import { MetaSignals } from '@/components/structural/MetaSignals';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Index = () => {
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>('1M');
  
  // Organized coherent layout with logical groupings
  const defaultLayouts = {
    lg: [
      // TOP: Command Center (Portfolio + Analysis + Overview)
      { i: 'favorites', x: 0, y: 0, w: 3, h: 4 },
      { i: 'interactive', x: 3, y: 0, w: 6, h: 4 },
      { i: 'metaSignals', x: 9, y: 0, w: 3, h: 4 },
      
      // MARKET DATA: Core Markets (Equities, Bonds, Commodities, FX)
      { i: 'equity', x: 0, y: 4, w: 3, h: 3 },
      { i: 'sectors', x: 3, y: 4, w: 3, h: 3 },
      { i: 'fixedIncome', x: 6, y: 4, w: 3, h: 3 },
      { i: 'commodities', x: 9, y: 4, w: 1.5, h: 3 },
      { i: 'currency', x: 10.5, y: 4, w: 1.5, h: 3 },
      
      // STRUCTURAL ANALYSIS: Long-term Trends
      { i: 'demographics', x: 0, y: 7, w: 3, h: 3 },
      { i: 'debt', x: 3, y: 7, w: 3, h: 3 },
      { i: 'climate', x: 6, y: 7, w: 3, h: 3 },
      { i: 'policy', x: 9, y: 7, w: 3, h: 3 },
      
      // MARKET STRUCTURE: Flows & Alternative Assets
      { i: 'marketFlow', x: 0, y: 10, w: 4, h: 3 },
      { i: 'alternative', x: 4, y: 10, w: 4, h: 3 },
      { i: 'housing', x: 8, y: 10, w: 2, h: 3 },
      { i: 'news', x: 10, y: 10, w: 2, h: 3 },
      
      // ECONOMIC FOUNDATION: Central Banks & Indicators
      { i: 'centralBanks', x: 0, y: 13, w: 6, h: 2 },
      { i: 'economic', x: 6, y: 13, w: 6, h: 2 },
    ],
    md: [
      // Stacked layout for medium screens
      { i: 'favorites', x: 0, y: 0, w: 4, h: 4 },
      { i: 'interactive', x: 4, y: 0, w: 8, h: 4 },
      { i: 'metaSignals', x: 0, y: 4, w: 6, h: 3 },
      { i: 'equity', x: 6, y: 4, w: 6, h: 3 },
      { i: 'sectors', x: 0, y: 7, w: 4, h: 3 },
      { i: 'fixedIncome', x: 4, y: 7, w: 4, h: 3 },
      { i: 'commodities', x: 8, y: 7, w: 2, h: 3 },
      { i: 'currency', x: 10, y: 7, w: 2, h: 3 },
      { i: 'demographics', x: 0, y: 10, w: 6, h: 3 },
      { i: 'debt', x: 6, y: 10, w: 6, h: 3 },
      { i: 'climate', x: 0, y: 13, w: 6, h: 3 },
      { i: 'policy', x: 6, y: 13, w: 6, h: 3 },
      { i: 'marketFlow', x: 0, y: 16, w: 6, h: 3 },
      { i: 'alternative', x: 6, y: 16, w: 6, h: 3 },
      { i: 'housing', x: 0, y: 19, w: 4, h: 3 },
      { i: 'news', x: 4, y: 19, w: 8, h: 3 },
      { i: 'centralBanks', x: 0, y: 22, w: 6, h: 2 },
      { i: 'economic', x: 6, y: 22, w: 6, h: 2 },
    ],
    sm: [
      // Single column for mobile
      { i: 'favorites', x: 0, y: 0, w: 6, h: 4 },
      { i: 'interactive', x: 0, y: 4, w: 6, h: 4 },
      { i: 'metaSignals', x: 0, y: 8, w: 6, h: 3 },
      { i: 'equity', x: 0, y: 11, w: 6, h: 3 },
      { i: 'sectors', x: 0, y: 14, w: 6, h: 3 },
      { i: 'fixedIncome', x: 0, y: 17, w: 6, h: 3 },
      { i: 'commodities', x: 0, y: 20, w: 6, h: 3 },
      { i: 'currency', x: 0, y: 23, w: 6, h: 3 },
      { i: 'demographics', x: 0, y: 26, w: 6, h: 3 },
      { i: 'debt', x: 0, y: 29, w: 6, h: 3 },
      { i: 'climate', x: 0, y: 32, w: 6, h: 3 },
      { i: 'policy', x: 0, y: 35, w: 6, h: 3 },
      { i: 'marketFlow', x: 0, y: 38, w: 6, h: 3 },
      { i: 'alternative', x: 0, y: 41, w: 6, h: 3 },
      { i: 'housing', x: 0, y: 44, w: 6, h: 3 },
      { i: 'news', x: 0, y: 47, w: 6, h: 3 },
      { i: 'centralBanks', x: 0, y: 50, w: 6, h: 2 },
      { i: 'economic', x: 0, y: 52, w: 6, h: 2 },
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
    <ChartProvider>
      <div className="dashboard-container">
        {/* Capital IQ Pro Header */}
        <header className="bg-card border-b-2 border-primary/20 p-1.5 mb-0.5">
          <div className="flex items-center justify-between">{}
            <div>
            <h1 className="text-sm font-bold text-primary tracking-tight font-source">S&P Capital IQ Pro</h1>
            <p className="text-[11px] text-muted-foreground font-normal">Global Markets & Analytics Platform</p>
            </div>
            <div className="flex items-center gap-2">
              <ViewTabs />
              <div className="flex items-center gap-1.5">{}
                <button 
                  onClick={resetToDefault}
                  className="text-[10px] text-muted-foreground hover:text-primary transition-colors font-medium"
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
          rowHeight={50}
          isDraggable={true}
          isResizable={true}
          compactType="vertical"
          preventCollision={false}
          useCSSTransforms={true}
        >
          <div key="favorites">
            <CapitalIQFavorites />
          </div>
          
          <div key="interactive">
            <CapitalIQChart />
          </div>
          
          <div key="equity">
            <EnhancedEquityChart timeInterval={selectedInterval} />
          </div>
          
          <div key="sectors">
            <EnhancedSectorsChart timeInterval={selectedInterval} />
          </div>
          
          <div key="fixedIncome">
            <EnhancedFixedIncomeChart />
          </div>
          
          <div key="metaSignals">
            <MetaSignals />
          </div>
          
          <div key="demographics">
            <DemographicsProductivity />
          </div>
          
          <div key="debt">
            <DebtSustainability />
          </div>
          
          <div key="climate">
            <ClimateEnergyTransition />
          </div>
          
          <div key="policy">
            <PolicyGeopolitics />
          </div>
          
          <div key="marketFlow">
            <MarketStructureFlows />
          </div>
          
          <div key="alternative">
            <AlternativeAssets />
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
    </ChartProvider>
  );
};

export default Index;