interface MarketIndicatorsProps {}

const generateIndicatorsData = () => {
  return [
    {
      name: "Buffett Indicator",
      value: "165.2%",
      description: "Market Cap / GDP",
      trend: "elevated",
      historical: "Above long-term avg"
    },
    {
      name: "Shiller CAPE",
      value: "29.8",
      description: "Cyclically Adj P/E",
      trend: "high",
      historical: "95th percentile"
    },
    {
      name: "Equity Risk Premium",
      value: "1.85%",
      description: "SPX Yield - 10Y",
      trend: "normal",
      historical: "Near historical avg"
    }
  ];
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'elevated': return 'text-warning';
    case 'high': return 'text-destructive';
    case 'normal': return 'text-success';
    default: return 'text-muted-foreground';
  }
};

export const MarketIndicators = ({}: MarketIndicatorsProps) => {
  const indicators = generateIndicatorsData();

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-2 text-foreground tracking-tight">MARKET INDICATORS</h3>
      <div className="space-y-2">
        {indicators.map((indicator, index) => (
          <div key={indicator.name} className="border-b border-border/50 pb-2 last:border-b-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground">{indicator.name}</div>
                <div className="text-xs text-muted-foreground">{indicator.description}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{indicator.historical}</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${getTrendColor(indicator.trend)}`}>
                  {indicator.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};