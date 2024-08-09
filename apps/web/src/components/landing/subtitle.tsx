import { cn } from "@repo/ui/lib/util";

const Subtitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={cn(
        `text-foreground max-w-[750px] text-center text-lg font-light`,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Subtitle;
