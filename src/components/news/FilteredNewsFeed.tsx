import { useState } from 'react';
import { Filter, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  relevance: 'high' | 'medium' | 'low';
  relatedTickers: string[];
  summary: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Apple Reports Strong iPhone Sales in Q4',
    source: 'Reuters',
    time: '2h ago',
    relevance: 'high',
    relatedTickers: ['AAPL'],
    summary: 'Better than expected iPhone 15 demand drives revenue beat'
  },
  {
    id: '2',
    title: 'NVIDIA Partners with Major Cloud Providers',
    source: 'TechCrunch',
    time: '4h ago',
    relevance: 'high',
    relatedTickers: ['NVDA', 'MSFT', 'GOOGL'],
    summary: 'New AI infrastructure deals expand datacenter footprint'
  },
  {
    id: '3',
    title: 'Fed Officials Signal Cautious Approach',
    source: 'WSJ',
    time: '6h ago',
    relevance: 'medium',
    relatedTickers: [],
    summary: 'Comments suggest measured pace of future rate adjustments'
  },
  {
    id: '4',
    title: 'Microsoft Azure Revenue Growth Accelerates',
    source: 'Bloomberg',
    time: '1d ago',
    relevance: 'medium',
    relatedTickers: ['MSFT'],
    summary: 'Cloud segment shows strong momentum in enterprise adoption'
  }
];

export const FilteredNewsFeed = () => {
  const [filter, setFilter] = useState<'all' | 'portfolio' | 'market'>('portfolio');
  
  const watchlistTickers = ['AAPL', 'MSFT', 'NVDA', 'GOOGL']; // From favorites
  
  const filteredNews = mockNews.filter(news => {
    if (filter === 'portfolio') {
      return news.relatedTickers.some(ticker => watchlistTickers.includes(ticker));
    }
    if (filter === 'market') {
      return news.relatedTickers.length === 0; // Market-wide news
    }
    return true; // all
  });

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'high': return 'border-l-success';
      case 'medium': return 'border-l-warning';
      default: return 'border-l-muted';
    }
  };

  const getTimeColor = (time: string) => {
    if (time.includes('h ago')) return 'text-success';
    if (time.includes('d ago')) return 'text-muted-foreground';
    return 'text-foreground';
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-foreground tracking-tight">
          <Filter className="h-3 w-3 inline mr-1 text-primary" />
          RELEVANT NEWS
        </h3>
        
        <div className="flex gap-1">
          <Button 
            size="sm" 
            variant={filter === 'portfolio' ? 'secondary' : 'ghost'} 
            className="h-4 px-2 text-[9px]"
            onClick={() => setFilter('portfolio')}
          >
            Portfolio
          </Button>
          <Button 
            size="sm" 
            variant={filter === 'market' ? 'secondary' : 'ghost'} 
            className="h-4 px-2 text-[9px]"
            onClick={() => setFilter('market')}
          >
            Market
          </Button>
          <Button 
            size="sm" 
            variant={filter === 'all' ? 'secondary' : 'ghost'} 
            className="h-4 px-2 text-[9px]"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {filteredNews.map((news) => (
          <div 
            key={news.id} 
            className={`group border-l-2 ${getRelevanceColor(news.relevance)} pl-2 py-1 hover:bg-muted/30 transition-colors cursor-pointer`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[10px] font-medium text-foreground line-clamp-2">
                    {news.title}
                  </span>
                  <ExternalLink className="h-2 w-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] text-muted-foreground">{news.source}</span>
                  <span className={`text-[9px] font-medium ${getTimeColor(news.time)}`}>{news.time}</span>
                </div>
                
                {news.relatedTickers.length > 0 && (
                  <div className="flex gap-1 mb-1">
                    {news.relatedTickers.map(ticker => (
                      <Badge 
                        key={ticker} 
                        variant="outline" 
                        className="h-3 px-1 text-[8px] bg-primary/10 border-primary/30 text-primary"
                      >
                        {ticker}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <p className="text-[9px] text-muted-foreground line-clamp-2">
                  {news.summary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredNews.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p className="text-[10px]">No relevant news found</p>
        </div>
      )}
    </div>
  );
};