import { createContext, useContext, useState, ReactNode } from 'react';

export interface SelectedTicker {
  symbol: string;
  name: string;
  category: 'equity' | 'fx' | 'bond' | 'commodity' | 'crypto';
  color: string;
  data?: { date: string; value: number }[];
}

interface ChartContextType {
  selectedTickers: SelectedTicker[];
  addTicker: (ticker: SelectedTicker) => void;
  removeTicker: (symbol: string) => void;
  clearAll: () => void;
  chartMode: 'overlay' | 'compare';
  setChartMode: (mode: 'overlay' | 'compare') => void;
  timeframe: '1D' | '1W' | '1M' | '1Y' | '5Y' | 'MAX';
  setTimeframe: (timeframe: '1D' | '1W' | '1M' | '1Y' | '5Y' | 'MAX') => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

const categoryColors = {
  equity: 'hsl(var(--chart-1))',
  fx: 'hsl(var(--chart-2))',
  bond: 'hsl(var(--chart-3))',
  commodity: 'hsl(var(--chart-4))',
  crypto: 'hsl(var(--chart-5))'
};

export function ChartProvider({ children }: { children: ReactNode }) {
  const [selectedTickers, setSelectedTickers] = useState<SelectedTicker[]>([]);
  const [chartMode, setChartMode] = useState<'overlay' | 'compare'>('compare');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | '5Y' | 'MAX'>('1Y');

  const addTicker = (ticker: SelectedTicker) => {
    setSelectedTickers(prev => {
      // Don't add duplicates
      if (prev.some(t => t.symbol === ticker.symbol)) return prev;
      
      // Assign color based on category
      const tickerWithColor = {
        ...ticker,
        color: categoryColors[ticker.category]
      };
      
      return [...prev, tickerWithColor];
    });
  };

  const removeTicker = (symbol: string) => {
    setSelectedTickers(prev => prev.filter(t => t.symbol !== symbol));
  };

  const clearAll = () => {
    setSelectedTickers([]);
  };

  return (
    <ChartContext.Provider value={{
      selectedTickers,
      addTicker,
      removeTicker,
      clearAll,
      chartMode,
      setChartMode,
      timeframe,
      setTimeframe
    }}>
      {children}
    </ChartContext.Provider>
  );
}

export function useChart() {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
}