import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface ConsumerSentimentChartProps {
  timeInterval: TimeInterval;
}

const generateSentimentData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 12 : interval === '1W' ? 24 : interval === '1M' ? 60 : 120;
  const data = [];
  
  let baseValues = { UMich: 68.5, ConfBoard: 102.3 };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setMonth(baseDate.getMonth() - (dataPoints - i));
    
    baseValues.UMich += (Math.random() - 0.5) * 2;
    baseValues.ConfBoard += (Math.random() - 0.5) * 3;
    
    data.push({
      date: baseDate.toLocaleDateString(),
      UMich: Math.max(40, Math.min(120, Math.round(baseValues.UMich * 10) / 10)),
      ConfBoard: Math.max(60, Math.min(140, Math.round(baseValues.ConfBoard * 10) / 10)),
    });
  }
  
  return data;
};

export const ConsumerSentimentChart = ({ timeInterval }: ConsumerSentimentChartProps) => {
  const data = generateSentimentData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">CONSUMER SENTIMENT</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
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
          <Area type="monotone" dataKey="UMich" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="UMich" />
          <Area type="monotone" dataKey="ConfBoard" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} name="Conf Board" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};