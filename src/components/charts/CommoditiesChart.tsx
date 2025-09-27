import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface CommoditiesChartProps {
  timeInterval: TimeInterval;
}

const generateCommoditiesData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 252;
  const data = [];
  
  let basePrices = { Gold: 1900, Silver: 22, Oil: 70, Gas: 2.5, Copper: 3.6 };
  const trends = { Gold: 0.08, Silver: 0.06, Oil: 0.04, Gas: 0.02, Copper: 0.10 };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    Object.keys(basePrices).forEach(commodity => {
      const timeProgress = i / dataPoints;
      const trendGrowth = trends[commodity] * timeProgress * (interval === '1Y' ? 1 : 0.1);
      const volatility = commodity === 'Gas' ? 0.03 : 0.015;
      const change = (Math.random() - 0.47) * volatility + trendGrowth;
      basePrices[commodity] *= (1 + change);
    });
    
    data.push({
      date: baseDate.toLocaleDateString(),
      Gold: Math.round(basePrices.Gold * 100) / 100,
      Silver: Math.round(basePrices.Silver * 100) / 100,
      Oil: Math.round(basePrices.Oil * 100) / 100,
      Gas: Math.round(basePrices.Gas * 100) / 100,
      Copper: Math.round(basePrices.Copper * 100) / 100,
    });
  }
  
  return data;
};

export const CommoditiesChart = ({ timeInterval }: CommoditiesChartProps) => {
  const data = generateCommoditiesData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground">Commodities</h3>
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
              borderRadius: '4px',
              color: 'hsl(var(--foreground))',
              fontSize: '10px',
              padding: '4px 6px'
            }}
          />
          <Line type="monotone" dataKey="Gold" stroke="hsl(var(--chart-4))" strokeWidth={1.5} name="Gold" dot={false} />
          <Line type="monotone" dataKey="Silver" stroke="hsl(var(--chart-1))" strokeWidth={1.5} name="Silver" dot={false} />
          <Line type="monotone" dataKey="Oil" stroke="hsl(var(--chart-3))" strokeWidth={1.5} name="Oil" dot={false} />
          <Line type="monotone" dataKey="Gas" stroke="hsl(var(--chart-2))" strokeWidth={1.5} name="Gas" dot={false} />
          <Line type="monotone" dataKey="Copper" stroke="hsl(var(--chart-5))" strokeWidth={1.5} name="Copper" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};