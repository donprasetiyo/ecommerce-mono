import { cn } from "@repo/ui/lib/util";

const Section = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      className={cn(
        `mx-auto flex max-w-3xl flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20`,
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
