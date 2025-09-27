import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface SectorsChartProps {
  timeInterval: TimeInterval;
}

const sectorsData = [
  { sector: 'Technology', performance: 2.5, volume: 120 },
  { sector: 'Healthcare', performance: 1.8, volume: 95 },
  { sector: 'Financials', performance: -0.5, volume: 110 },
  { sector: 'Energy', performance: 3.2, volume: 85 },
  { sector: 'Consumer Disc.', performance: 0.8, volume: 75 },
  { sector: 'Industrials', performance: 1.2, volume: 88 },
  { sector: 'Materials', performance: -1.1, volume: 65 },
  { sector: 'Utilities', performance: 0.3, volume: 45 },
  { sector: 'Real Estate', performance: -0.8, volume: 55 },
  { sector: 'Telecom', performance: 0.1, volume: 38 },
];

export const SectorsChart = ({ timeInterval }: SectorsChartProps) => {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-foreground">US Sectors Performance (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sectorsData} margin={{ bottom: 45 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="sector" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number) => [`${value}%`, 'Performance']}
          />
          <Bar 
            dataKey="performance" 
            fill="hsl(var(--chart-1))"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};