import { DollarSign, TrendingUp, Building, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const etfFlowData = [
  { sector: 'Technology', inflow: 12.4, trend: 'up' },
  { sector: 'AI/Robotics', inflow: 8.7, trend: 'up' },
  { sector: 'Clean Energy', inflow: 6.2, trend: 'up' },
  { sector: 'Healthcare', inflow: 3.1, trend: 'stable' },
  { sector: 'Financials', inflow: -2.3, trend: 'down' },
  { sector: 'Real Estate', inflow: -4.8, trend: 'down' },
];

const buybackData = [
  { quarter: 'Q1 23', announced: 198, executed: 178 },
  { quarter: 'Q2 23', announced: 223, executed: 201 },
  { quarter: 'Q3 23', announced: 187, executed: 195 },
  { quarter: 'Q4 23', announced: 245, executed: 221 },
  { quarter: 'Q1 24', announced: 267, executed: 239 },
];

const marketStructureMetrics = [
  { metric: 'IPO Pipeline', value: '127', unit: 'deals', change: '-23%' },
  { metric: 'SPAC Activity', value: '$4.2B', unit: '', change: '-67%' },
  { metric: 'PE Dry Powder', value: '$1.8T', unit: '', change: '+12%' },
  { metric: 'VC Funding', value: '$89B', unit: 'Q4', change: '-31%' },
];

export const MarketStructureFlows = () => {
  const getFlowColor = (inflow: number) => {
    if (inflow > 5) return 'hsl(var(--success))';
    if (inflow > 0) return 'hsl(var(--chart-2))';
    return 'hsl(var(--destructive))';
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-success';
    if (change.startsWith('-')) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-3">
        <DollarSign className="h-3 w-3 inline mr-1 text-primary" />
        MARKET STRUCTURE & FLOWS
      </h3>
      
      {/* ETF Flows by Sector */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">ETF Flows by Sector ($B, YTD)</h4>
        
        <div className="space-y-1.5">
          {etfFlowData.map((sector, index) => (
            <div key={sector.sector} className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-[10px] font-medium text-foreground truncate">{sector.sector}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${Math.abs(sector.inflow) * 8}%`, 
                      backgroundColor: getFlowColor(sector.inflow)
                    }}
                  />
                </div>
                <span className={`text-[10px] font-medium w-8 text-right ${
                  sector.inflow > 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {sector.inflow > 0 ? '+' : ''}{sector.inflow}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buyback Activity */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Share Buybacks ($B)</h4>
        
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={buybackData}>
            <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
            <YAxis hide />
            <Bar dataKey="announced" fill="hsl(var(--chart-1))" radius={[1, 1, 0, 0]} />
            <Bar dataKey="executed" fill="hsl(var(--chart-2))" radius={[1, 1, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="flex justify-between text-[8px] mt-1">
          <span className="text-chart-1">Announced: $267B</span>
          <span className="text-chart-2">Executed: $239B</span>
        </div>
      </div>

      {/* Market Structure Metrics */}
      <div className="grid grid-cols-2 gap-2">
        {marketStructureMetrics.map((metric) => (
          <div key={metric.metric} className="p-2 bg-muted/20 rounded border border-border/50">
            <div className="text-center">
              <div className="text-xs font-medium text-foreground">{metric.value}</div>
              <div className="text-[9px] text-muted-foreground mb-1">{metric.metric}</div>
              <div className={`text-[8px] font-medium ${getChangeColor(metric.change)}`}>
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-border/50">
        <div className="flex justify-between text-[9px]">
          <span className="text-muted-foreground">Liquidity Cycle:</span>
          <span className="text-warning font-medium">Late Expansion</span>
        </div>
      </div>
    </div>
  );
};