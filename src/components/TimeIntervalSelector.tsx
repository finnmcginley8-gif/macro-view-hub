import { Button } from "@/components/ui/button";

export type TimeInterval = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';

interface TimeIntervalSelectorProps {
  selectedInterval: TimeInterval;
  onIntervalChange: (interval: TimeInterval) => void;
}

const intervals: TimeInterval[] = ['1D', '1W', '1M', '3M', '6M', '1Y', '3Y', '5Y'];

export const TimeIntervalSelector = ({ selectedInterval, onIntervalChange }: TimeIntervalSelectorProps) => {
  return (
    <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
      {intervals.map((interval) => (
        <Button
          key={interval}
          variant={selectedInterval === interval ? "default" : "ghost"}
          size="sm"
          onClick={() => onIntervalChange(interval)}
          className="text-xs font-mono"
        >
          {interval}
        </Button>
      ))}
    </div>
  );
};