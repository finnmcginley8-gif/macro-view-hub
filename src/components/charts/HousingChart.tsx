import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface HousingChartProps {
  timeInterval: TimeInterval;
}

const generateHousingData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 30 : interval === '1W' ? 52 : interval === '1M' ? 24 : 120;
  const data = [];
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    if (interval === '1D') {
      baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    } else {
      baseDate.setMonth(baseDate.getMonth() - (dataPoints - i));
    }
    
    data.push({
      date: baseDate.toLocaleDateString(),
      USMedian: 400000 + Math.random() * 40000 - 20000,
      UKAverage: 280000 + Math.random() * 30000 - 15000,
      CanadaAvg: 650000 + Math.random() * 50000 - 25000,
      AustraliaMedian: 750000 + Math.random() * 60000 - 30000,
      GermanyAvg: 350000 + Math.random() * 35000 - 17500,
    });
  }
  
  return data;
};

export const HousingChart = ({ timeInterval }: HousingChartProps) => {
  const data = generateHousingData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-sm font-semibold mb-2 text-foreground">Housing Market Prices</h3>
      <ResponsiveContainer width="100%" height={200}>
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
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
          />
          <Legend />
          <Line type="monotone" dataKey="USMedian" stroke="hsl(var(--chart-1))" strokeWidth={2} name="US Median" />
          <Line type="monotone" dataKey="UKAverage" stroke="hsl(var(--chart-2))" strokeWidth={2} name="UK Average" />
          <Line type="monotone" dataKey="CanadaAvg" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Canada Avg" />
          <Line type="monotone" dataKey="AustraliaMedian" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Australia Median" />
          <Line type="monotone" dataKey="GermanyAvg" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Germany Avg" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};