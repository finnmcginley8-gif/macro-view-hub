import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface SectorsChartProps {
  timeInterval: TimeInterval;
}

// Realistic sector performance with growth bias
const generateSectorsData = () => {
  const sectors = ['Tech', 'Health', 'Finance', 'Energy', 'Consumer', 'Industry', 'Materials', 'Utilities', 'REIT', 'Telecom'];
  
  return sectors.map((sector, index) => ({
    sector,
    performance: (Math.random() - 0.3) * 4 + (index < 3 ? 0.5 : 0), // Tech, Health, Finance slightly favored
  }));
};

export const SectorsChart = ({ timeInterval }: SectorsChartProps) => {
  const sectorsData = generateSectorsData();
  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground">Sectors (%)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sectorsData} margin={{ bottom: 25, left: 5, right: 5 }}>
          <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="sector" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            angle={-45}
            textAnchor="end"
            height={35}
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
            width={25}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '4px',
              color: 'hsl(var(--foreground))',
              fontSize: '10px',
              padding: '4px 6px'
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`]}
          />
          <Bar 
            dataKey="performance" 
            fill="hsl(var(--chart-2))"
            radius={[1, 1, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};