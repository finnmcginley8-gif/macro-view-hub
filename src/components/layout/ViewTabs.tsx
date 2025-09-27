import { useState } from 'react';
import { Eye, Clock, PieChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ViewTab {
  id: string;
  name: string;
  icon: any;
  active: boolean;
}

export const ViewTabs = () => {
  const [views, setViews] = useState<ViewTab[]>([
    { id: 'daily', name: 'Daily', icon: Eye, active: true },
    { id: 'longterm', name: 'Long-Term', icon: Clock, active: false },
    { id: 'dividend', name: 'Dividend', icon: PieChart, active: false },
  ]);

  const switchView = (viewId: string) => {
    setViews(prev => prev.map(view => ({
      ...view,
      active: view.id === viewId
    })));
  };

  return (
    <div className="flex items-center gap-1">
      {views.map((view) => {
        const Icon = view.icon;
        return (
          <Button
            key={view.id}
            size="sm"
            variant={view.active ? 'secondary' : 'ghost'}
            className="h-6 px-2 text-[10px] gap-1"
            onClick={() => switchView(view.id)}
          >
            <Icon className="h-2.5 w-2.5" />
            {view.name}
            {view.active && <Badge variant="outline" className="h-3 w-3 p-0 text-[8px] ml-1">•</Badge>}
          </Button>
        );
      })}
      
      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" title="View Settings">
        <Settings className="h-3 w-3" />
      </Button>
    </div>
  );
};