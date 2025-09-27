interface EconomicData {
  country: string;
  cpi: number;
  ppi: number;
  unemployment: number;
  inflation: number;
  gdpGrowth: number;
}

const economicData: EconomicData[] = [
  { country: 'United States', cpi: 3.2, ppi: 1.8, unemployment: 3.7, inflation: 3.1, gdpGrowth: 2.4 },
  { country: 'Germany', cpi: 3.8, ppi: -1.2, unemployment: 5.9, inflation: 3.7, gdpGrowth: 0.3 },
  { country: 'United Kingdom', cpi: 4.0, ppi: 0.5, unemployment: 4.2, inflation: 3.9, gdpGrowth: 0.1 },
  { country: 'France', cpi: 4.1, ppi: -2.1, unemployment: 7.4, inflation: 4.0, gdpGrowth: 0.7 },
  { country: 'Japan', cpi: 3.3, ppi: 0.8, unemployment: 2.6, inflation: 3.1, gdpGrowth: 1.2 },
  { country: 'Canada', cpi: 3.4, ppi: -0.5, unemployment: 5.8, inflation: 3.3, gdpGrowth: 1.5 },
  { country: 'Italy', cpi: 0.8, ppi: -3.4, unemployment: 7.6, inflation: 0.7, gdpGrowth: 0.9 },
  { country: 'Spain', cpi: 3.5, ppi: -1.8, unemployment: 12.3, inflation: 3.4, gdpGrowth: 2.0 },
  { country: 'Netherlands', cpi: 1.3, ppi: -8.1, unemployment: 3.6, inflation: 1.2, gdpGrowth: 0.9 },
  { country: 'Australia', cpi: 4.1, ppi: -1.1, unemployment: 3.9, inflation: 4.0, gdpGrowth: 2.1 },
];

const formatIndicator = (value: number, type: 'unemployment' | 'inflation' | 'cpi' | 'ppi' | 'gdpGrowth') => {
  const colorClass = value > 0 ? (type === 'unemployment' ? 'data-negative' : 'data-positive') :
                   value < 0 ? (type === 'unemployment' ? 'data-positive' : 'data-negative') :
                   'data-neutral';
  
  return { value: value.toFixed(1), colorClass };
};

export const EconomicIndicators = () => {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Economic Indicators (%)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Country</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">CPI</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">PPI</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Unemployment</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Inflation</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">GDP Growth</th>
            </tr>
          </thead>
          <tbody>
            {economicData.map((data) => {
              const cpi = formatIndicator(data.cpi, 'cpi');
              const ppi = formatIndicator(data.ppi, 'ppi');
              const unemployment = formatIndicator(data.unemployment, 'unemployment');
              const inflation = formatIndicator(data.inflation, 'inflation');
              const gdp = formatIndicator(data.gdpGrowth, 'gdpGrowth');
              
              return (
                <tr key={data.country} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-2 px-2 font-medium">{data.country}</td>
                  <td className={`py-2 px-2 text-right font-mono ${cpi.colorClass}`}>{cpi.value}</td>
                  <td className={`py-2 px-2 text-right font-mono ${ppi.colorClass}`}>{ppi.value}</td>
                  <td className={`py-2 px-2 text-right font-mono ${unemployment.colorClass}`}>{unemployment.value}</td>
                  <td className={`py-2 px-2 text-right font-mono ${inflation.colorClass}`}>{inflation.value}</td>
                  <td className={`py-2 px-2 text-right font-mono ${gdp.colorClass}`}>{gdp.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};