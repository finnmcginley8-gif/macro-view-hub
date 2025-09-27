import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import { X, BarChart3, TrendingUp, Save, RotateCcw, Calendar, Move3D } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useChart } from '@/contexts/ChartContext';

// Generate mock data for different timeframes
const generateChartData = (timeframe: string, tickers: any[]) => {
  const days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 
               timeframe === '1Y' ? 365 : timeframe === '5Y' ? 1825 : 3650;
  
  const data = [];
  const baseDate = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    const dataPoint: any = {
      date: timeframe === '1D' ? date.toLocaleTimeString() : date.toISOString().split('T')[0],
      timestamp: date.getTime()
    };
    
    tickers.forEach(ticker => {
      const volatility = ticker.category === 'fx' ? 0.01 : ticker.category === 'bond' ? 0.005 : 0.02;
      const trend = ticker.category === 'equity' ? 0.0002 : 0;
      const randomChange = (Math.random() - 0.5) * volatility + trend;
      
      if (i === days) {
        dataPoint[ticker.symbol] = ticker.category === 'fx' ? 1.0 : 100;
      } else {
        const prevValue = data[data.length - 1]?.[ticker.symbol] || 100;
        dataPoint[ticker.symbol] = prevValue * (1 + randomChange);
      }
    });
    
    data.push(dataPoint);
  }
  
  return data;
};

export const CapitalIQChart = () => {
  const { 
    selectedTickers, 
    removeTicker, 
    clearAll, 
    chartMode, 
    setChartMode, 
    timeframe, 
    setTimeframe 
  } = useChart();
  
  const [showBrush, setShowBrush] = useState(false);
  const [isLogScale, setIsLogScale] = useState(false);

  const timeframes = ['1D', '1W', '1M', '1Y', '5Y', 'MAX'] as const;
  
  const chartData = generateChartData(timeframe, selectedTickers);
  
  const processedData = chartMode === 'compare' && chartData.length > 0 
    ? chartData.map((point, index) => {
        const processed: any = { ...point };
        selectedTickers.forEach(ticker => {
          const baseValue = chartData[0]?.[ticker.symbol] || 100;
          processed[ticker.symbol] = ((point[ticker.symbol] / baseValue - 1) * 100);
        });
        return processed;
      })
    : chartData;

  const handleTickerRemove = (symbol: string) => {
    removeTicker(symbol);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'equity': return '📈';
      case 'fx': return '💱';
      case 'bond': return '🏛️';
      case 'commodity': return '🛢️';
      default: return '📊';
    }
  };

  return (
    <div className="chart-container">
      {/* Capital IQ Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="section-header">COMPARATIVE ANALYTICS</h3>
          {selectedTickers.length > 0 && (
            <Badge variant="outline" className="h-3 px-1 text-[8px] border-primary/30 text-primary bg-primary/10">
              {selectedTickers.length} ACTIVE
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-0.5">
          <Button
            size="sm"
            variant={chartMode === 'overlay' ? 'secondary' : 'ghost'}
            className="h-4 px-1.5 text-[8px] font-medium"
            onClick={() => setChartMode('overlay')}
            title="Overlay Mode"
          >
            ABS
          </Button>
          <Button
            size="sm"
            variant={chartMode === 'compare' ? 'secondary' : 'ghost'}
            className="h-4 px-1.5 text-[8px] font-medium"
            onClick={() => setChartMode('compare')}
            title="Relative Performance"
          >
            REL
          </Button>
          
          <div className="w-px h-3 bg-border mx-1" />
          
          <Button size="sm" variant="ghost" className="h-4 px-1.5 text-[8px] text-primary" title="Save Configuration">
            SAVE
          </Button>
          <Button size="sm" variant="ghost" className="h-4 px-1.5 text-[8px] text-muted-foreground" onClick={clearAll} title="Clear All">
            CLR
          </Button>
        </div>
      </div>

      {/* Selected Tickers - Capital IQ Style */}
      {selectedTickers.length > 0 && (
        <div className="mb-2 p-1 bg-primary/5 border border-primary/20 rounded">
          <div className="flex flex-wrap gap-1">
            {selectedTickers.map((ticker) => (
              <div
                key={ticker.symbol}
                className="flex items-center gap-1 px-1.5 py-0.5 bg-background border rounded text-[9px] group hover:bg-muted/50 transition-colors financial-row"
                style={{ borderColor: ticker.color + '60' }}
              >
                <span className="text-[7px] opacity-60">{getCategoryIcon(ticker.category)}</span>
                <span className="financial-ticker font-semibold" style={{ color: ticker.color }}>
                  {ticker.symbol}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-2.5 w-2.5 p-0 opacity-50 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleTickerRemove(ticker.symbol)}
                >
                  <X className="h-1.5 w-1.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeframe Controls - Capital IQ Style */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-0.5">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={timeframe === tf ? 'default' : 'ghost'}
              className="h-4 px-1.5 text-[8px] font-medium"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-0.5">
          <Button
            size="sm"
            variant={isLogScale ? 'secondary' : 'ghost'}
            className="h-4 px-1.5 text-[8px] font-medium"
            onClick={() => setIsLogScale(!isLogScale)}
            title="Logarithmic Scale"
          >
            LOG
          </Button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-52">
        {selectedTickers.length === 0 ? (
          <div className="flex items-center justify-center h-full border border-dashed border-primary/30 rounded bg-primary/5">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-6 w-6 mx-auto mb-1 opacity-40" />
              <p className="text-[10px] font-medium">SELECT SECURITIES TO COMPARE</p>
              <p className="text-[8px] mt-0.5 text-primary">Use checkboxes in market panels</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="1 1" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={7}
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
                width={35}
                scale={isLogScale ? 'log' : 'linear'}
                domain={chartMode === 'compare' ? ['dataMin', 'dataMax'] : ['auto', 'auto']}
                tickFormatter={(value) => 
                  chartMode === 'compare' ? `${value.toFixed(1)}%` : value.toFixed(1)
                }
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--primary))',
                  color: 'hsl(var(--foreground))',
                  fontSize: '9px',
                  padding: '4px 6px',
                  borderRadius: '2px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }}
                formatter={(value: any, name: string) => [
                  chartMode === 'compare' ? `${value.toFixed(2)}%` : value.toFixed(3),
                  name
                ]}
              />
              
              {selectedTickers.map((ticker) => (
                <Line
                  key={ticker.symbol}
                  type="monotone"
                  dataKey={ticker.symbol}
                  stroke={ticker.color}
                  strokeWidth={1.5}
                  dot={false}
                  name={ticker.symbol}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Footer - Capital IQ Style */}
      {selectedTickers.length > 0 && (
        <div className="flex justify-between items-center mt-1.5 pt-1 border-t border-border/50 text-[8px]">
          <span className="text-muted-foreground font-medium">
            {chartMode === 'compare' ? 'RELATIVE PERFORMANCE' : 'ABSOLUTE VALUES'} • {timeframe} PERIOD
          </span>
          <span className="text-primary font-medium">
            {processedData.length} OBSERVATIONS
          </span>
        </div>
      )}
    </div>
  );
};