import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface SectorsChartProps {
  timeInterval: TimeInterval;
}

// More realistic sector performance data
const generateSectorsData = () => {
  const sectors = [
    'Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer Disc.',
    'Industrials', 'Materials', 'Utilities', 'Real Estate', 'Telecom'
  ];
  
  return sectors.map(sector => ({
    sector,
    performance: (Math.random() - 0.4) * 5, // More realistic range -2% to +3%
    volume: Math.round(Math.random() * 50 + 50), // Volume in millions
  }));
};

export const SectorsChart = ({ timeInterval }: SectorsChartProps) => {
  const sectorsData = generateSectorsData();
  return (
    <div className="chart-container">
      <h3 className="text-sm font-semibold mb-2 text-foreground">US Sectors Performance (%)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sectorsData} margin={{ bottom: 35 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="sector" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={8}
            angle={-45}
            textAnchor="end"
            height={45}
            tick={{ fontSize: 8 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={8}
            tick={{ fontSize: 8 }}
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