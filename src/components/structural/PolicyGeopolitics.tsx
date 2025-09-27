import { Globe, Shield, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const tradeFlowData = [
  { year: '2020', balance: -308.1, exports: 124.5, imports: 435.4 },
  { year: '2021', balance: -355.3, exports: 151.1, imports: 506.4 },
  { year: '2022', balance: -382.9, exports: 153.8, imports: 536.7 },
  { year: '2023', balance: -279.4, exports: 147.8, imports: 427.2 },
  { year: '2024', balance: -252.1, exports: 152.3, imports: 404.4 },
];

const geopoliticalRisk = [
  { region: 'Eastern Europe', risk: 85, trend: 'up', events: 'Ukraine conflict' },
  { region: 'Middle East', risk: 72, trend: 'stable', events: 'Regional tensions' },
  { region: 'South China Sea', risk: 68, trend: 'up', events: 'Territorial disputes' },
  { region: 'Taiwan Strait', risk: 76, trend: 'up', events: 'Military exercises' },
  { region: 'Red Sea', risk: 45, trend: 'down', events: 'Shipping routes' },
];

const defenseSpending = [
  { country: 'United States', spending: 816, gdp: 3.5, change: 2.8 },
  { country: 'China', spending: 292, gdp: 1.7, change: 7.2 },
  { country: 'Russia', spending: 109, gdp: 4.1, change: 24.1 },
  { country: 'India', spending: 76, gdp: 2.4, change: 4.2 },
  { country: 'Saudi Arabia', spending: 69, gdp: 8.8, change: -17.2 },
];

export const PolicyGeopolitics = () => {
  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'hsl(var(--destructive))';
    if (risk >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--success))';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-2.5 w-2.5 text-destructive" />;
      case 'down': return <TrendingDown className="h-2.5 w-2.5 text-success" />;
      default: return <span className="h-2.5 w-2.5 text-warning">→</span>;
    }
  };

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-3">
        <Globe className="h-3 w-3 inline mr-1 text-primary" />
        POLICY & GEOPOLITICS
      </h3>
      
      {/* US-China Trade Balance */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10px] font-medium text-foreground">US-China Trade Balance</h4>
          <span className="text-[9px] text-muted-foreground">$B</span>
        </div>
        
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={tradeFlowData}>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2} 
              dot={false} 
              name="Trade Balance"
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex justify-between text-[9px] mt-1">
          <span className="text-muted-foreground">2024 Deficit:</span>
          <span className="text-destructive font-medium">-$252.1B</span>
        </div>
      </div>

      {/* Geopolitical Risk Index */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Geopolitical Risk Index</h4>
        
        <div className="space-y-1.5">
          {geopoliticalRisk.map((item, index) => (
            <div key={item.region} className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-[10px] font-medium text-foreground truncate">{item.region}</span>
                {getTrendIcon(item.trend)}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${item.risk}%`, 
                      backgroundColor: getRiskColor(item.risk)
                    }}
                  />
                </div>
                <span className="text-[10px] font-medium text-foreground w-6">{item.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Defense Spending */}
      <div>
        <h4 className="text-[10px] font-medium text-foreground mb-2">Defense Spending (2024)</h4>
        
        <div className="space-y-1.5">
          {defenseSpending.slice(0, 3).map((country, index) => (
            <div key={country.country} className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-medium text-foreground">{country.country}</span>
              </div>
              
              <div className="text-right">
                <div className="text-[10px] font-medium text-foreground">${country.spending}B</div>
                <div className={`text-[9px] ${country.change > 0 ? 'text-destructive' : 'text-success'}`}>
                  {country.change > 0 ? '+' : ''}{country.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/50">
        <div className="flex items-center justify-center gap-2 text-[9px]">
          <AlertTriangle className="h-3 w-3 text-warning" />
          <span className="text-muted-foreground">Global Risk Level:</span>
          <span className="text-warning font-medium">Elevated</span>
        </div>
      </div>
    </div>
  );
};