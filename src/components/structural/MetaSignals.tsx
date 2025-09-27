import { Brain, TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

const regimeData = [
  { regime: 'Reflation', probability: 45, color: 'hsl(var(--success))' },
  { regime: 'Stagflation', probability: 28, color: 'hsl(var(--warning))' },
  { regime: 'Disinflation', probability: 18, color: 'hsl(var(--primary))' },
  { regime: 'Deflation', probability: 9, color: 'hsl(var(--destructive))' },
];

const correlationData = [
  { period: '1M', bondEquity: -0.42, goldEquity: 0.18, dollarEquity: -0.23 },
  { period: '3M', bondEquity: -0.38, goldEquity: 0.25, dollarEquity: -0.31 },
  { period: '6M', bondEquity: -0.15, goldEquity: 0.12, dollarEquity: -0.18 },
  { period: '1Y', bondEquity: 0.22, goldEquity: -0.08, dollarEquity: -0.12 },
  { period: '3Y', bondEquity: 0.45, goldEquity: -0.15, dollarEquity: -0.28 },
];

const historicalPercentiles = [
  { metric: 'S&P 500 P/E', current: 21.4, percentile: 87, signal: 'expensive' },
  { metric: 'US 10Y Yield', current: 4.52, percentile: 76, signal: 'elevated' },
  { metric: 'VIX Level', current: 16.8, percentile: 34, signal: 'low' },
  { metric: 'Credit Spreads', current: 145, percentile: 23, signal: 'tight' },
];

const expectedReturns = [
  { asset: 'US Equities', return: 6.2, real: 3.8 },
  { asset: 'Intl Equities', return: 7.8, real: 5.4 },
  { asset: 'US Bonds', return: 4.1, real: 1.7 },
  { asset: 'EM Debt', return: 5.9, real: 3.5 },
];

export const MetaSignals = () => {
  const getPercentileColor = (percentile: number) => {
    if (percentile >= 90) return 'text-destructive';
    if (percentile >= 75) return 'text-warning';
    if (percentile >= 25) return 'text-foreground';
    return 'text-primary';
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'expensive': return <AlertCircle className="h-2.5 w-2.5 text-destructive" />;
      case 'elevated': return <TrendingUp className="h-2.5 w-2.5 text-warning" />;
      case 'low': return <TrendingDown className="h-2.5 w-2.5 text-success" />;
      case 'tight': return <Target className="h-2.5 w-2.5 text-primary" />;
      default: return null;
    }
  };

  const getCorrelationColor = (corr: number) => {
    const abs = Math.abs(corr);
    if (abs > 0.5) return 'font-bold';
    if (abs > 0.3) return 'font-semibold';
    return 'font-normal';
  };

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-3">
        <Brain className="h-3 w-3 inline mr-1 text-primary" />
        META-SIGNALS & REGIMES
      </h3>
      
      {/* Market Regime Probability */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Market Regime Probability</h4>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-16 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={regimeData}>
                <RadialBar dataKey="probability" cornerRadius={2} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-1">
            {regimeData.map((regime, index) => (
              <div key={regime.regime} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: regime.color }}
                  />
                  <span className="text-[9px] font-medium text-foreground">{regime.regime}</span>
                </div>
                <span className="text-[9px] text-muted-foreground">{regime.probability}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Correlation Tracker */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Cross-Asset Correlations</h4>
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[9px] font-medium text-muted-foreground">
            <span>Bonds vs Equities:</span>
            <span className={`${correlationData[0].bondEquity < 0 ? 'text-success' : 'text-warning'} ${getCorrelationColor(correlationData[0].bondEquity)}`}>
              {correlationData[0].bondEquity.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-[9px] font-medium text-muted-foreground">
            <span>Gold vs Equities:</span>
            <span className={`${correlationData[0].goldEquity < 0 ? 'text-success' : 'text-warning'} ${getCorrelationColor(correlationData[0].goldEquity)}`}>
              {correlationData[0].goldEquity.toFixed(2)}
            </span>
          </div>
          
          <div className="text-[8px] text-muted-foreground text-center mt-1">
            60/40 Portfolio Status: <span className="text-success font-medium">Working</span>
          </div>
        </div>
      </div>

      {/* Historical Percentiles */}
      <div className="mb-4">
        <h4 className="text-[10px] font-medium text-foreground mb-2">Historical Percentiles</h4>
        
        <div className="space-y-1.5">
          {historicalPercentiles.map((metric, index) => (
            <div key={metric.metric} className="flex items-center justify-between p-1.5 hover:bg-muted/30 rounded transition-colors">
              <div className="flex items-center gap-1.5 flex-1">
                {getSignalIcon(metric.signal)}
                <span className="text-[10px] font-medium text-foreground truncate">{metric.metric}</span>
              </div>
              
              <div className="text-right">
                <div className="text-[10px] font-medium text-foreground">{metric.current}</div>
                <div className={`text-[9px] ${getPercentileColor(metric.percentile)}`}>
                  {metric.percentile}th %ile
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Returns */}
      <div>
        <h4 className="text-[10px] font-medium text-foreground mb-2">10Y Expected Returns</h4>
        
        <div className="grid grid-cols-2 gap-1.5">
          {expectedReturns.map((asset, index) => (
            <div key={asset.asset} className="p-1.5 bg-muted/20 rounded border border-border/50">
              <div className="text-center">
                <div className="text-[9px] font-medium text-foreground truncate">{asset.asset}</div>
                <div className="text-[10px] font-bold text-primary">{asset.return}%</div>
                <div className="text-[8px] text-muted-foreground">Real: {asset.real}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/50 text-center">
        <div className="text-[9px] text-muted-foreground">
          Current Regime: <span className="text-success font-medium">Late Cycle Reflation</span>
        </div>
      </div>
    </div>
  );
};