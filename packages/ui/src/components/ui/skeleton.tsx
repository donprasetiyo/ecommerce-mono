import { cn } from "@repo/ui/lib/util"

interface ISkeleton extends React.HTMLAttributes<HTMLDivElement> {
  className: string,
  isOn: boolean
}

function Skeleton({
  className,
  isOn,
  ...props
}: ISkeleton) {
  return (
    <div
      className={cn(`${isOn ? 'animate-pulse' : ''} rounded-md bg-primary/10`, className)}
      {...props}
    />
  )
}

export { Skeleton }
