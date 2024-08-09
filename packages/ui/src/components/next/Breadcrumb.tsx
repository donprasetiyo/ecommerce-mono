'use client'
import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb"
import { Fragment, useEffect, useState } from "react";
import { cn } from "@repo/ui/lib/util";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Breadcrumb extends React.HTMLAttributes<HTMLElement> {
  className: string
}

export function BreadcrumbWithCusstomSeparator({ ...props }: Breadcrumb) {

  const [conversationTitle, setConversationTitle] = useState('');

  const pathname = usePathname();

  const params = pathname.split('/').slice(1);

  useEffect(() => {
    const title = document.title.split('|')[0];
    if (document && title) {
      setConversationTitle(title)
    }
  }, [pathname])

  if (pathname === '/') {
    return <></>
  }

  const isConversation = pathname.startsWith('/chat') && pathname !== '/chat';

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList className="relative">
        <BreadcrumbSeparator>
          <Slash size={15} />
        </BreadcrumbSeparator>
        {
          params && params.map((item, i) => {
            const theItem = item[0];
            if (theItem) {
              const capitalizedItem = theItem.toUpperCase() + item.substring(1);
              const isLast = i === params.length - 1;
              const link = `/${params.slice(0, i + 1).join('/')}`;
              const isCurrentPage = pathname === link;

              return (
                <Fragment key={i}>
                  <BreadcrumbItem className={cn(`relative overflow-hidden whitespace-nowrap`, conversationTitle.length > 0 && isLast && isConversation ? 'fading-text-to-right' : '')}>
                    {
                      !isCurrentPage && <BreadcrumbLink asChild>{
                        <Link href={link}>{capitalizedItem}</Link>
                      }</BreadcrumbLink>
                    }
                    {
                      isCurrentPage && !isConversation && <BreadcrumbPage className="line-clamp-1">{capitalizedItem}</BreadcrumbPage>
                    }
                    {
                      isCurrentPage && isConversation && conversationTitle.length > 0 && <BreadcrumbPage className="line-clamp-1 w-[calc(50vw_-_447px)]">{conversationTitle}</BreadcrumbPage>
                    }
                    {
                      isCurrentPage && isConversation && conversationTitle.length === 0 && <span className="w-[calc(50vw_-_497px)] bg-gray-400 animate-pulse h-4 rounded-md"></span>
                    }
                    {
                      // isLast && pathname.startsWith('/chat/') && <div className={cn("w-[3rem] absolute bottom-0 right-0 top-0 bg-gradient-to-l to-transparent from-background rounded-r-md",
                      //   "group-hover/link:from-accent from-0% group-hover/link:from-60%",
                      //   // isActionOpened ? "from-accent from-60%" : "",
                      //   // isCurrentSidebarTab(item, index, pathname) ? 'from-accent from-60%' : '',
                      // )}></div>
                    }
                  </BreadcrumbItem>
                  {
                    !isLast && <BreadcrumbSeparator>
                      <Slash size={15} />
                    </BreadcrumbSeparator>
                  }
                  {/* {conversationTitle.length > 0 && isLast && isConversation && <div className={cn("w-[3rem] absolute bottom-0 right-0 top-0 bg-gradient-to-l to-transparent from-background rounded-r-md",
                  "group-hover/link:from-background from-0% group-hover/link:from-[2rem]",
                  // isActionOpened ? "from-accent from-60%" : "",
                  // isCurrentSidebarTab(item, index, pathname) ? 'from-accent from-60%' : '',
                )}></div>} */}
                </Fragment>
              )
            }

          })
        }
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
