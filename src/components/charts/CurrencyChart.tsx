import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeInterval } from '../TimeIntervalSelector';
import { Button } from '@/components/ui/button';

interface CurrencyChartProps {
  timeInterval: TimeInterval;
}

type BaseCurrency = 'USD' | 'EUR';

const generateCurrencyData = (interval: TimeInterval, baseCurrency: BaseCurrency) => {
  const dataPoints = interval === '1D' ? 24 : interval === '1W' ? 7 : interval === '1M' ? 30 : 252;
  const data = [];
  
  const baseRates = baseCurrency === 'USD' ? {
    EUR: 0.92,
    GBP: 0.79,
    JPY: 150,
    CHF: 0.88,
    CAD: 1.36,
    AUD: 1.52,
    CNY: 7.23,
  } : {
    USD: 1.09,
    GBP: 0.86,
    JPY: 163,
    CHF: 0.96,
    CAD: 1.48,
    AUD: 1.65,
    CNY: 7.87,
  };
  
  for (let i = 0; i < dataPoints; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - (dataPoints - i));
    
    const dataPoint: any = {
      date: baseDate.toLocaleDateString(),
    };
    
    Object.entries(baseRates).forEach(([currency, rate]) => {
      dataPoint[currency] = rate + (Math.random() - 0.5) * rate * 0.05;
    });
    
    data.push(dataPoint);
  }
  
  return data;
};

export const CurrencyChart = ({ timeInterval }: CurrencyChartProps) => {
  const [baseCurrency, setBaseCurrency] = useState<BaseCurrency>('USD');
  const data = generateCurrencyData(timeInterval, baseCurrency);
  const currencies = Object.keys(data[0] || {}).filter(key => key !== 'date');

  return (
    <div className="chart-container">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Currency Exchange Rates</h3>
        <div className="flex gap-1">
          <Button
            variant={baseCurrency === 'USD' ? "default" : "outline"}
            size="sm"
            onClick={() => setBaseCurrency('USD')}
            className="text-xs"
          >
            vs USD
          </Button>
          <Button
            variant={baseCurrency === 'EUR' ? "default" : "outline"}
            size="sm"
            onClick={() => setBaseCurrency('EUR')}
            className="text-xs"
          >
            vs EUR
          </Button>
        </div>
      </div>
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
          {currencies.map((currency, index) => (
            <Line 
              key={currency}
              type="monotone" 
              dataKey={currency} 
              stroke={`hsl(var(--chart-${(index % 6) + 1}))`}
              strokeWidth={2} 
              name={`${currency}/${baseCurrency}`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};