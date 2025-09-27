import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface ThematicETFChartProps {
  timeInterval: TimeInterval;
}

const generateThematicData = () => {
  const themes = ['AI/Tech', 'Green Energy', 'Infrastructure', 'Cybersecurity', 'Biotech', 'Cloud'];
  
  return themes.map(theme => ({
    theme,
    performance: (Math.random() - 0.3) * 8, // AI bias towards positive
    volume: Math.round(Math.random() * 100 + 50),
    aum: Math.round(Math.random() * 5000 + 1000) // Assets under management
  }));
};

export const ThematicETFChart = ({ timeInterval }: ThematicETFChartProps) => {
  const data = generateThematicData();

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">THEMATIC ETFS</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ bottom: 25, left: 5, right: 5 }}>
          <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="theme" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            angle={-45}
            textAnchor="end"
            height={35}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={7}
            axisLine={false}
            tickLine={false}
            width={25}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
              fontSize: '10px',
              padding: '4px 6px'
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Performance']}
          />
          <Bar 
            dataKey="performance" 
            fill="hsl(var(--chart-4))"
            radius={[1, 1, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};