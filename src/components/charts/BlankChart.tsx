import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const BlankChart = () => {
  return (
    <div className="chart-container relative">
      <div className="absolute top-1 right-1 z-10">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-6 w-6 p-0 border-dashed"
          onClick={() => console.log('Add data clicked')}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <h3 className="text-xs font-medium mb-1 text-foreground">Custom Chart</h3>
      <div className="w-full h-[200px] border-2 border-dashed border-border rounded flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-xs">Add Data Source</p>
        </div>
      </div>
    </div>
  );
};