import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface FixedIncomeChartProps {
  timeInterval: TimeInterval;
}

// More realistic bond yield data
const generateYieldData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 252;
  const data = [];
  
  // Base yields with realistic ranges
  let baseYields = {
    US10Y: 4.5,
    US2Y: 4.8,
    US30Y: 4.7,
    DE10Y: 2.4,
    UK10Y: 4.2,
    JP10Y: 0.8,
  };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    // Generate realistic yield movements
    Object.keys(baseYields).forEach(bond => {
      const volatility = 0.01; // 1% daily volatility
      const change = (Math.random() - 0.5) * 2 * volatility;
      baseYields[bond] = Math.max(0, baseYields[bond] + change);
    });
    
    data.push({
      date: interval === '1D' ? baseDate.toLocaleTimeString() : baseDate.toLocaleDateString(),
      US10Y: Math.round(baseYields.US10Y * 100) / 100,
      US2Y: Math.round(baseYields.US2Y * 100) / 100,
      US30Y: Math.round(baseYields.US30Y * 100) / 100,
      DE10Y: Math.round(baseYields.DE10Y * 100) / 100,
      UK10Y: Math.round(baseYields.UK10Y * 100) / 100,
      JP10Y: Math.round(baseYields.JP10Y * 100) / 100,
    });
  }
  
  return data;
};

export const FixedIncomeChart = ({ timeInterval }: FixedIncomeChartProps) => {
  const data = generateYieldData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-sm font-semibold mb-2 text-foreground">Government Bond Yields (%)</h3>
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