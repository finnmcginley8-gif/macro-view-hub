import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface EquityChartProps {
  timeInterval: TimeInterval;
}

// More realistic stock market data generation
const generateMockData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 365;
  const data = [];
  
  // Base prices for major indices
  let basePrices = {
    SP500: 4200,
    FTSE: 7800,
    CAC40: 7200,
    NIKKEI: 33000,
    DAX: 16000,
  };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    // Generate realistic stock movements with proper volatility
    Object.keys(basePrices).forEach(index => {
      const volatility = interval === '1D' ? 0.002 : interval === '1W' ? 0.01 : 0.03;
      const change = (Math.random() - 0.5) * 2 * volatility;
      basePrices[index] *= (1 + change);
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

export const EquityChart = ({ timeInterval }: EquityChartProps) => {
  const data = generateMockData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-sm font-semibold mb-2 text-foreground">Global Equity Indices</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={9}
            tick={{ fontSize: 9 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={9}
            tick={{ fontSize: 9 }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="SP500" stroke="hsl(var(--chart-1))" strokeWidth={2} name="S&P 500" />
          <Line type="monotone" dataKey="FTSE" stroke="hsl(var(--chart-2))" strokeWidth={2} name="FTSE 100" />
          <Line type="monotone" dataKey="CAC40" stroke="hsl(var(--chart-3))" strokeWidth={2} name="CAC 40" />
          <Line type="monotone" dataKey="NIKKEI" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Nikkei 225" />
          <Line type="monotone" dataKey="DAX" stroke="hsl(var(--chart-5))" strokeWidth={2} name="DAX" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};