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
    name: 'Apple Inc.', 
    price: 193.42, 
    change: 2.34, 
    changePercent: 1.22,
    weeklyChange: -0.85,
    monthlyChange: 4.67,
    yearlyCAGR: 12.4
  },
  { 
    symbol: 'MSFT', 
    name: 'Microsoft Corp', 
    price: 378.85, 
    change: -1.45, 
    changePercent: -0.38,
    weeklyChange: 2.34,
    monthlyChange: 6.21,
    yearlyCAGR: 15.2
  },
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA Corp', 
    price: 875.28, 
    change: 15.67, 
    changePercent: 1.82,
    weeklyChange: 8.92,
    monthlyChange: 22.1,
    yearlyCAGR: 48.3
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc', 
    price: 141.68, 
    change: 0.89, 
    changePercent: 0.63,
    weeklyChange: -1.24,
    monthlyChange: 3.45,
    yearlyCAGR: 9.8
  }
];

export const CapitalIQFavorites = () => {
  const [favorites, setFavorites] = useState<Ticker[]>(mockFavorites);
  const [showAdd, setShowAdd] = useState(false);

  const removeFavorite = (symbol: string) => {
    setFavorites(prev => prev.filter(ticker => ticker.symbol !== symbol));
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'financial-change-positive';
    if (change < 0) return 'financial-change-negative';
    return 'text-muted-foreground';
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-2">
        <h3 className="section-header">WATCHLIST</h3>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-4 w-4 p-0 text-primary"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-0.5">
        {favorites.map((ticker) => (
          <TooltipProvider key={ticker.symbol}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="financial-row group border-l-2 border-transparent hover:border-primary pl-1">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="financial-ticker text-primary">{ticker.symbol}</span>
                    {ticker.changePercent > 0 ? 
                      <TrendingUp className="h-2 w-2 text-success" /> : 
                      <TrendingDown className="h-2 w-2 text-destructive" />
                    }
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="financial-value text-[11px]">${ticker.price}</div>
                      <div className={`text-[9px] ${getChangeColor(ticker.change)}`}>
                        {ticker.change > 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-3 w-3 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(ticker.symbol);
                      }}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                </div>
              </TooltipTrigger>
              
              <TooltipContent side="right" className="text-[10px] bg-card border-border">
                <div className="space-y-1">
                  <div className="font-semibold text-primary">{ticker.name}</div>
                  <div>1W: <span className={getChangeColor(ticker.weeklyChange)}>{ticker.weeklyChange > 0 ? '+' : ''}{ticker.weeklyChange}%</span></div>
                  <div>1M: <span className={getChangeColor(ticker.monthlyChange)}>{ticker.monthlyChange > 0 ? '+' : ''}{ticker.monthlyChange}%</span></div>
                  <div>3Y CAGR: <span className="ciq-accent">{ticker.yearlyCAGR}%</span></div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        {showAdd && (
          <div className="p-1.5 border border-dashed border-primary/30 rounded bg-primary/5">
            <input 
              type="text" 
              placeholder="Enter ticker..."
              className="w-full bg-transparent text-[10px] text-center outline-none font-mono"
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
      
      <div className="mt-2 pt-1.5 border-t border-border/50">
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-muted-foreground">Portfolio P&L:</span>
          <span className="ciq-accent">+$24,670</span>
        </div>
      </div>
    </div>
  );
};