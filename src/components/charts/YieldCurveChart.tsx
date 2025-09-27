import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface YieldCurveChartProps {
  timeInterval: TimeInterval;
}

const generateYieldCurveData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 30 : interval === '1W' ? 90 : interval === '1M' ? 360 : 1260;
  const data = [];
  
  let spread = 0.25; // Starting slightly inverted
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    // Add realistic variation to yield curve spread
    spread += (Math.random() - 0.5) * 0.1;
    spread = Math.max(-2, Math.min(3, spread)); // Keep within historical bounds
    
    data.push({
      date: baseDate.toLocaleDateString(),
      spread: Math.round(spread * 100) / 100,
      ten_year: 4.2 + Math.random() * 0.4 - 0.2,
      two_year: 4.2 + Math.random() * 0.4 - 0.2 - spread,
    });
  }
  
  return data;
};

export const YieldCurveChart = ({ timeInterval }: YieldCurveChartProps) => {
  const data = generateYieldCurveData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">YIELD CURVE (10Y-2Y)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            axisLine={false}
            tickLine={false}
            width={30}
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              fontSize: '10px',
              padding: '4px 6px'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Spread']}
          />
          <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" opacity={0.5} />
          <Line 
            type="monotone" 
            dataKey="spread" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2} 
            name="10Y-2Y Spread" 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};