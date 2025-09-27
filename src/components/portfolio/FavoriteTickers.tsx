import { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Plus, X } from 'lucide-react';
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
    name: 'Microsoft', 
    price: 378.85, 
    change: -1.45, 
    changePercent: -0.38,
    weeklyChange: 2.34,
    monthlyChange: 6.21,
    yearlyCAGR: 15.2
  },
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA', 
    price: 875.28, 
    change: 15.67, 
    changePercent: 1.82,
    weeklyChange: 8.92,
    monthlyChange: 22.1,
    yearlyCAGR: 48.3
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet', 
    price: 141.68, 
    change: 0.89, 
    changePercent: 0.63,
    weeklyChange: -1.24,
    monthlyChange: 3.45,
    yearlyCAGR: 9.8
  }
];

export const FavoriteTickers = () => {
  const [favorites, setFavorites] = useState<Ticker[]>(mockFavorites);
  const [showAdd, setShowAdd] = useState(false);

  const removeFavorite = (symbol: string) => {
    setFavorites(prev => prev.filter(ticker => ticker.symbol !== symbol));
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getIntensityClass = (changePercent: number) => {
    const abs = Math.abs(changePercent);
    if (abs > 5) return 'font-bold shadow-sm';
    if (abs > 2) return 'font-semibold';
    if (abs > 1) return 'font-medium';
    return 'font-normal';
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-foreground tracking-tight">
          <Star className="h-3 w-3 inline mr-1 text-warning" />
          PORTFOLIO ANCHORS
        </h3>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-4 w-4 p-0"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-1">
        {favorites.map((ticker) => (
          <TooltipProvider key={ticker.symbol}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group flex items-center justify-between p-1.5 rounded hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-xs font-medium text-foreground">{ticker.symbol}</span>
                    <span className="text-[10px] text-muted-foreground truncate max-w-16">{ticker.name}</span>
                    {ticker.changePercent > 0 ? 
                      <TrendingUp className="h-2.5 w-2.5 text-success opacity-60" /> : 
                      <TrendingDown className="h-2.5 w-2.5 text-destructive opacity-60" />
                    }
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs font-medium text-foreground">${ticker.price}</div>
                      <div className={`text-[10px] ${getChangeColor(ticker.change)} ${getIntensityClass(ticker.changePercent)}`}>
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
              
              <TooltipContent side="bottom" className="text-xs">
                <div className="space-y-1">
                  <div>Weekly: <span className={getChangeColor(ticker.weeklyChange)}>{ticker.weeklyChange > 0 ? '+' : ''}{ticker.weeklyChange}%</span></div>
                  <div>Monthly: <span className={getChangeColor(ticker.monthlyChange)}>{ticker.monthlyChange > 0 ? '+' : ''}{ticker.monthlyChange}%</span></div>
                  <div>3Y CAGR: <span className="text-primary font-medium">{ticker.yearlyCAGR}%</span></div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        {showAdd && (
          <div className="p-2 border border-dashed border-muted-foreground/30 rounded text-center">
            <input 
              type="text" 
              placeholder="Add ticker..."
              className="w-full bg-transparent text-xs text-center outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setShowAdd(false);
                  // Add ticker logic here
                }
              }}
              autoFocus
            />
          </div>
        )}
      </div>
      
      <div className="mt-2 pt-2 border-t border-border/50">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-muted-foreground">Portfolio Balance:</span>
          <span className="text-primary font-medium">+8.7% YTD</span>
        </div>
      </div>
    </div>
  );
};