import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface InflationRatesChartProps {
  timeInterval: TimeInterval;
}

const generateInflationData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 12 : interval === '1W' ? 24 : interval === '1M' ? 60 : 120;
  const data = [];
  
  let baseValues = { CPI: 3.2, FedRate: 5.25, Unemployment: 3.8 };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setMonth(baseDate.getMonth() - (dataPoints - i));
    
    // Add realistic trends
    const progress = i / dataPoints;
    baseValues.CPI += (Math.random() - 0.5) * 0.1;
    baseValues.FedRate += (Math.random() - 0.5) * 0.05;
    baseValues.Unemployment += (Math.random() - 0.5) * 0.1;
    
    data.push({
      date: baseDate.toLocaleDateString(),
      CPI: Math.max(0, Math.round(baseValues.CPI * 100) / 100),
      FedRate: Math.max(0, Math.round(baseValues.FedRate * 100) / 100),
      Unemployment: Math.max(0, Math.round(baseValues.Unemployment * 100) / 100),
    });
  }
  
  return data;
};

export const InflationRatesChart = ({ timeInterval }: InflationRatesChartProps) => {
  const data = generateInflationData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">INFLATION & EMPLOYMENT</h3>
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
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Line type="monotone" dataKey="CPI" stroke="hsl(var(--chart-3))" strokeWidth={1.5} name="CPI" dot={false} />
          <Line type="monotone" dataKey="FedRate" stroke="hsl(var(--chart-1))" strokeWidth={1.5} name="Fed Rate" dot={false} />
          <Line type="monotone" dataKey="Unemployment" stroke="hsl(var(--chart-2))" strokeWidth={1.5} name="Unemployment" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};