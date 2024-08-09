import { cn } from "@repo/ui/lib/util"
import { ILink } from "@repo/ui/types/link"
import Link from "next/link"
import { FunctionComponent } from "react"

interface Navigation extends React.HTMLAttributes<HTMLElement>{
    isLoggedIn: boolean,
    links: ILink[]
}

export async function Navigation({
  className,
  isLoggedIn,
  links,
  ...props
}: Navigation) {

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {
        links.length > 0 ?
        links.map((link) => (
          <Link
          key={link.href}
          href={link.href}
          className={cn(isLoggedIn ? `text-sm font-medium transition-colors hover:text-primary` : 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary')}
        >
          {link.content}
        </Link>
        ))
        : null
      }
    </nav>
  )
}