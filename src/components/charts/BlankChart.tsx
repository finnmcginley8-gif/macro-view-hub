import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const BlankChart = () => {
  return (
    <div className="chart-container relative">
      <div className="absolute top-2 right-2 z-10">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-5 w-5 p-0 border-dashed border-muted-foreground/30"
          onClick={() => console.log('Add data clicked')}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <h3 className="text-xs font-medium mb-1 text-foreground tracking-tight">CUSTOM CHART</h3>
      <div className="w-full h-[200px] border border-dashed border-muted-foreground/30 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Plus className="h-6 w-6 mx-auto mb-1 opacity-40" />
          <p className="text-xs font-medium">ADD DATA SOURCE</p>
        </div>
      </div>
    </div>
  );
};