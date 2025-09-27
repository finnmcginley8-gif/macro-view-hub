import { TimeInterval } from '../TimeIntervalSelector';

interface EmergingMarketsHeatmapProps {
  timeInterval: TimeInterval;
}

const generateEMData = () => {
  const regions = [
    { name: 'ASIA', markets: ['China', 'India', 'Korea', 'Taiwan'] },
    { name: 'LATAM', markets: ['Brazil', 'Mexico', 'Chile', 'Peru'] },
    { name: 'EMEA', markets: ['Russia', 'Turkey', 'S.Africa', 'Egypt'] }
  ];

  return regions.map(region => ({
    ...region,
    markets: region.markets.map(market => ({
      name: market,
      performance: (Math.random() - 0.4) * 6,
    }))
  }));
};

const getPerformanceColor = (perf: number) => {
  if (perf > 2) return 'bg-green-600/80';
  if (perf > 0) return 'bg-green-500/60';
  if (perf > -2) return 'bg-red-500/60';
  return 'bg-red-600/80';
};

export const EmergingMarketsHeatmap = ({ timeInterval }: EmergingMarketsHeatmapProps) => {
  const data = generateEMData();

  return (
    <div className="chart-container">
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">EMERGING MARKETS</h3>
      <div className="h-[200px] p-1">
        {data.map((region, regionIdx) => (
          <div key={region.name} className="mb-2">
            <div className="text-xs font-medium text-muted-foreground mb-1">{region.name}</div>
            <div className="grid grid-cols-2 gap-1">
              {region.markets.map((market, idx) => (
                <div 
                  key={market.name}
                  className={`p-1.5 text-center ${getPerformanceColor(market.performance)}`}
                >
                  <div className="text-xs font-medium text-white">{market.name}</div>
                  <div className="text-xs text-white/90">
                    {market.performance > 0 ? '+' : ''}{market.performance.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};