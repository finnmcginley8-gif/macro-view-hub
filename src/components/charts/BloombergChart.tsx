import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

export const BloombergChart = () => {
  const { 
    selectedTickers, 
    removeTicker, 
    clearAll, 
    chartMode, 
    setChartMode, 
    timeframe, 
    setTimeframe 
  } = useChart();
  
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
      case 'equity': return 'EQ';
      case 'fx': return 'FX';
      case 'bond': return 'FI';
      case 'commodity': return 'CM';
      default: return 'SK';
    }
  };

  return (
    <div className="chart-container">
      {/* Bloomberg Terminal Header */}
      <div className="bloomberg-title p-1 mb-1 border-b border-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[10px] font-bold text-accent-foreground tracking-widest">CHART ANALYSIS</h3>
            {selectedTickers.length > 0 && (
              <Badge variant="outline" className="h-3 px-1 text-[7px] border-foreground text-foreground bg-transparent font-mono">
                {selectedTickers.length} SECURITIES
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-0.5">
            <Button
              size="sm"
              variant={chartMode === 'overlay' ? 'default' : 'ghost'}
              className="h-4 px-1 text-[7px] font-bold font-mono bg-primary text-primary-foreground"
              onClick={() => setChartMode('overlay')}
              title="ABSOLUTE VALUES"
            >
              ABS
            </Button>
            <Button
              size="sm"
              variant={chartMode === 'compare' ? 'default' : 'ghost'}
              className="h-4 px-1 text-[7px] font-bold font-mono bg-primary text-primary-foreground"
              onClick={() => setChartMode('compare')}
              title="RELATIVE PERFORMANCE"
            >
              REL
            </Button>
            
            <Button size="sm" variant="ghost" className="h-4 px-1 text-[7px] text-foreground font-mono glow-orange" onClick={clearAll} title="CLEAR ALL">
              CLR
            </Button>
          </div>
        </div>
      </div>

      {/* Selected Tickers - Bloomberg Style */}
      {selectedTickers.length > 0 && (
        <div className="mb-1 p-1 border border-foreground bg-card">
          <div className="flex flex-wrap gap-0.5">
            {selectedTickers.map((ticker, index) => (
              <div
                key={ticker.symbol}
                className="flex items-center gap-1 px-1 py-0.5 bg-primary text-primary-foreground text-[8px] group font-mono font-bold"
              >
                <span className="text-[6px]">{getCategoryIcon(ticker.category)}</span>
                <span className="tracking-wider">{ticker.symbol}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-2 w-2 p-0 opacity-70 group-hover:opacity-100 transition-opacity text-primary-foreground"
                  onClick={() => handleTickerRemove(ticker.symbol)}
                >
                  <X className="h-1 w-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeframe Controls - Bloomberg Style */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-0">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={timeframe === tf ? 'default' : 'ghost'}
              className="h-4 px-1 text-[7px] font-bold font-mono rounded-none border-r border-foreground last:border-r-0"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-0">
          <Button
            size="sm"
            variant={isLogScale ? 'default' : 'ghost'}
            className="h-4 px-1 text-[7px] font-bold font-mono"
            onClick={() => setIsLogScale(!isLogScale)}
            title="LOGARITHMIC SCALE"
          >
            LOG
          </Button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-48 border-2 border-foreground">
        {selectedTickers.length === 0 ? (
          <div className="flex items-center justify-center h-full bg-card">
            <div className="text-center text-foreground">
              <BarChart3 className="h-6 w-6 mx-auto mb-1 glow-orange" />
              <p className="text-[9px] font-bold font-mono glow-orange">SELECT SECURITIES</p>
              <p className="text-[7px] mt-0.5 text-muted-foreground font-mono">USE CHECKBOXES IN PANELS</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="1 1" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--foreground))"
                fontSize={6}
                tick={{ fontSize: 6 }}
                axisLine={{ stroke: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--foreground))" }}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                fontSize={6}
                tick={{ fontSize: 6 }}
                axisLine={{ stroke: "hsl(var(--foreground))" }}
                tickLine={{ stroke: "hsl(var(--foreground))" }}
                width={30}
                scale={isLogScale ? 'log' : 'linear'}
                domain={chartMode === 'compare' ? ['dataMin', 'dataMax'] : ['auto', 'auto']}
                tickFormatter={(value) => 
                  chartMode === 'compare' ? `${value.toFixed(1)}%` : value.toFixed(1)
                }
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '2px solid hsl(var(--foreground))',
                  color: 'hsl(var(--foreground))',
                  fontSize: '8px',
                  padding: '4px 6px',
                  borderRadius: '0',
                  fontFamily: 'monospace',
                  textShadow: '0 0 3px currentColor'
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

      {/* Chart Footer - Bloomberg Style */}
      {selectedTickers.length > 0 && (
        <div className="flex justify-between items-center mt-1 pt-1 border-t border-foreground text-[7px] font-mono">
          <span className="text-muted-foreground font-bold">
            {chartMode === 'compare' ? 'RELATIVE PERFORMANCE' : 'ABSOLUTE VALUES'} • {timeframe}
          </span>
          <span className="text-foreground glow-orange font-bold">
            {processedData.length} PTS
          </span>
        </div>
      )}
    </div>
  );
};