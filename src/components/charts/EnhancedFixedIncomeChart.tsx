import { TrendingUp, TrendingDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useChart } from '@/contexts/ChartContext';

interface Bond {
  symbol: string;
  name: string;
  yield: number;
  change: number;
  changePercent: number;
  duration: string;
}

const bonds: Bond[] = [
  { symbol: 'US10Y', name: 'US 10Y Treasury', yield: 4.52, change: 0.08, changePercent: 1.80, duration: '8.2Y' },
  { symbol: 'US02Y', name: 'US 2Y Treasury', yield: 4.89, change: 0.12, changePercent: 2.51, duration: '1.9Y' },
  { symbol: 'US30Y', name: 'US 30Y Treasury', yield: 4.71, change: 0.05, changePercent: 1.07, duration: '18.1Y' },
  { symbol: 'DE10Y', name: 'German 10Y Bund', yield: 2.34, change: -0.02, changePercent: -0.84, duration: '8.8Y' },
  { symbol: 'GB10Y', name: 'UK 10Y Gilt', yield: 4.15, change: 0.03, changePercent: 0.73, duration: '9.1Y' },
  { symbol: 'JP10Y', name: 'Japan 10Y Bond', yield: 0.68, change: 0.01, changePercent: 1.49, duration: '7.2Y' },
];

export const EnhancedFixedIncomeChart = () => {
  const { addTicker, removeTicker, selectedTickers } = useChart();

  const handleBondToggle = (bond: Bond, checked: boolean) => {
    if (checked) {
      addTicker({
        symbol: bond.symbol,
        name: bond.name,
        category: 'bond',
        color: 'hsl(var(--chart-3))'
      });
    } else {
      removeTicker(bond.symbol);
    }
  };

  const isTickerSelected = (symbol: string) => {
    return selectedTickers.some(t => t.symbol === symbol);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-destructive'; // Rising yields = falling prices
    if (change < 0) return 'text-success';
    return 'text-muted-foreground';
  };

  const getIntensityClass = (changePercent: number) => {
    const abs = Math.abs(changePercent);
    if (abs > 2) return 'font-bold';
    if (abs > 1) return 'font-semibold';
    return 'font-normal';
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-foreground tracking-tight">FIXED INCOME</h3>
        <div className="text-[9px] text-muted-foreground">Yield %</div>
      </div>
      
      <div className="space-y-1.5">
        {bonds.map((bond) => (
          <div 
            key={bond.symbol} 
            className={`flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors group ${
              Math.abs(bond.changePercent) > 1.5 ? 'bg-muted/20' : ''
            }`}
          >
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <Checkbox
                id={bond.symbol}
                checked={isTickerSelected(bond.symbol)}
                onCheckedChange={(checked) => handleBondToggle(bond, !!checked)}
                className="h-3 w-3"
              />
              
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <span className="text-[10px] font-medium text-foreground">{bond.symbol}</span>
                {Math.abs(bond.changePercent) > 1 && (
                  bond.changePercent > 0 ? 
                    <TrendingUp className="h-2 w-2 text-destructive" /> : 
                    <TrendingDown className="h-2 w-2 text-success" />
                )}
                <span className="text-[9px] text-muted-foreground truncate">
                  {bond.duration}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs font-medium text-foreground">{bond.yield.toFixed(2)}%</div>
              <div className={`text-[9px] ${getChangeColor(bond.change)} ${getIntensityClass(bond.changePercent)}`}>
                {bond.change > 0 ? '+' : ''}{bond.changePercent.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 pt-2 border-t border-border/50">
        <div className="flex justify-between text-[9px]">
          <span className="text-muted-foreground">10Y-2Y Spread:</span>
          <span className="text-warning font-medium">-37 bps</span>
        </div>
      </div>
    </div>
  );
};