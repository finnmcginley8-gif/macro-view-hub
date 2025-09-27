import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';
import { TimeInterval } from '../TimeIntervalSelector';
import { useChart } from '@/contexts/ChartContext';

interface EquityChartProps {
  timeInterval: TimeInterval;
}

// Realistic equity growth patterns
const generateMockData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 365;
  const data = [];
  
  // Base prices with historical growth trends
  let basePrices = {
    SP500: 3800,
    FTSE: 7200,
    CAC40: 6800,
    NIKKEI: 30000,
    DAX: 15000,
  };

  // Growth factors for realistic long-term trends
  const growthFactors = {
    SP500: 0.12, // 12% annual growth
    FTSE: 0.08,  // 8% annual growth
    CAC40: 0.09, // 9% annual growth
    NIKKEI: 0.06, // 6% annual growth
    DAX: 0.10,   // 10% annual growth
  };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    Object.keys(basePrices).forEach(index => {
      const growthFactor = growthFactors[index];
      const timeProgress = i / dataPoints;
      
      // Add growth trend
      const trendGrowth = growthFactor * timeProgress * (interval === '1Y' ? 1 : interval === '1M' ? 0.08 : 0.01);
      
      // Add realistic volatility
      const volatility = interval === '1D' ? 0.008 : interval === '1W' ? 0.015 : 0.025;
      const randomChange = (Math.random() - 0.48) * volatility; // Slight upward bias
      
      basePrices[index] *= (1 + trendGrowth + randomChange);
    });
    
    data.push({
      date: interval === '1D' ? baseDate.toLocaleTimeString() : baseDate.toLocaleDateString(),
      SP500: Math.round(basePrices.SP500 * 100) / 100,
      FTSE: Math.round(basePrices.FTSE * 100) / 100,
      CAC40: Math.round(basePrices.CAC40 * 100) / 100,
      NIKKEI: Math.round(basePrices.NIKKEI * 100) / 100,
      DAX: Math.round(basePrices.DAX * 100) / 100,
    });
  }
  
  return data;
};

const equityTickers = [
  { symbol: 'SPX', name: 'S&P 500', key: 'SP500' },
  { symbol: 'FTSE', name: 'FTSE 100', key: 'FTSE' },
  { symbol: 'CAC', name: 'CAC 40', key: 'CAC40' },
  { symbol: 'N225', name: 'Nikkei 225', key: 'NIKKEI' },
  { symbol: 'DAX', name: 'DAX', key: 'DAX' },
];

export const EnhancedEquityChart = ({ timeInterval }: EquityChartProps) => {
  const data = generateMockData(timeInterval);
  const { addTicker, removeTicker, selectedTickers } = useChart();

  const handleTickerToggle = (ticker: any, checked: boolean) => {
    if (checked) {
      addTicker({
        symbol: ticker.symbol,
        name: ticker.name,
        category: 'equity',
        color: 'hsl(var(--chart-1))'
      });
    } else {
      removeTicker(ticker.symbol);
    }
  };

  const isTickerSelected = (symbol: string) => {
    return selectedTickers.some(t => t.symbol === symbol);
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-foreground tracking-tight">GLOBAL EQUITIES</h3>
        <div className="text-[9px] text-muted-foreground">Check to compare →</div>
      </div>
      
      {/* Ticker Selection */}
      <div className="grid grid-cols-2 gap-1 mb-3">
        {equityTickers.map((ticker) => (
          <div key={ticker.symbol} className="flex items-center gap-1.5 p-1 hover:bg-muted/30 rounded transition-colors">
            <Checkbox
              id={ticker.symbol}
              checked={isTickerSelected(ticker.symbol)}
              onCheckedChange={(checked) => handleTickerToggle(ticker, !!checked)}
              className="h-3 w-3"
            />
            <label 
              htmlFor={ticker.symbol}
              className="text-[10px] font-medium text-foreground cursor-pointer flex-1"
            >
              {ticker.symbol}
            </label>
            <div className="text-[9px] text-muted-foreground">
              {data[data.length - 1]?.[ticker.key]?.toFixed(0)}
            </div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            tick={{ fontSize: 7 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            tick={{ fontSize: 7 }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              fontSize: '10px',
              padding: '4px 6px'
            }}
          />
          <Line type="monotone" dataKey="SP500" stroke="hsl(var(--chart-1))" strokeWidth={1.5} name="SPX" dot={false} />
          <Line type="monotone" dataKey="FTSE" stroke="hsl(var(--chart-2))" strokeWidth={1.5} name="FTSE" dot={false} />
          <Line type="monotone" dataKey="CAC40" stroke="hsl(var(--chart-3))" strokeWidth={1.5} name="CAC" dot={false} />
          <Line type="monotone" dataKey="NIKKEI" stroke="hsl(var(--chart-4))" strokeWidth={1.5} name="N225" dot={false} />
          <Line type="monotone" dataKey="DAX" stroke="hsl(var(--chart-5))" strokeWidth={1.5} name="DAX" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};