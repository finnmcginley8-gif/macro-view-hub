import { TrendingUp, TrendingDown, Fuel, Coins } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useChart } from '@/contexts/ChartContext';

interface Commodity {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
  icon: any;
}

const commodities: Commodity[] = [
  { symbol: 'CL', name: 'Crude Oil', price: 87.45, change: 1.23, changePercent: 1.43, unit: '/bbl', icon: Fuel },
  { symbol: 'GC', name: 'Gold', price: 2048.30, change: -8.50, changePercent: -0.41, unit: '/oz', icon: Coins },
  { symbol: 'SI', name: 'Silver', price: 24.67, change: 0.15, changePercent: 0.61, unit: '/oz', icon: Coins },
  { symbol: 'NG', name: 'Natural Gas', price: 2.89, change: -0.05, changePercent: -1.70, unit: '/mmbtu', icon: Fuel },
];

export const CompactCommodities = () => {
  const { addTicker, removeTicker, selectedTickers } = useChart();
  const handleCommodityToggle = (commodity: Commodity, checked: boolean) => {
    if (checked) {
      addTicker({
        symbol: commodity.symbol,
        name: commodity.name,
        category: 'commodity',
        color: 'hsl(var(--chart-4))'
      });
    } else {
      removeTicker(commodity.symbol);
    }
  };

  const isTickerSelected = (symbol: string) => {
    return selectedTickers.some(t => t.symbol === symbol);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getIntensityClass = (changePercent: number) => {
    const abs = Math.abs(changePercent);
    if (abs > 2) return 'font-bold bg-opacity-20 ' + (changePercent > 0 ? 'bg-success' : 'bg-destructive');
    if (abs > 1) return 'font-semibold';
    return 'font-normal';
  };

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-2">
        <Fuel className="h-3 w-3 inline mr-1 text-warning" />
        COMMODITIES
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {commodities.map((commodity) => {
          const Icon = commodity.icon;
          return (
            <div 
              key={commodity.symbol} 
              className={`p-2 rounded border border-border/50 hover:border-border transition-colors ${getIntensityClass(commodity.changePercent)}`}
            >
              <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <Checkbox
                  id={commodity.symbol}
                  checked={isTickerSelected(commodity.symbol)}
                  onCheckedChange={(checked) => handleCommodityToggle(commodity, !!checked)}
                  className="h-3 w-3"
                />
                <Icon className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-medium text-foreground">{commodity.symbol}</span>
              </div>
                {Math.abs(commodity.changePercent) > 1 && (
                  commodity.changePercent > 0 ? 
                    <TrendingUp className="h-2.5 w-2.5 text-success" /> : 
                    <TrendingDown className="h-2.5 w-2.5 text-destructive" />
                )}
              </div>
              
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-medium text-foreground">${commodity.price}</span>
                  <span className="text-[9px] text-muted-foreground">{commodity.unit}</span>
                </div>
                
                <div className={`text-[10px] ${getChangeColor(commodity.change)}`}>
                  {commodity.change > 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%
                  <span className="ml-1 text-muted-foreground">
                    ({commodity.change > 0 ? '+' : ''}{commodity.change.toFixed(2)})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-2 pt-2 border-t border-border/50 text-center">
        <div className="text-[9px] text-muted-foreground">
          DXY: <span className="text-foreground font-medium">103.45 (-0.12%)</span>
        </div>
      </div>
    </div>
  );
};