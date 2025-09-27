import { Star, TrendingUp, TrendingDown, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Ticker {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  weeklyChange: number;
  monthlyChange: number;
  yearlyCAGR: number;
}

const mockFavorites: Ticker[] = [
  { 
    symbol: 'AAPL', 
    name: 'APPLE INC', 
    price: 193.42, 
    change: 2.34, 
    changePercent: 1.22,
    weeklyChange: -0.85,
    monthlyChange: 4.67,
    yearlyCAGR: 12.4
  },
  { 
    symbol: 'MSFT', 
    name: 'MICROSOFT CORP', 
    price: 378.85, 
    change: -1.45, 
    changePercent: -0.38,
    weeklyChange: 2.34,
    monthlyChange: 6.21,
    yearlyCAGR: 15.2
  },
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA CORP', 
    price: 875.28, 
    change: 15.67, 
    changePercent: 1.82,
    weeklyChange: 8.92,
    monthlyChange: 22.1,
    yearlyCAGR: 48.3
  },
  { 
    symbol: 'GOOGL', 
    name: 'ALPHABET INC', 
    price: 141.68, 
    change: 0.89, 
    changePercent: 0.63,
    weeklyChange: -1.24,
    monthlyChange: 3.45,
    yearlyCAGR: 9.8
  },
  { 
    symbol: 'TSLA', 
    name: 'TESLA INC', 
    price: 248.92, 
    change: -8.43, 
    changePercent: -3.28,
    weeklyChange: -5.12,
    monthlyChange: 12.8,
    yearlyCAGR: 28.9
  }
];

export const BloombergWatchlist = () => {
  const [favorites, setFavorites] = useState<Ticker[]>(mockFavorites);
  const [showAdd, setShowAdd] = useState(false);

  const removeFavorite = (symbol: string) => {
    setFavorites(prev => prev.filter(ticker => ticker.symbol !== symbol));
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'glow-green text-success';
    if (change < 0) return 'glow-red text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="chart-container">
      <div className="bloomberg-title p-1 mb-1 border-b border-foreground">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-accent-foreground tracking-widest">WATCHLIST</h3>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-3 w-3 p-0 text-accent-foreground hover:text-foreground"
            onClick={() => setShowAdd(!showAdd)}
          >
            <Plus className="h-2 w-2" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-0">
        {favorites.map((ticker, index) => (
          <TooltipProvider key={ticker.symbol}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="financial-row group bg-card hover:bloomberg-selected text-[10px] font-mono">
                  <div className="flex items-center gap-1 min-w-0 flex-1">
                    <span className="text-[8px] text-muted-foreground w-4">{index + 1}</span>
                    <span className="financial-ticker glow-blue text-primary font-bold">{ticker.symbol}</span>
                    {ticker.changePercent > 0 ? 
                      <TrendingUp className="h-2 w-2 text-success glow-green" /> : 
                      <TrendingDown className="h-2 w-2 text-destructive glow-red" />
                    }
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="financial-value text-[10px] glow-orange">${ticker.price}</div>
                      <div className={`text-[9px] font-bold ${getChangeColor(ticker.change)}`}>
                        {ticker.change > 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-2 w-2 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(ticker.symbol);
                      }}
                    >
                      <X className="h-1.5 w-1.5" />
                    </Button>
                  </div>
                </div>
              </TooltipTrigger>
              
              <TooltipContent side="right" className="text-[9px] bg-card border-border border-2 font-mono">
                <div className="space-y-0.5">
                  <div className="font-bold text-foreground glow-orange">{ticker.name}</div>
                  <div className="grid grid-cols-2 gap-2 text-[8px]">
                    <div>1W: <span className={getChangeColor(ticker.weeklyChange)}>{ticker.weeklyChange > 0 ? '+' : ''}{ticker.weeklyChange}%</span></div>
                    <div>1M: <span className={getChangeColor(ticker.monthlyChange)}>{ticker.monthlyChange > 0 ? '+' : ''}{ticker.monthlyChange}%</span></div>
                  </div>
                  <div className="text-[8px]">3Y CAGR: <span className="text-primary glow-blue font-bold">{ticker.yearlyCAGR}%</span></div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        {showAdd && (
          <div className="p-1 border border-dashed border-foreground bg-accent/10">
            <input 
              type="text" 
              placeholder="ENTER TICKER..."
              className="w-full bg-transparent text-[10px] text-center outline-none font-mono text-foreground glow-orange"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setShowAdd(false);
                }
              }}
              autoFocus
            />
          </div>
        )}
      </div>
      
      <div className="mt-1 pt-1 border-t border-foreground">
        <div className="flex justify-between items-center text-[9px] font-mono">
          <span className="text-muted-foreground">P&L TODAY:</span>
          <span className="text-success glow-green font-bold">+$24,670.32</span>
        </div>
        <div className="flex justify-between items-center text-[8px] font-mono">
          <span className="text-muted-foreground">TOTAL VALUE:</span>
          <span className="text-foreground glow-orange font-bold">$2,847,291.45</span>
        </div>
      </div>
    </div>
  );
};