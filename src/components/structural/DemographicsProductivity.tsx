import { TrendingUp, TrendingDown, Users, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const demographicData = [
  { year: '2020', us: 206.5, eu: 331.2, china: 996.8, india: 895.1 },
  { year: '2025', us: 208.1, eu: 328.4, china: 982.3, india: 927.4 },
  { year: '2030', us: 209.2, eu: 324.8, china: 963.1, india: 954.6 },
  { year: '2035', us: 209.8, eu: 320.1, china: 940.2, india: 976.8 },
  { year: '2040', us: 210.1, eu: 314.7, china: 915.4, india: 993.1 },
];

const productivityData = [
  { region: 'United States', productivity: 2.1, capital: 1.8, trend: 'up' },
  { region: 'Euro Area', productivity: 0.9, capital: 1.2, trend: 'down' },
  { region: 'China', productivity: 4.2, capital: 3.8, trend: 'up' },
  { region: 'Japan', productivity: 0.6, capital: 0.4, trend: 'down' },
  { region: 'India', productivity: 3.1, capital: 2.9, trend: 'up' },
];

const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export const DemographicsProductivity = () => {
  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-3 w-3 text-success" /> : 
      <TrendingDown className="h-3 w-3 text-destructive" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-3">
        <Users className="h-3 w-3 inline mr-1 text-primary" />
        DEMOGRAPHICS & PRODUCTIVITY
      </h3>
      
      {/* Working Age Population Trends */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10px] font-medium text-foreground">Working Age Population (Millions)</h4>
          <span className="text-[9px] text-muted-foreground">2020-2040</span>
        </div>
        
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={demographicData}>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
            <YAxis hide />
            <Line type="monotone" dataKey="us" stroke={colors[0]} strokeWidth={1.5} dot={false} name="US" />
            <Line type="monotone" dataKey="eu" stroke={colors[1]} strokeWidth={1.5} dot={false} name="EU" />
            <Line type="monotone" dataKey="china" stroke={colors[2]} strokeWidth={1.5} dot={false} name="China" />
            <Line type="monotone" dataKey="india" stroke={colors[3]} strokeWidth={1.5} dot={false} name="India" />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex justify-between text-[9px] mt-1">
          <span className="text-chart-1">US: -0.1%</span>
          <span className="text-chart-2">EU: -1.2%</span>
          <span className="text-chart-3">CN: -2.1%</span>
          <span className="text-chart-4">IN: +2.6%</span>
        </div>
      </div>

      {/* Productivity Growth */}
      <div>
        <h4 className="text-[10px] font-medium text-foreground mb-2">Labor Productivity Growth (%)</h4>
        
        <div className="space-y-1.5">
          {productivityData.map((item, index) => (
            <div key={item.region} className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-[10px] font-medium text-foreground truncate">{item.region}</span>
                {getTrendIcon(item.trend)}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-[10px] font-medium ${getTrendColor(item.trend)}`}>
                    {item.productivity}%
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    Cap: {item.capital}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/50 text-center">
        <div className="text-[9px] text-muted-foreground">
          Long-term Equity Returns Driver: <span className="text-primary font-medium">+1.8% Global Avg</span>
        </div>
      </div>
    </div>
  );
};