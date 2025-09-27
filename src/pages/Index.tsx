import { useState } from 'react';
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

const Index = () => {
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>('1M');

  return (
    <div className="min-h-screen bg-background">
      {/* Header with time selector */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Global Market Dashboard</h1>
            <p className="text-sm text-muted-foreground font-mono">Real-time market data and economic indicators</p>
          </div>
          <TimeIntervalSelector 
            selectedInterval={selectedInterval}
            onIntervalChange={setSelectedInterval}
          />
        </div>
      </header>

      {/* Dashboard Grid */}
      <main className="dashboard-grid">
        {/* Row 1: Major Charts */}
        <div className="col-span-6 row-span-2">
          <EquityChart timeInterval={selectedInterval} />
        </div>
        <div className="col-span-3 row-span-2">
          <SectorsChart timeInterval={selectedInterval} />
        </div>
        <div className="col-span-3 row-span-2">
          <FixedIncomeChart timeInterval={selectedInterval} />
        </div>

        {/* Row 2: Data Tables */}
        <div className="col-span-6 row-span-1">
          <CentralBankRates />
        </div>
        <div className="col-span-6 row-span-1">
          <EconomicIndicators />
        </div>

        {/* Row 3: Additional Charts */}
        <div className="col-span-4 row-span-2">
          <CurrencyChart timeInterval={selectedInterval} />
        </div>
        <div className="col-span-4 row-span-2">
          <CommoditiesChart timeInterval={selectedInterval} />
        </div>
        <div className="col-span-4 row-span-2">
          <HousingChart timeInterval={selectedInterval} />
        </div>

        {/* Row 4: News Feed */}
        <div className="col-span-12 row-span-1">
          <NewsFeed />
        </div>
      </main>
    </div>
  );
};

export default Index;