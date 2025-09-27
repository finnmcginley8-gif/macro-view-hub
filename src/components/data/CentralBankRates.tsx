interface Rate {
  country: string;
  bank: string;
  rate: number;
  change: number;
  lastUpdate: string;
}

const centralBankData: Rate[] = [
  { country: 'United States', bank: 'Federal Reserve', rate: 5.25, change: 0, lastUpdate: '2024-01-31' },
  { country: 'European Union', bank: 'ECB', rate: 4.5, change: 0, lastUpdate: '2024-01-25' },
  { country: 'United Kingdom', bank: 'Bank of England', rate: 5.25, change: 0, lastUpdate: '2024-02-01' },
  { country: 'Japan', bank: 'Bank of Japan', rate: -0.1, change: 0, lastUpdate: '2024-01-23' },
  { country: 'Canada', bank: 'Bank of Canada', rate: 5.0, change: 0, lastUpdate: '2024-01-24' },
  { country: 'Australia', bank: 'RBA', rate: 4.35, change: 0, lastUpdate: '2024-02-06' },
  { country: 'Switzerland', bank: 'SNB', rate: 1.75, change: 0, lastUpdate: '2024-01-15' },
  { country: 'Norway', bank: 'Norges Bank', rate: 4.5, change: 0, lastUpdate: '2024-01-18' },
  { country: 'Sweden', bank: 'Riksbank', rate: 4.0, change: 0, lastUpdate: '2024-02-07' },
  { country: 'South Korea', bank: 'Bank of Korea', rate: 3.5, change: 0, lastUpdate: '2024-01-11' },
];

export const CentralBankRates = () => {
  return (
    <div className="chart-container">
      <h3 className="text-sm font-semibold mb-2 text-foreground">Central Bank Interest Rates</h3>
      <div className="overflow-x-auto h-full">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-1 px-2 text-muted-foreground font-medium">Country</th>
              <th className="text-left py-1 px-2 text-muted-foreground font-medium">Bank</th>
              <th className="text-right py-1 px-2 text-muted-foreground font-medium">Rate (%)</th>
              <th className="text-right py-1 px-2 text-muted-foreground font-medium">Change</th>
              <th className="text-right py-1 px-2 text-muted-foreground font-medium">Update</th>
            </tr>
          </thead>
          <tbody>
            {centralBankData.map((rate) => (
              <tr key={rate.country} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-1 px-2 font-medium text-xs">{rate.country}</td>
                <td className="py-1 px-2 text-muted-foreground text-xs">{rate.bank}</td>
                <td className="py-1 px-2 text-right font-mono text-xs">{rate.rate.toFixed(2)}</td>
                <td className={`py-1 px-2 text-right font-mono text-xs ${
                  rate.change > 0 ? 'data-positive' : rate.change < 0 ? 'data-negative' : 'data-neutral'
                }`}>
                  {rate.change > 0 ? '+' : ''}{rate.change.toFixed(2)}
                </td>
                <td className="py-1 px-2 text-right text-muted-foreground font-mono text-xs">
                  {rate.lastUpdate.slice(5)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};