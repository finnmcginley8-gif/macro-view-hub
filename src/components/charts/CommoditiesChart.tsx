import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';

interface CommoditiesChartProps {
  timeInterval: TimeInterval;
}

const generateCommoditiesData = (interval: TimeInterval) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 252;
  const data = [];
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    data.push({
      date: baseDate.toLocaleDateString(),
      Gold: 2000 + Math.random() * 200 - 100,
      Silver: 24 + Math.random() * 4 - 2,
      Crude: 75 + Math.random() * 15 - 7.5,
      NatGas: 2.8 + Math.random() * 0.6 - 0.3,
      Copper: 3.8 + Math.random() * 0.4 - 0.2,
      Wheat: 550 + Math.random() * 100 - 50,
    });
  }
  
  return data;
};

export const CommoditiesChart = ({ timeInterval }: CommoditiesChartProps) => {
  const data = generateCommoditiesData(timeInterval);

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Commodities Prices</h3>
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
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="Gold" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Gold ($/oz)" />
          <Line type="monotone" dataKey="Silver" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Silver ($/oz)" />
          <Line type="monotone" dataKey="Crude" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Crude Oil ($/bbl)" />
          <Line type="monotone" dataKey="NatGas" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Nat Gas ($/MMBtu)" />
          <Line type="monotone" dataKey="Copper" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Copper ($/lb)" />
          <Line type="monotone" dataKey="Wheat" stroke="hsl(var(--chart-6))" strokeWidth={2} name="Wheat (¢/bu)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};