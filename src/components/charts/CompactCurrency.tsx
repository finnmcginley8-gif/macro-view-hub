import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface CurrencyPair {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
  flag: string;
}

const currencyPairs: CurrencyPair[] = [
  { pair: 'EUR/USD', rate: 1.0845, change: 0.0023, changePercent: 0.21, flag: '🇪🇺' },
  { pair: 'GBP/USD', rate: 1.2634, change: -0.0045, changePercent: -0.35, flag: '🇬🇧' },
  { pair: 'USD/JPY', rate: 149.75, change: 0.85, changePercent: 0.57, flag: '🇯🇵' },
  { pair: 'USD/CHF', rate: 0.9234, change: -0.0012, changePercent: -0.13, flag: '🇨🇭' },
];

export const CompactCurrency = () => {
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getIntensityClass = (changePercent: number) => {
    const abs = Math.abs(changePercent);
    if (abs > 0.5) return 'font-semibold';
    return 'font-normal';
  };

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-2">
        <DollarSign className="h-3 w-3 inline mr-1 text-primary" />
        FOREX
      </h3>
      
      <div className="space-y-1.5">
        {currencyPairs.map((currency) => (
          <div 
            key={currency.pair} 
            className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{currency.flag}</span>
              <span className="text-[10px] font-medium text-foreground">{currency.pair}</span>
              {Math.abs(currency.changePercent) > 0.3 && (
                currency.changePercent > 0 ? 
                  <TrendingUp className="h-2 w-2 text-success" /> : 
                  <TrendingDown className="h-2 w-2 text-destructive" />
              )}
            </div>
            
            <div className="text-right">
              <div className="text-xs font-medium text-foreground">{currency.rate.toFixed(4)}</div>
              <div className={`text-[9px] ${getChangeColor(currency.change)} ${getIntensityClass(currency.changePercent)}`}>
                {currency.change > 0 ? '+' : ''}{currency.changePercent.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 pt-2 border-t border-border/50">
        <div className="flex justify-between text-[9px]">
          <span className="text-muted-foreground">VIX Currency:</span>
          <span className="text-warning font-medium">12.3 (+0.8)</span>
        </div>
      </div>
    </div>
  );
};