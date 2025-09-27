import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface VolatilityDashboardProps {
  timeInterval: TimeInterval;
}

const generateVolatilityData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 252;
  const data = [];
  
  let baseValues = { VIX: 18.5, MOVE: 95.2, VVIX: 85.3 };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    // Volatility tends to spike and then mean revert
    baseValues.VIX += (Math.random() - 0.5) * 2;
    baseValues.MOVE += (Math.random() - 0.5) * 5;
    baseValues.VVIX += (Math.random() - 0.5) * 8;
    
    // Keep within realistic bounds
    baseValues.VIX = Math.max(10, Math.min(80, baseValues.VIX));
    baseValues.MOVE = Math.max(70, Math.min(200, baseValues.MOVE));
    baseValues.VVIX = Math.max(50, Math.min(150, baseValues.VVIX));
    
    data.push({
      date: baseDate.toLocaleDateString(),
      VIX: Math.round(baseValues.VIX * 100) / 100,
      MOVE: Math.round(baseValues.MOVE * 100) / 100,
      VVIX: Math.round(baseValues.VVIX * 100) / 100,
    });
  }
  
  return data;
};

export const VolatilityDashboard = ({ timeInterval }: VolatilityDashboardProps) => {
  const data = generateVolatilityData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">VOLATILITY INDICES</h3>
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
          <Line type="monotone" dataKey="VIX" stroke="hsl(var(--chart-3))" strokeWidth={1.5} name="VIX" dot={false} />
          <Line type="monotone" dataKey="MOVE" stroke="hsl(var(--chart-1))" strokeWidth={1.5} name="MOVE" dot={false} />
          <Line type="monotone" dataKey="VVIX" stroke="hsl(var(--chart-5))" strokeWidth={1.5} name="VVIX" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
