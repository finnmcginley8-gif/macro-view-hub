import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';
import { TimeInterval } from '../TimeIntervalSelector';
import { useChart } from '@/contexts/ChartContext';

interface SectorsChartProps {
  timeInterval: TimeInterval;
}

const sectorData = [
  { sector: 'Technology', value: 8.2, ytd: 12.4, symbol: 'XLK' },
  { sector: 'Healthcare', value: 4.1, ytd: 6.8, symbol: 'XLV' },
  { sector: 'Finance', value: 6.8, ytd: 15.2, symbol: 'XLF' },
  { sector: 'Energy', value: -2.3, ytd: 8.9, symbol: 'XLE' },
  { sector: 'Consumer Disc.', value: 3.7, ytd: 9.1, symbol: 'XLY' },
  { sector: 'Industrial', value: 5.2, ytd: 11.3, symbol: 'XLI' },
  { sector: 'Materials', value: 1.8, ytd: 7.6, symbol: 'XLB' },
  { sector: 'Utilities', value: 2.1, ytd: 4.2, symbol: 'XLU' },
];

export const EnhancedSectorsChart = ({ timeInterval }: SectorsChartProps) => {
  const { addTicker, removeTicker, selectedTickers } = useChart();

  const handleSectorToggle = (sector: any, checked: boolean) => {
    if (checked) {
      addTicker({
        symbol: sector.symbol,
        name: sector.sector + ' ETF',
        category: 'equity',
        color: 'hsl(var(--chart-2))'
      });
    } else {
      removeTicker(sector.symbol);
    }
  };

  const isTickerSelected = (symbol: string) => {
    return selectedTickers.some(t => t.symbol === symbol);
  };

  const getBarColor = (value: number) => {
    if (value > 5) return 'hsl(var(--success))';
    if (value > 0) return 'hsl(var(--chart-2))';
    return 'hsl(var(--destructive))';
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-foreground tracking-tight">SECTOR PERFORMANCE</h3>
        <div className="text-[9px] text-muted-foreground">YTD %</div>
      </div>

      {/* Sector Selection */}
      <div className="space-y-1 mb-3 max-h-32 overflow-y-auto">
        {sectorData.map((sector) => (
          <div key={sector.symbol} className="flex items-center justify-between p-1 hover:bg-muted/30 rounded transition-colors">
            <div className="flex items-center gap-1.5 flex-1">
              <Checkbox
                id={sector.symbol}
                checked={isTickerSelected(sector.symbol)}
                onCheckedChange={(checked) => handleSectorToggle(sector, !!checked)}
                className="h-3 w-3"
              />
              <label 
                htmlFor={sector.symbol}
                className="text-[10px] font-medium text-foreground cursor-pointer truncate"
              >
                {sector.sector}
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`text-[10px] font-medium ${
                sector.value > 0 ? 'text-success' : 'text-destructive'
              }`}>
                {sector.value > 0 ? '+' : ''}{sector.value}%
              </div>
              <div className="text-[9px] text-muted-foreground w-8 text-right">
                {sector.symbol}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={sectorData} layout="horizontal">
          <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            type="number"
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            tick={{ fontSize: 7 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            type="category"
            dataKey="sector"
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            tick={{ fontSize: 7 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              fontSize: '10px',
              padding: '4px 6px'
            }}
            formatter={(value: any) => [`${value}%`, 'Performance']}
          />
          <Bar 
            dataKey="value" 
            radius={[0, 2, 2, 0]}
          >
            {sectorData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={getBarColor(entry.value)} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};