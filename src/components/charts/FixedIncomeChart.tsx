import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface FixedIncomeChartProps {
  timeInterval: TimeInterval;
}

const generateYieldData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 252;
  const data = [];
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    data.push({
      date: baseDate.toLocaleDateString(),
      US10Y: 4.5 + Math.random() * 0.5 - 0.25,
      US2Y: 4.8 + Math.random() * 0.4 - 0.2,
      US30Y: 4.7 + Math.random() * 0.3 - 0.15,
      DE10Y: 2.4 + Math.random() * 0.3 - 0.15,
      UK10Y: 4.2 + Math.random() * 0.4 - 0.2,
      JP10Y: 0.8 + Math.random() * 0.2 - 0.1,
    });
  }
  
  return data;
};

export const FixedIncomeChart = ({ timeInterval }: FixedIncomeChartProps) => {
  const data = generateYieldData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Government Bond Yields (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            domain={['dataMin - 0.1', 'dataMax + 0.1']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
          />
          <Legend />
          <Line type="monotone" dataKey="US10Y" stroke="hsl(var(--chart-1))" strokeWidth={2} name="US 10Y" />
          <Line type="monotone" dataKey="US2Y" stroke="hsl(var(--chart-2))" strokeWidth={2} name="US 2Y" />
          <Line type="monotone" dataKey="US30Y" stroke="hsl(var(--chart-3))" strokeWidth={2} name="US 30Y" />
          <Line type="monotone" dataKey="DE10Y" stroke="hsl(var(--chart-4))" strokeWidth={2} name="DE 10Y" />
          <Line type="monotone" dataKey="UK10Y" stroke="hsl(var(--chart-5))" strokeWidth={2} name="UK 10Y" />
          <Line type="monotone" dataKey="JP10Y" stroke="hsl(var(--chart-6))" strokeWidth={2} name="JP 10Y" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};