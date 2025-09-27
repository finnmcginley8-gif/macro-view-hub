import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface MarketBreadthChartProps {
  timeInterval: TimeInterval;
}

const generateBreadthData = () => {
  return [
    {
      metric: "Above 200 SMA",
      percentage: 65 + Math.random() * 20,
      count: Math.floor(300 + Math.random() * 200)
    },
    {
      metric: "Advance/Decline",
      percentage: 55 + Math.random() * 30,
      count: Math.floor(1800 + Math.random() * 400)
    },
    {
      metric: "New Highs",
      percentage: 45 + Math.random() * 25,
      count: Math.floor(80 + Math.random() * 120)
    },
    {
      metric: "New Lows", 
      percentage: 15 + Math.random() * 15,
      count: Math.floor(20 + Math.random() * 60)
    }
  ];
};

export const MarketBreadthChart = ({ timeInterval }: MarketBreadthChartProps) => {
  const data = generateBreadthData();

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">MARKET BREADTH</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ bottom: 25, left: 5, right: 5 }}>
          <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="metric" 
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
            formatter={(value: number) => [`${value.toFixed(1)}%`]}
          />
          <Bar 
            dataKey="percentage" 
            fill="hsl(var(--chart-1))"
            radius={[1, 1, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};