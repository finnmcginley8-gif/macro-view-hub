import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  source: string;
  category: 'markets' | 'economy' | 'central-banks' | 'commodities';
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Federal Reserve Holds Rates Steady at 5.25-5.5%',
    summary: 'The Federal Open Market Committee decided to maintain the federal funds rate in the current range, citing continued progress on inflation.',
    timestamp: '2 hours ago',
    source: 'Reuters',
    category: 'central-banks'
  },
  {
    id: '2',
    title: 'European Equities Rise on Strong Earnings Beat',
    summary: 'European stocks gained ground as several major companies reported better-than-expected quarterly earnings.',
    timestamp: '4 hours ago',
    source: 'Bloomberg',
    category: 'markets'
  },
  {
    id: '3',
    title: 'Gold Reaches New Weekly High Amid Dollar Weakness',
    summary: 'Gold prices surged to a weekly high as the US dollar weakened following mixed economic data.',
    timestamp: '6 hours ago',
    source: 'MarketWatch',
    category: 'commodities'
  },
  {
    id: '4',
    title: 'EU Inflation Data Shows Continued Cooling Trend',
    summary: 'Eurozone inflation continued its downward trajectory, falling to 2.8% year-over-year in the latest reading.',
    timestamp: '8 hours ago',
    source: 'Financial Times',
    category: 'economy'
  },
  {
    id: '5',
    title: 'Tech Sector Leads Market Rally Ahead of Earnings',
    summary: 'Technology stocks outperformed broader markets as investors position ahead of major earnings releases.',
    timestamp: '10 hours ago',
    source: 'CNBC',
    category: 'markets'
  },
  {
    id: '6',
    title: 'Bank of Japan Maintains Ultra-Low Interest Rates',
    summary: 'The BoJ kept its benchmark interest rate unchanged at -0.1% while maintaining its yield curve control policy.',
    timestamp: '12 hours ago',
    source: 'Nikkei',
    category: 'central-banks'
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'markets': return 'hsl(var(--chart-1))';
    case 'economy': return 'hsl(var(--chart-2))';
    case 'central-banks': return 'hsl(var(--chart-3))';
    case 'commodities': return 'hsl(var(--chart-4))';
    default: return 'hsl(var(--muted-foreground))';
  }
};

export const NewsFeed = () => {
  return (
    <div className="chart-container">
      <h3 className="text-sm font-semibold mb-2 text-foreground">Global Macro News</h3>
      <ScrollArea className="h-[120px]">
        <div className="space-y-2">
          {mockNews.map((item) => (
            <div key={item.id} className="border-l-2 pl-2 pb-2 border-b border-border/30 last:border-b-0" 
                 style={{ borderLeftColor: getCategoryColor(item.category) }}>
              <div className="flex items-start justify-between gap-1">
                <h4 className="font-medium text-xs leading-tight">{item.title}</h4>
                <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{item.summary}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs font-mono text-muted-foreground">{item.source}</span>
                <span className="text-xs text-muted-foreground">{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};