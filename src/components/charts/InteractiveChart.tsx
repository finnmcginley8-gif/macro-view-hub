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
      // Generate realistic price movements
      const volatility = ticker.category === 'fx' ? 0.01 : ticker.category === 'bond' ? 0.005 : 0.02;
      const trend = ticker.category === 'equity' ? 0.0002 : 0;
      const randomChange = (Math.random() - 0.5) * volatility + trend;
      
      if (i === days) {
        // Starting value
        dataPoint[ticker.symbol] = ticker.category === 'fx' ? 1.0 : 100;
      } else {
        // Previous value with movement
        const prevValue = data[data.length - 1]?.[ticker.symbol] || 100;
        dataPoint[ticker.symbol] = prevValue * (1 + randomChange);
      }
    });
    
    data.push(dataPoint);
  }
  
  return data;
};

export const InteractiveChart = () => {
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
  
  // Generate chart data
  const chartData = generateChartData(timeframe, selectedTickers);
  
  // Convert to percentage change if in compare mode
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
    <div className="chart-container relative">
      {/* Header with selected tickers */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-foreground tracking-tight">
            <BarChart3 className="h-3 w-3 inline mr-1 text-primary" />
            COMPARATIVE ANALYSIS
          </h3>
          {selectedTickers.length > 0 && (
            <Badge variant="outline" className="h-4 px-1 text-[9px]">
              {selectedTickers.length} selected
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={chartMode === 'overlay' ? 'secondary' : 'ghost'}
            className="h-5 px-2 text-[9px]"
            onClick={() => setChartMode('overlay')}
            title="Overlay Mode"
          >
            <Move3D className="h-2.5 w-2.5" />
          </Button>
          <Button
            size="sm"
            variant={chartMode === 'compare' ? 'secondary' : 'ghost'}
            className="h-5 px-2 text-[9px]"
            onClick={() => setChartMode('compare')}
            title="Compare % Change"
          >
            <TrendingUp className="h-2.5 w-2.5" />
          </Button>
          
          <div className="w-px h-4 bg-border mx-1" />
          
          <Button size="sm" variant="ghost" className="h-5 px-2 text-[9px]" title="Save Preset">
            <Save className="h-2.5 w-2.5" />
          </Button>
          <Button size="sm" variant="ghost" className="h-5 px-2 text-[9px]" onClick={clearAll} title="Clear All">
            <RotateCcw className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>

      {/* Selected Tickers Pills */}
      {selectedTickers.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3 p-2 bg-muted/20 rounded border">
          {selectedTickers.map((ticker) => (
            <div
              key={ticker.symbol}
              className="flex items-center gap-1 px-2 py-1 bg-background border rounded-sm text-[10px] group hover:bg-muted/50 transition-colors"
              style={{ borderColor: ticker.color + '40' }}
            >
              <span className="text-[8px]">{getCategoryIcon(ticker.category)}</span>
              <span className="font-medium" style={{ color: ticker.color }}>
                {ticker.symbol}
              </span>
              <span className="text-muted-foreground truncate max-w-16">
                {ticker.name}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-3 w-3 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleTickerRemove(ticker.symbol)}
              >
                <X className="h-2 w-2" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Timeframe Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={timeframe === tf ? 'secondary' : 'ghost'}
              className="h-5 px-2 text-[9px]"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={showBrush ? 'secondary' : 'ghost'}
            className="h-5 px-2 text-[9px]"
            onClick={() => setShowBrush(!showBrush)}
            title="Zoom Tool"
          >
            <Calendar className="h-2.5 w-2.5" />
          </Button>
          <Button
            size="sm"
            variant={isLogScale ? 'secondary' : 'ghost'}
            className="h-5 px-2 text-[9px]"
            onClick={() => setIsLogScale(!isLogScale)}
            title="Log Scale"
          >
            LOG
          </Button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64">
        {selectedTickers.length === 0 ? (
          <div className="flex items-center justify-center h-full border border-dashed border-muted-foreground/30 rounded">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-medium">Select tickers from panels to compare</p>
              <p className="text-[10px] mt-1">Check boxes in any section to add them here</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="1 1" stroke="hsl(var(--border))" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={8}
                tick={{ fontSize: 8 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={8}
                tick={{ fontSize: 8 }}
                axisLine={false}
                tickLine={false}
                width={40}
                scale={isLogScale ? 'log' : 'linear'}
                domain={chartMode === 'compare' ? ['dataMin', 'dataMax'] : ['auto', 'auto']}
                tickFormatter={(value) => 
                  chartMode === 'compare' ? `${value.toFixed(1)}%` : value.toFixed(2)
                }
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                  fontSize: '10px',
                  padding: '6px 8px',
                  borderRadius: '4px'
                }}
                formatter={(value: any, name: string) => [
                  chartMode === 'compare' ? `${value.toFixed(2)}%` : value.toFixed(4),
                  name
                ]}
              />
              
              {selectedTickers.map((ticker) => (
                <Line
                  key={ticker.symbol}
                  type="monotone"
                  dataKey={ticker.symbol}
                  stroke={ticker.color}
                  strokeWidth={2}
                  dot={false}
                  name={ticker.symbol}
                  connectNulls={false}
                />
              ))}
              
              {showBrush && (
                <Brush
                  dataKey="date"
                  height={20}
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--muted))"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Footer */}
      {selectedTickers.length > 0 && (
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/50 text-[9px]">
          <span className="text-muted-foreground">
            Mode: {chartMode === 'compare' ? 'Relative Performance' : 'Absolute Values'}
          </span>
          <span className="text-muted-foreground">
            Period: {timeframe} • {processedData.length} data points
          </span>
        </div>
      )}
    </div>
  );
};