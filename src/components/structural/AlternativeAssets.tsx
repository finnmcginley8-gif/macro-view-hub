import { Plane, Palette, TreePine, Ship, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const alternativeAssets = [
  { 
    asset: 'Infrastructure', 
    index: 142.5, 
    change: 4.2, 
    yield: 6.8, 
    icon: Plane,
    description: 'Airports, Utilities'
  },
  { 
    asset: 'Art & Collectibles', 
    index: 238.7, 
    change: 8.1, 
    yield: null, 
    icon: Palette,
    description: 'Contemporary Art'
  },
  { 
    asset: 'Farmland', 
    index: 156.3, 
    change: 2.9, 
    yield: 4.2, 
    icon: TreePine,
    description: 'US Midwest'
  },
  { 
    asset: 'Shipping Rates', 
    index: 89.4, 
    change: -12.3, 
    yield: null, 
    icon: Ship,
    description: 'Baltic Dry Index'
  },
];

const shippingData = [
  { month: 'Jan', baltic: 125, container: 156 },
  { month: 'Feb', baltic: 118, container: 142 },
  { month: 'Mar', baltic: 132, container: 159 },
  { month: 'Apr', baltic: 98, container: 134 },
  { month: 'May', baltic: 89, container: 128 },
  { month: 'Jun', baltic: 94, container: 135 },
];

const farmlandData = [
  { region: 'US Midwest', price: 8420, change: 2.8 },
  { region: 'Argentina', price: 4150, change: 12.4 },
  { region: 'Brazil', price: 5680, change: 7.2 },
  { region: 'Australia', price: 6340, change: 1.9 },
];

export const AlternativeAssets = () => {
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getIntensityClass = (change: number) => {
    const abs = Math.abs(change);
    if (abs > 10) return 'font-bold';
    if (abs > 5) return 'font-semibold';
    return 'font-normal';
  };

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-3">
        <TreePine className="h-3 w-3 inline mr-1 text-success" />
        ALTERNATIVE ASSETS
      </h3>
      
      {/* Alternative Asset Performance */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Asset Performance (YTD)</h4>
        
        <div className="space-y-2">
          {alternativeAssets.map((asset) => {
            const Icon = asset.icon;
            return (
              <div key={asset.asset} className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors">
                <div className="flex items-center gap-2 flex-1">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-[10px] font-medium text-foreground">{asset.asset}</div>
                    <div className="text-[8px] text-muted-foreground">{asset.description}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-[10px] font-medium text-foreground">{asset.index}</div>
                  <div className={`text-[9px] ${getChangeColor(asset.change)} ${getIntensityClass(asset.change)}`}>
                    {asset.change > 0 ? '+' : ''}{asset.change}%
                  </div>
                  {asset.yield && (
                    <div className="text-[8px] text-muted-foreground">{asset.yield}% yield</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shipping & Freight */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Shipping Rates (Index)</h4>
        
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={shippingData}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="baltic" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2} 
              dot={false} 
              name="Baltic Dry"
            />
            <Line 
              type="monotone" 
              dataKey="container" 
              stroke="hsl(var(--chart-4))" 
              strokeWidth={2} 
              dot={false} 
              name="Container"
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex justify-between text-[8px] mt-1">
          <span className="text-chart-3">Baltic: 94 (-12%)</span>
          <span className="text-chart-4">Container: 135 (-8%)</span>
        </div>
      </div>

      {/* Farmland Prices */}
      <div>
        <h4 className="text-[10px] font-medium text-foreground mb-2">Farmland Prices ($/acre)</h4>
        
        <div className="space-y-1.5">
          {farmlandData.map((farm, index) => (
            <div key={farm.region} className="flex items-center justify-between p-1 hover:bg-muted/30 rounded transition-colors">
              <span className="text-[10px] font-medium text-foreground">{farm.region}</span>
              
              <div className="text-right">
                <div className="text-[10px] font-medium text-foreground">${farm.price.toLocaleString()}</div>
                <div className={`text-[9px] ${getChangeColor(farm.change)}`}>
                  {farm.change > 0 ? '+' : ''}{farm.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/50 text-center">
        <div className="text-[9px] text-muted-foreground">
          Alt Asset Allocation: <span className="text-primary font-medium">12.4% of Portfolios</span>
        </div>
      </div>
    </div>
  );
};