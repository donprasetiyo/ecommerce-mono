import { cn } from "@repo/ui/lib/util";

const Title = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1
      className={cn(
        `text-balance text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]`,
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
