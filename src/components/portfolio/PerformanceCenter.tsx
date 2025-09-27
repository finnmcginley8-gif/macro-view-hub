import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3, Activity, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const performanceData = [
  { date: 'Jan', portfolio: 100, sp500: 100, bonds: 100 },
  { date: 'Feb', portfolio: 102.3, sp500: 101.8, bonds: 99.5 },
  { date: 'Mar', portfolio: 105.1, sp500: 103.2, bonds: 98.8 },
  { date: 'Apr', portfolio: 107.8, sp500: 105.6, bonds: 100.2 },
  { date: 'May', portfolio: 109.2, sp500: 106.1, bonds: 101.1 },
  { date: 'Jun', portfolio: 112.5, sp500: 108.4, bonds: 102.3 },
];

const sectorAllocation = [
  { sector: 'Tech', allocation: 35, performance: 8.2 },
  { sector: 'Healthcare', allocation: 20, performance: 4.1 },
  { sector: 'Finance', allocation: 15, performance: 6.8 },
  { sector: 'Energy', allocation: 12, performance: -2.3 },
  { sector: 'Consumer', allocation: 10, performance: 3.7 },
  { sector: 'Others', allocation: 8, performance: 2.1 },
];

export const PerformanceCenter = () => {
  const [view, setView] = useState<'performance' | 'allocation' | 'risk'>('performance');

  const renderPerformanceView = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="text-lg font-bold text-success">+12.5%</div>
          <div className="text-[10px] text-muted-foreground">YTD Return</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">1.18</div>
          <div className="text-[10px] text-muted-foreground">Sharpe Ratio</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">8.7%</div>
          <div className="text-[10px] text-muted-foreground">Volatility</div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={performanceData}>
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
          <YAxis hide />
          <Line 
            type="monotone" 
            dataKey="portfolio" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2} 
            dot={false}
            name="Portfolio"
          />
          <Line 
            type="monotone" 
            dataKey="sp500" 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth={1} 
            strokeDasharray="3 3"
            dot={false}
            name="S&P 500"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between text-[10px]">
        <span className="text-muted-foreground">vs S&P 500:</span>
        <span className="text-success font-medium">+4.1% alpha</span>
      </div>
    </div>
  );

  const renderAllocationView = () => (
    <div className="space-y-2">
      {sectorAllocation.map((sector) => (
        <div key={sector.sector} className="flex items-center justify-between group">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-medium w-16">{sector.sector}</span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(sector.allocation / 40) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground w-8">{sector.allocation}%</span>
          </div>
          <div className={`text-[10px] font-medium w-12 text-right ${
            sector.performance > 0 ? 'text-success' : 'text-destructive'
          }`}>
            {sector.performance > 0 ? '+' : ''}{sector.performance}%
          </div>
        </div>
      ))}
    </div>
  );

  const renderRiskView = () => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-2 bg-muted/30 rounded">
          <div className="text-sm font-bold text-warning">0.82</div>
          <div className="text-[10px] text-muted-foreground">Beta</div>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded">
          <div className="text-sm font-bold text-primary">15.2%</div>
          <div className="text-[10px] text-muted-foreground">Max Drawdown</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">VaR (95%, 1D):</span>
          <span className="text-destructive">-2.1%</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Correlation w/ SPX:</span>
          <span className="text-foreground">0.76</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Downside Capture:</span>
          <span className="text-success">78%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-foreground tracking-tight">
          <Target className="h-3 w-3 inline mr-1 text-primary" />
          PORTFOLIO COMMAND
        </h3>
        
        <div className="flex gap-1">
          <Button 
            size="sm" 
            variant={view === 'performance' ? 'secondary' : 'ghost'} 
            className="h-5 px-2 text-[10px]"
            onClick={() => setView('performance')}
          >
            <TrendingUp className="h-2.5 w-2.5" />
          </Button>
          <Button 
            size="sm" 
            variant={view === 'allocation' ? 'secondary' : 'ghost'} 
            className="h-5 px-2 text-[10px]"
            onClick={() => setView('allocation')}
          >
            <BarChart3 className="h-2.5 w-2.5" />
          </Button>
          <Button 
            size="sm" 
            variant={view === 'risk' ? 'secondary' : 'ghost'} 
            className="h-5 px-2 text-[10px]"
            onClick={() => setView('risk')}
          >
            <Activity className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>
      
      {view === 'performance' && renderPerformanceView()}
      {view === 'allocation' && renderAllocationView()}
      {view === 'risk' && renderRiskView()}
    </div>
  );
};