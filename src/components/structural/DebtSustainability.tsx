import { AlertTriangle, Shield, TrendingDown, Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const debtData = [
  { country: 'Japan', govt: 263, corp: 104, household: 56, risk: 'high' },
  { country: 'Italy', govt: 144, corp: 67, household: 42, risk: 'medium' },
  { country: 'United States', govt: 127, corp: 83, household: 76, risk: 'medium' },
  { country: 'France', govt: 113, corp: 71, household: 60, risk: 'medium' },
  { country: 'Germany', govt: 69, corp: 58, household: 55, risk: 'low' },
  { country: 'China', govt: 77, corp: 162, household: 62, risk: 'high' },
];

export const DebtSustainability = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'hsl(var(--destructive))';
      case 'medium': return 'hsl(var(--warning))';
      case 'low': return 'hsl(var(--success))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="h-3 w-3 text-destructive" />;
      case 'medium': return <Shield className="h-3 w-3 text-warning" />;
      case 'low': return <Shield className="h-3 w-3 text-success" />;
      default: return null;
    }
  };

  const getTotalDebt = (item: any) => item.govt + item.corp + item.household;

  return (
    <div className="chart-container">
      <h3 className="text-xs font-semibold text-foreground tracking-tight mb-3">
        <Building2 className="h-3 w-3 inline mr-1 text-warning" />
        DEBT SUSTAINABILITY
      </h3>
      
      {/* Debt Levels Overview */}
      <div className="mb-4">
        <div className="text-[10px] font-medium text-foreground mb-2">Debt-to-GDP Ratios (%)</div>
        
        <div className="space-y-2">
          {debtData.map((country, index) => (
            <div key={country.country} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-foreground">{country.country}</span>
                  {getRiskIcon(country.risk)}
                </div>
                <span className="text-[10px] font-medium text-foreground">
                  {getTotalDebt(country)}%
                </span>
              </div>
              
              {/* Stacked debt visualization */}
              <div className="flex h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="bg-destructive/70" 
                  style={{ width: `${(country.govt / getTotalDebt(country)) * 100}%` }}
                  title={`Government: ${country.govt}%`}
                />
                <div 
                  className="bg-warning/70" 
                  style={{ width: `${(country.corp / getTotalDebt(country)) * 100}%` }}
                  title={`Corporate: ${country.corp}%`}
                />
                <div 
                  className="bg-primary/70" 
                  style={{ width: `${(country.household / getTotalDebt(country)) * 100}%` }}
                  title={`Household: ${country.household}%`}
                />
              </div>
              
              <div className="flex justify-between text-[8px] text-muted-foreground">
                <span>Gov: {country.govt}%</span>
                <span>Corp: {country.corp}%</span>
                <span>HH: {country.household}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-destructive/10 rounded border border-destructive/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3 w-3 text-destructive" />
            <span className="text-[10px] font-medium text-foreground">High Risk</span>
          </div>
          <span className="text-[10px] text-destructive font-medium">JP, CN Corporate</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-success/10 rounded border border-success/20">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-3 w-3 text-success" />
            <span className="text-[10px] font-medium text-foreground">Improving</span>
          </div>
          <span className="text-[10px] text-success font-medium">DE, FR Trends</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/50 text-center">
        <div className="text-[9px] text-muted-foreground">
          Global Debt/GDP: <span className="text-warning font-medium">284% (+12% YoY)</span>
        </div>
      </div>
    </div>
  );
};