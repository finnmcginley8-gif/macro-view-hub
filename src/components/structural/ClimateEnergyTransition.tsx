import { Leaf, Zap, Factory, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const energyMixData = [
  { name: 'Renewable', value: 28.7, color: 'hsl(var(--success))' },
  { name: 'Natural Gas', value: 24.3, color: 'hsl(var(--warning))' },
  { name: 'Coal', value: 19.1, color: 'hsl(var(--destructive))' },
  { name: 'Nuclear', value: 15.8, color: 'hsl(var(--primary))' },
  { name: 'Oil', value: 12.1, color: 'hsl(var(--muted-foreground))' },
];

const carbonPriceData = [
  { year: '2020', eu: 25, ca: 18, china: 7 },
  { year: '2021', eu: 54, ca: 22, china: 8 },
  { year: '2022', eu: 81, ca: 31, china: 9 },
  { year: '2023', eu: 83, ca: 42, china: 12 },
  { year: '2024', eu: 71, ca: 52, china: 14 },
];

const transitionMetrics = [
  { metric: 'Renewable Capacity', value: '3,372 GW', change: '+12.8%', icon: Zap },
  { metric: 'Grid Investment', value: '$310B', change: '+18.2%', icon: TrendingUp },
  { metric: 'EV Market Share', value: '14.1%', change: '+3.1pp', icon: Leaf },
  { metric: 'Coal Retirements', value: '23.1 GW', change: '+45%', icon: Factory },
];

export const ClimateEnergyTransition = () => {
  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-3">
        <Leaf className="h-3 w-3 inline mr-1 text-success" />
        CLIMATE & ENERGY TRANSITION
      </h3>
      
      {/* Energy Mix */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10px] font-medium text-foreground">Global Energy Mix</h4>
          <span className="text-[9px] text-muted-foreground">2024</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-16 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={energyMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={12}
                  outerRadius={30}
                  dataKey="value"
                  stroke="none"
                >
                  {energyMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-1">
            {energyMixData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[9px] font-medium text-foreground">{item.name}</span>
                </div>
                <span className="text-[9px] text-muted-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carbon Pricing */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Carbon Price Trends ($/tCO2)</h4>
        
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={carbonPriceData}>
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
            <YAxis hide />
            <Line type="monotone" dataKey="eu" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ca" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="china" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex justify-between text-[8px] mt-1">
          <span className="text-chart-1">EU ETS: $71</span>
          <span className="text-chart-2">Canada: $52</span>
          <span className="text-chart-3">China: $14</span>
        </div>
      </div>

      {/* Transition Metrics */}
      <div className="space-y-1.5">
        {transitionMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.metric} className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors">
              <div className="flex items-center gap-2">
                <Icon className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-medium text-foreground">{metric.metric}</span>
              </div>
              
              <div className="text-right">
                <div className="text-[10px] font-medium text-foreground">{metric.value}</div>
                <div className="text-[9px] text-success">{metric.change}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-2 border-t border-border/50 text-center">
        <div className="text-[9px] text-muted-foreground">
          Net Zero Target: <span className="text-success font-medium">2050 (78 countries)</span>
        </div>
      </div>
    </div>
  );
};