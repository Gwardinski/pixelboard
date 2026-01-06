import { colorToCss } from "@/config/formatters";
import { cn } from "./utils";

// xl: 64 board, 4px pixel, 16 per row
// lg: 48 board, 3px pixel, 16 per row
// md: 40 board, 2.5px pixel, 16 per row
// sm: 32 board, 2px pixel, 16 per row
// bs: 20 board, 1.25px pixel, 16 per row

export const ScalableTile: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ScaleablePixel: React.FC<{
  className?: string;
  color: string;
}> = ({ className, color }) => {
  return (
    <div
      className={cn(
        "flex h-[1.25px] w-[1.25px] sm:h-[2px] sm:w-[2px] md:h-[2.5px] md:w-[2.5px] lg:h-[3px] lg:w-[3px] xl:h-1 xl:w-1",
        className
      )}
      style={{ background: colorToCss(color) }}
    />
  );
};
